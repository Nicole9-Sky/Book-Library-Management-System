# Library Management System

A full-stack library management system built with Django and *React. This system allows users to manage books, users, borrowing records, and more. 
The backend is powered by *Django REST Framework to create RESTful APIs, while the frontend uses React for building a responsive and interactive user interface.

## Features

- *Book Management:* Add, update, and delete books in the system (admin side only).
- *Reader Management:* Manage library readers and their rental records.
- *Book Bag:* Readers can add books to their personal bags.
- *Checkout System:* Allows readers to check out the selected books.(In Progress)
- *Return System:* Manage returns and track due dates.(In Progress)
- *React Frontend:* A user-friendly interface for managing book bags, checking out, and returns.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)

## Installation

### Backend (Django)                                                                      

1. Clone the repository:

   ```bash
   git clone https://github.com/AshishGitHub12/Library-Management-System.git
   cd library-management-system/backend

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

# Setup

# Frontend (React)

1. Navigate to the frontend directory:
    cd ../frontend

2. Install frontend dependencies using npm:
    npm install

3. Run the frontend development server:
    npm start

# THANK YOU
