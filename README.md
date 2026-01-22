# Blogify 📝

Blogify is a full-stack blogging web application built using **Node.js**, **Express.js**, **MongoDB**, and **EJS**.  
It allows users to create and manage blogs with support for **authentication**, **profile photo**, and **blog media uploads (cover image + video)**.

---

## 🚀 Features

✅ User Authentication (Signup / Login / Logout) using JWT + Cookies  
✅ Create / Read / Update / Delete (CRUD) Blogs  
✅ Upload Blog Cover Image  
✅ Upload Blog Video (extra feature)  
✅ User Profile Photo support  
✅ Protected Routes using Authentication Middleware  
✅ Clean UI using EJS Templates (Server Side Rendering)  
✅ Method Override support (PUT/DELETE from HTML forms)

---

## 🛠️ Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Cookie-based Auth Handling**
- **Multer** (File Uploads)
- **method-override**

### Frontend / UI
- **EJS (Embedded JavaScript Templates)**
- **HTML + CSS**
- Static assets served via `public/`

---

## 📂 Project Structure

```bash
blogify/
│── middlewares/      # auth middleware, route protection
│── models/           # Mongoose models (User, Blog, etc.)
│── routes/           # Express routes
│── services/         # helper / reusable service functions
│── views/            # EJS templates (SSR pages)
│── public/           # CSS, JS, images, uploads
│── app.js / index.js # main server entry file
│── package.json
│── README.md
```

> This structure follows a clean MVC-style organization.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yugank2002/blogify.git
```

### 2️⃣ Move into Project Folder
```bash
cd blogify
```

### 3️⃣ Install Dependencies
```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

> Make sure MongoDB is running locally OR use MongoDB Atlas.

---

## ▶️ Run the Project

### Start Server
```bash
npm start
```

or (if you use nodemon)
```bash
npm run dev
```

Now open in browser:
```
http://localhost:5000
```

---

## 🔐 Authentication Flow (Approach)

Blogify uses **JWT-based authentication** with cookies.

- On login/signup → JWT is generated
- Token is stored in cookies
- Routes like blog creation/editing are protected using middleware

---

## 🖼️ File Upload System (Approach)

Blogify supports:
- Profile photo upload
- Blog cover image upload
- Blog video upload

Uploads are handled using **Multer** with fields support:
- `coverImage`
- `video`

---

## 📌 Future Enhancements

✨ Blog likes / comments  
✨ Category + tags  
✨ Search and filter blogs  
✨ Admin dashboard  
✨ Rich Text Editor (Markdown / Quill)

---

## 👨‍💻 Author

**Yugank Prajapati**  
GitHub: [@yugank2002](https://github.com/yugank2002)

---

## ⭐ Support

If you like this project, don't forget to ⭐ the repository!
