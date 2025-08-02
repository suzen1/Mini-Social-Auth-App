const express = require('express');
const app = express();
const userModel = require('./models/user');
const postsModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/',(req, res) => {
    res.redirect('/register');
});

app.get('/register', (req, res) => {
    res.render('register'); 
});

app.post('/register', async (req, res) => {

    let { password, email, username, posts } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        return res.status(400).render('register', { error: 'User already exists' });
    }
    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(password, salt, async (err, hash) => {
          let user =  await userModel.create({
                email,
                password: hash,
                username,
                posts
            });

        let token = jwt.sign({email:email,userid: user._id},'shhhh');
        res.cookie('token', token);
       
        res.redirect('/profile')
        });
    });

});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).redirect('/login');
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).send('Error comparing passwords');
    }

    if (result) {
    
      const token = jwt.sign({ _id: user._id, email: user.email }, 'shhhh', {
        expiresIn: '1h',
      });

     
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, 
        maxAge: 3600000, 
      });

     
      res.redirect('/profile');
    } else {
      res.redirect('/login');
    }
  });
});

app.get('/profile', isLogin, async (req, res) => {
    let user  = await userModel.findOne({email: req.user.email}).populate('posts');
    res.render('profile',{user});
});

app.post('/post', isLogin, async (req, res) => {
    let {contant} = req.body;
    let user = await userModel.findOne({email: req.user.email});
    if (!user) {
        return res.status(404).send('User not found');
    }
    let newPost = await postsModel.create({
        contant,
        user: user._id
    });
    user.posts.push(newPost._id);
    await user.save();
    res.redirect('/profile');
  
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});


app.get('/update/:id', isLogin, async (req, res) => {
  try {
    const post = await postsModel.findById(req.params.id).populate('user');
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.render('update', { post }); // ✅ now EJS will receive the `post` variable
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


app.post('/update/:id', isLogin, async (req, res) => {
  try {
    const updated = await postsModel.findByIdAndUpdate(
      req.params.id,
      { contant: req.body.contant },
      { new: true }
    );
    if (!updated) return res.status(404).send("Update failed");
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    res.status(500).send("Update error");
  }
});


    
function isLogin  (req, res, next) {
    let token = req.cookies.token;
    if (!token) {
        return res.redirect('/profile');
;
    }
    jwt.verify(token, 'shhhh',  (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized');
        }
        req.user = decoded;
        next();
    });
};




app.listen(3000,(req,res) =>{
    console.log('Server is running on port 3000 http://localhost:3000');
});