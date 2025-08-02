🧑‍💻 Mini Social Auth App

This is a full-stack web application built with **Node.js**, **Express**, **MongoDB**, and **EJS**, styled using **Tailwind CSS**. It supports user registration, login, JWT-based authentication, and allows users to **create**, **update**, and **like** posts.

---
🚀 Features

- ✅ User Registration with password hashing (`bcrypt`)
- ✅ Login with secure `JWT` authentication
- ✅ Cookie-based session management
- ✅ Create and update your own posts
- ✅ Like system for each post
- ✅ Protected routes using middleware
- ✅ Beautiful responsive UI with Tailwind CSS
- ✅ MongoDB with Mongoose ODM
- ✅ Clean MVC project structure


---
🛠️ Tech Stack

- Backend: **Node.js**, **Express**
- Frontend: **EJS**, **Tailwind CSS**
- Database: **MongoDB + Mongoose**
- Authentication: **JWT**, **cookie-parser**
- Security: **bcrypt** (for password hashing)

---

📦 Installation & Setup

1. **Clone the repository**

   
   git clone https://github.com/suzen1/mini-social-auth-app.git
   cd mini-social-auth-app

2. **Install dependencies**
   npm install

3. **Start MongoDB**

   Ensure MongoDB is running locally on `mongodb://localhost:27017/miniprojact`

4. **Run the app**

 node index.js

 App runs at: [http://localhost:3000](http://localhost:3000)

---
🔐 JWT Authentication Flow

* On **registration/login**, a signed JWT is stored in cookies.
* Protected routes (like `/profile`, `/post`, `/update/:id`) use a middleware (`isLogin`) to verify the token and retrieve user data.
---

🧪 Sample Test Accounts

You can register multiple users and test posting, liking, and updating behavior individually.

---

📌 Future Improvements

* Add delete post functionality
* Use flash messages for error/success handling
* Add like counter per post
* Add user avatars with image upload (Multer)
* Convert to REST API + React frontend

---
🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

📃 License

This project is licensed under the MIT License.

---
🙋‍♂️ Author

**Sayyed Suzen Ali**
*BCA Student | Full-Stack Developer | Passionate about building real-world web apps*

Connect with me on [LinkedIn](https://www.linkedin.com/in/suzen-frontend-developer)

---
