# 📊 DataViz Studio

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-⚡-purple?logo=vite)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-success)

> **A modern web application for uploading CSV files, filtering data, and generating interactive charts with a beautiful dashboard experience.**

🌐 **Live Demo:**
👉 [https://dataviz-studio.vercel.app/]

---

## 📑 Table of Contents

* [🚀 Project Overview](#-project-overview)
* [✨ Key Features](#-key-features)
* [⚡ Tech Stack](#-tech-stack)
* [🛠️ Getting Started](#️-getting-started)
* [📘 Usage Guide](#-usage-guide)
* [📁 Project Structure](#-project-structure)
* [📸 Screenshots](#-screenshots)
* [🎯 Future Enhancements](#-future-enhancements)
* [🤝 Contributing](#-contributing)
* [💙 Show Your Support](#-show-your-support)
* [📝 Author & License](#-author--license)

---

## 🚀 Project Overview

**DataViz Studio** is a modern and interactive data visualization web application that allows users to upload CSV files, filter data dynamically, and generate beautiful charts with ease.

It is designed with performance, usability, and clean architecture in mind — making it a perfect showcase project for frontend development using **React**.

---

## ✨ Key Features

✅ CSV file upload with **drag & drop support**
✅ Real-time data filtering with operators (`=`, `>`, `<`, `>=`, `<=`, `!=`)
✅ Interactive chart generation:

* Bar Chart
* Line Chart
* Pie Chart

✅ Data aggregation options:

* Sum
* Average
* Count
* Min
* Max

✅ Save up to **10 charts** to dashboard
✅ Download charts as **PNG images**
✅ Dark / Light mode with persistence
✅ Fully responsive UI
✅ Data persistence using `localStorage`

---

## ⚡ Tech Stack

| Technology      | Usage                   |
| --------------- | ----------------------- |
| ⚛️ React 18     | UI development          |
| ⚡ Vite          | Fast build tool         |
| 📊 Recharts     | Data visualization      |
| 📄 Papa Parse   | CSV parsing             |
| 🎨 Tailwind CSS | Styling                 |
| 🧭 React Router | Navigation              |
| 🖼️ html2canvas | Export charts as images |

---

## 🛠️ Getting Started

### ✅ Prerequisites

* **Node.js v16+**
* npm or yarn

---

### 📦 Installation

```bash
npm install
```

### ▶️ Run the project

```bash
npm run dev
```

The app will run at:

```
http://localhost:5173
```

---

## 📘 Usage Guide

1. **Upload CSV File**
   Drag & drop or select a CSV file.

2. **Preview & Filter Data**
   Apply conditions using operators (`=`, `>`, `<`, etc.).

3. **Configure Chart**

   * Select chart type
   * Choose X/Y axis
   * Apply aggregation

4. **Generate & Save Chart**
   Save up to **10 charts** on the dashboard.

5. **Download Chart**
   Export charts as PNG images.

6. **Toggle Dark Mode**
   Preference saved automatically using localStorage.

---

## 📁 Project Structure

```
src/
│
├── components/      # Reusable UI components
├── pages/           # Page-level components
├── hooks/           # Custom hooks
│   ├── useCsvData.js
│   ├── useChartBuilder.js
│   ├── useLocalStorage.js
│   ├── useDebounce.js
│   └── useDarkMode.js
│
├── common/           # Shared utilities & constants
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📸 Screenshots

📷 **Screenshots include:**

* Builder Page
  <img width="1892" height="865" alt="image" src="https://github.com/user-attachments/assets/01b6601a-3cb6-45e4-95e2-0bd40d3f3098" />

* Dashboard View
  <img width="1889" height="869" alt="image" src="https://github.com/user-attachments/assets/a6a9f128-146a-4b1c-92c7-022e3827f0af" />

* Dark Mode UI
  <img width="1889" height="865" alt="image" src="https://github.com/user-attachments/assets/e34f7696-65ff-4f39-ab6f-74688fe8c1b9" />

* Chart Generation Flow
  <img width="1878" height="869" alt="image" src="https://github.com/user-attachments/assets/d88e83a6-3d2b-45ac-8d88-11d7f185914e" />

---

## 🎯 Future Enhancements

🚀 Planned improvements:

* Export full dashboard as **PDF**
* Add more chart types:

  * Scatter
  * Area
  * Radar
* User authentication (Login / Signup)
* Cloud-based data storage
* Real-time collaboration features

---

## 🤝 Contributing

Contributions are welcome!

If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 💙 Show Your Support

If you like this project, please ⭐ star the repository — it really helps and motivates me!

---

## 📝 Author & License

**Author:** [@amirali72](https://github.com/amirali72)
**License:** MIT

---

✨ *Built with passion to learn, grow, and showcase real-world React skills.*

