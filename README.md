# EmployWise

EmployWise is a React-based user management application that allows users to log in, view, update, and delete users. The project uses **React Router**, **Axios** for API requests, and **localStorage** for session management.

## 🚀 Features
- **User Authentication** using `https://reqres.in/api/login`.
- **User Management**: Fetch, search, update, and delete users.
- **Pagination Support** for listing users.
- **Error Handling**: Displays messages for API failures.
- **Mobile Responsive UI** using custom CSS.

## 🛠 Tech Stack
- **Frontend**: React (Vite), React Router, Axios
- **Styling**: Custom CSS
- **State Management**: React `useState` (No Redux/Context API used)
- **API**: [Reqres API](https://reqres.in/)

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/YOUR_USERNAME/EmployWise.git
cd EmployWise
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start the Development Server
```sh
npm run dev
```
The app should now be running at `http://localhost:5173/`.

---

## 🏗 Project Structure
```
EmployWise/
│── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Users.jsx
│   ├── api.js      # API functions (fetch, update, delete users)
│   ├── main.jsx    # Root component with routes
│   ├── index.css   # Global styles
│── public/
│── README.md       # Project documentation
│── package.json    # Project metadata & scripts
```

---

## 📡 API Usage

### 1️⃣ **Login** (POST)
Endpoint: `https://reqres.in/api/login`
#### Request Body:
```json
{
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
}
```
#### Successful Response:
```json
{
  "token": "QpwL5tke4Pnpja7X4"
}
```

### 2️⃣ **Fetch Users** (GET)
Endpoint: `https://reqres.in/api/users?page=1`

### 3️⃣ **Update User** (PUT)
Endpoint: `https://reqres.in/api/users/{id}`
#### Request Body:
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com"
}
```

### 4️⃣ **Delete User** (DELETE)
Endpoint: `https://reqres.in/api/users/{id}`

---

## 🚀 Deployment (GitHub Pages)

### 1️⃣ Install `gh-pages`
```sh
npm install gh-pages --save-dev
```

### 2️⃣ Add Homepage in `package.json`
```json
"homepage": "https://USERNAME.github.io/EmployWise"
```

### 3️⃣ Update Scripts in `package.json`
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### 4️⃣ Deploy to GitHub Pages
```sh
npm run deploy
```
Your project will be live at: `https://USERNAME.github.io/EmployWise`

---

## 📌 Assumptions & Considerations
- **No Backend Implementation**: Uses Reqres API as a mock backend.
- **Authentication Token Storage**: Uses `localStorage` for simplicity.
- **Pagination**: Assumes static user data (no real database).
- **Error Handling**: Displays user-friendly messages for API failures.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

---

## 🤝 Contribution
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---

💡 **Happy Coding!** 🚀

