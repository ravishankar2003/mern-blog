# MERN Blog Application

## Project Overview

A fullstack blog application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack that enables users to create accounts, interact with blog content, and provides administrators with comprehensive post management capabilities. The application features secure JWT-based authentication, role-based access control, and a robust content management system supporting CRUD operations on posts and comments.

**Live Demo:** [mern-blog-six-rust.vercel.app](https://mern-blog-six-rust.vercel.app)

## Key Features

### User Authentication & Management
- **Secure JWT Authentication:** Token-based login system ensuring secure user sessions
- **User Registration & Profile Management:** Complete user account lifecycle management
- **Persistent Sessions:** Redux Persist integration for maintaining user data across browser sessions
- **Role-Based Access Control:** Differentiated permissions for regular users and administrators

### Content Management System
- **Blog Post CRUD Operations:** Full create, read, update, delete functionality for blog posts
- **Comment System:** Interactive commenting feature allowing user engagement on posts
- **Search Functionality:** Advanced search capabilities to discover relevant posts based on keywords
- **Admin Dashboard:** Specialized interface for administrators to manage posts, comments, and user profiles

### Technical Features
- **Responsive Design:** Mobile-friendly interface built with modern React.js
- **RESTful API:** Well-structured backend API following REST principles
- **Database Integration:** MongoDB for efficient data storage and retrieval
- **State Management:** Redux for predictable application state management

## Architecture & Folder Structure

### `/frontend`
Contains the React.js client-side application responsible for:
- User interface components and layouts
- State management using Redux and Redux Persist
- API communication with the backend
- Authentication flow and protected routes
- Search functionality implementation

### `/server` 
Contains the Node.js and Express.js backend application handling:
- RESTful API endpoints for posts, comments, and users
- JWT authentication middleware and security
- Database models and MongoDB integration
- Business logic and data validation
- Admin-specific route protection

## Technology Stack

**Frontend Technologies:**
- **React.js:** Component-based UI library for building interactive interfaces
- **Redux & Redux Persist:** State management and data persistence
- **JavaScript (ES6+):** Modern JavaScript features and syntax

**Backend Technologies:**
- **Node.js:** JavaScript runtime for server-side development
- **Express.js:** Web application framework for building REST APIs
- **MongoDB:** NoSQL database for flexible data storage
- **JWT (JSON Web Tokens):** Secure authentication mechanism

**Development Tools:**
- **Git/GitHub:** Version control and code repository management
- **npm:** Package management for dependencies

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Step-by-Step Installation

1. **Clone the Repository**
```bash
git clone https://github.com/ravishankar2003/mern-blog.git
cd mern-blog
```



2. **Backend Setup**
Create .env file with your MongoDB connection string and JWT secret
```bash
cd server
npm install
node index.js
```



3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```


4. **Environment Configuration**
Create `.env` files in both frontend and server directories with necessary environment variables:
- MongoDB connection string
- JWT secret key
- API endpoints

## Usage Guide

### For Regular Users
- Create an account or login with existing credentials
- Browse available blog posts using the search functionality
- Read full posts and engage through the comment system
- Manage your user profile and preferences

### For Administrators
- Access admin dashboard with elevated privileges
- Create, edit, and delete blog posts
- Moderate user comments and manage user accounts
- Monitor platform activity and content quality

## API Endpoints

The application provides RESTful API endpoints for:
- **Authentication:** `/api/auth/login`, `/api/auth/register`
- **Posts:** `/api/posts` (GET, POST, PUT, DELETE)
- **Comments:** `/api/comments` (GET, POST, DELETE)
- **Users:** `/api/users` (GET, PUT, DELETE - Admin only)

