# Library Management System

Welcome to my Library Management System!  
A full-stack library management system built with Django and *React. This system allows users to manage books, users, borrowing records, and more. 
* Django REST Framework powers the backend to create RESTful APIs, while the frontend uses React for building a responsive and interactive user interface.

## Features

- *Book Management:* Add, update, and delete books in the system (admin side only).
- *Reader Management:* Manage library readers and their rental records.
- *Book Bag:* Readers can add books to their personal bags.
- *Checkout System:* Allows readers to check out the selected books. (In Progress)
- *Return System:* Manage returns and track due dates. (In Progress)
- *React Frontend:* A user-friendly interface for managing book bags, checking out, and returns.

## Table of Contents

## 🔧 Features

- 📕 Add, update, and delete books
- 👤 Manage users and their borrowed books
- 📊 Track borrowing & return history
- 🛡️ Authentication & authorization
- 🌐 RESTful API built with Django REST Framework

---

## 🧪 Technologies Used

- Django
- Django REST Framework
- SQLite3 or MySQL
- Postman (for testing)
- Git & GitHub
### Backend (Django)                                                       

2. Create a virtual environment and activate it:
   python -m venv
   # On Windows use source venv\Scripts\activate

3. Install the dependencies:
   pip install -r requirements.txt
   pip install djangorestframework

4. Apply migrations to set up the database:
    python manage.py makemigrations
    python manage.py migrate

5. Create a superuser for the Django admin panel:
    python manage.py createsuperuser

6. Run the development server:
    python manage.py runserver

## 🚀 Getting Started

git clone https://github.com/Nicole9-Sky/my-library-management-app.git
cd my-library-management-app
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate (Windows)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# Setup

# Frontend (React)
# THANK YOU
