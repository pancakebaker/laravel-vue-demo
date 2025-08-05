# Laravel + Vue (Inertia) Demo Project

This is a full-stack Laravel 12 + Vue 3 application built with Inertia.js and Tailwind CSS, created for demonstration purposes.

## Features

- Laravel 12 backend
- Vue 3 frontend via Inertia.js
- Tailwind CSS for utility-first styling
- Vite for fast asset bundling
- Authentication system (login, registration)
- Reusable Vue components
- Clean architecture with Blade + Vue hybrid rendering

---

## Tech Stack

| Layer       | Technology         |
|-------------|--------------------|
| Backend     | Laravel 12         |
| Frontend    | Vue 3 + Inertia.js |
| Styling     | Tailwind CSS       |
| Build Tool  | Vite               |
| Auth        | Laravel Breeze     |
| DB          | MySQL (configurable) |

---

## Getting Started

### Backend Setup

```bash
# Backend setup
composer install
cp .env.example .env
php artisan key:generate

# Update the .env file with your database credentials:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Run migrations:
php artisan migrate

# Frontend Setup
npm install

# Running the Application

## Use two terminals or terminal tabs:
php artisan serve
npm run dev
