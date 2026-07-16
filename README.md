<div align="center">

<img src="Images/LOGO1.png" alt="Thinking Logo" width="180">

# Thinking

### Discover your learning style. Learn smarter.

An educational platform designed to help high school students identify their learning style and improve their study habits through interactive digital tools.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-121013?style=for-the-badge&logo=github&logoColor=white)

</div>

---

# Table of Contents

- About
- Features
- Project Objectives
- Technologies
- Project Structure
- Screens
- Installation
- Configuration
- Database
- Team
- Future Features
- License
- Contact

---

# About

Thinking is an educational web platform created to help students discover the way they learn best.

Instead of studying the same way as everyone else, students answer a learning style assessment that identifies whether they learn better through:

- Visual Learning
- Auditory Learning
- Kinesthetic Learning

Based on the results, the platform recommends personalized study techniques and interactive tools to improve academic performance.

Thinking also provides a modern environment where teachers can monitor students and use educational resources.

---

# Project Objectives

- Help students understand how they learn.
- Improve study efficiency.
- Increase academic performance.
- Reduce frustration while studying.
- Provide digital educational tools.
- Support teachers with useful analytics.
- Encourage personalized learning.

---

# Features

## Authentication

- Student Registration
- Teacher Registration
- Login System
- Password Validation
- Role Selection
- Logout

---

## Student Dashboard

- Personalized Welcome
- Statistics
- Progress Cards
- Learning Style Result
- Study Recommendations
- Notifications
- Theme Switcher
- Responsive Design

---

## Teacher Dashboard

- Student Management
- Class Overview
- Assignments
- Analytics
- Messages
- Learning Styles
- Dashboard Statistics

---

## Whiteboard

Interactive whiteboard including:

- Sticky Notes
- Drawing
- Shapes
- Text
- Delete Tool
- Multi Selection
- Zoom
- Pan
- Grid
- Export
- Import

---

## Learning Style Test

36-question assessment designed to identify:

- Visual
- Auditory
- Kinesthetic

After completing the assessment the student receives recommendations.

---

## Bombi AI

Virtual educational assistant.

Functions:

- Helps users navigate the platform.
- Explains learning styles.
- Answers frequently asked questions.
- Motivates students.
- Provides educational guidance.

---

## User Experience

- Light Mode
- Dark Mode
- Responsive Layout
- Modern Animations
- Glassmorphism
- Aurora Background
- Smooth Transitions

---

# Technologies

Frontend

- HTML5
- CSS3
- JavaScript (Vanilla)

Backend

- Supabase

Database

- PostgreSQL (Supabase)

Deployment

- GitHub Pages

Version Control

- Git
- GitHub

Icons

- Lucide Icons

Fonts

- Google Fonts

---

# Folder Structure

```
Thinking/

│
├── Images/
│
├── CSS/
│
├── JS/
│
├── index.html
│
├── Choose-rol.html
│
├── STUDENT REGISTER.html
│
├── STUDENT LOGIN.html
│
├── TEACHER REGISTER.html
│
├── TEACHER LOGIN.html
│
├── Student Dashboard.html
│
├── Teacher Dashboard.html
│
├── Whiteboard.html
│
├── Learning Styles.html
│
├── README.md
│
└── LICENSE
```

---

# Main Workflow

```
Home

↓

Choose Role

↓

Student / Teacher

↓

Register

↓

Login

↓

Dashboard

↓

Learning Style Test

↓

Tools

↓

Logout
```

---

# Database

Supabase stores:

Users

- ID
- Name
- Email
- Password
- Role

Students

- Progress
- Learning Style
- Statistics

Teachers

- Classes
- Students
- Assignments

---

# Installation

Clone the repository

```bash
git clone https://github.com/USERNAME/Thinking.git
```

Enter the project

```bash
cd Thinking
```

Open with VS Code

```bash
code .
```

Run with Live Server

---

# Configuration

Create your Supabase project.

Configure:

```javascript
const SUPABASE_URL = "YOUR_URL";

const SUPABASE_KEY = "YOUR_ANON_KEY";

const supabase = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);
```

---

# Team

## Irving Acosta

Lead Web Developer

Responsibilities

- Frontend Development
- Website Architecture
- Whiteboard Development
- Student Dashboard
- UI Components
- Project Integration

---

## Kristian

Web Developer

Responsibilities

- Animations
- Screen Navigation
- UI Interactions
- Frontend Support

---

## Allison Miranda

Frontend Developer

Responsibilities

- Home Sections
- Teacher Dashboard
- UI Implementation
- Responsive Components

---

## Dereck

Backend Developer

Responsibilities

- Supabase Database
- Authentication
- Login System
- Register System
- Database Integration

---

# Future Features

- AI Study Assistant
- Flashcards
- Mind Maps
- Pomodoro Timer
- Study Planner
- Achievements
- Calendar
- Progress Reports
- Gamification
- Classroom Management
- Mobile App
- Notifications
- Offline Mode

---

# Current Status

Project Status

🟢 Active Development

Version

v1.0 Beta

---

# License

This project is developed for educational purposes.

Copyright © 2026 Thinking Team

---

# Contact

GitHub

https://github.com/irvingacost34

Website

https://irvingacost34.github.io/Thinking/

---

<div align="center">

Made with ❤️ by the Thinking Team

**Only you have the power to learn.**

</div>
