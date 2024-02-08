# NOTE 
### If You switch one profile to another profile(ex- user to admin or student or instructor) it shows page not found try going back to original link, then it will work.

# MasaiSchoolClone

**Table of Contents**

- [Introduction](#introduction)
- [Tech Stacks](#Tech-Stacks)
- [Features](#features)
- [API Endpoints](#API-Endpoints)
- [Highlights](#Highlights)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The **Education System** is a comprehensive web-based platform designed to facilitate various aspects of educational institutions. This system is developed to streamline student management, course administration, and instructor coordination processes. Built using SpringBoot for the backend and Angular for the front end, it offers a robust solution for educational organizations to manage their resources efficiently.

## Tech Stacks
- Front-End: Angular
- Back-End: Spring Boot (Java)
- Database: MySQL
- Generative AI
- Deployment: Netlify (Frontend)

## Features

- **User Management:** Users can register, log in, and manage their profiles,buy courses. Different roles such as students, instructors, and administrators are supported.

- **Student Profiles:** Students can create and update their profiles, including personal information and course enrollments, submitting Assignments, course ratings and many more.

- **Instructor Profiles:** Instructors can manage their profiles, including contact details, and can create lectures and assignments.

- **Course Management:** Administrators can add, edit, and delete courses. Instructors can manage the courses they are assigned to.

- **Enrollment System:** Students can enrol in courses, view course materials, and track their progress.

- **Grading:** Instructors can grade assignments and assessments, and students can access their grades.
  
-  **ChatBot:** ChatBot helps to resolve the issue of the user in no time.

## API EndPoints
# User Authentication
- **POST** user/register
- **GET** auth/signin

# User Profile
- **GET** user/get_user/{email}
- **GET** user/get_user_id/{uid}

# Student Profile
- **POST** student/create/{email}
- **GET** student/fetch-all/{userId}
- **GET** student/fetch-all-courses/{stu_id}
- **GET** student/fetch-by-user-id/{userId}
- **PUT** student/update/{studentId}/{userId}
- **DELETE** student/delete/{studentId}
- **GET** student/fetch/{studentId}
- **GET** student/enroll/{studentId}/{courseId}

# Instructor Profile
- **POST** instructor/create/{departId}/{email}
- **GET** instructor/fetch-all
- **GET** instructor/fetch-by-user/{uid}
- **GET** instructor/fetch/{insId}
- **GET** instructor/get_dept/{ins_id}
- **GET** instructor/fetch-all-byDept/{departID}
- **PUT** instructor/update/{instructorId}
- **DELETE** instructor/delete/{insId}

# Department Profile
- **POST** depart/create
- **GET** depart/fetch-all
- **GET** depart/get/{department_id}

# Category 
- **POST** category/create
- **GET** category/getAll
- **GET** category/get/{id}
- **PUT** category/update/{updateId}

# Course
- **POST** course/create/{departID}/{ins_id}/{categoryId}
- **GET** course/fetch-all
- **GET** course/fetch-all-sorted/{pageNumber}/{sortingStr}/{sortDir}
- **PUT** course/update/{updateId}
- **PUT** course/update-depart/{departId}/{courseId}
- **DELETE** course/delete/{courseId}
- **GET** course/fetch/{courseId}
- **GET** course/fetch-all/{departmentID}
- **GET** course/instructor-course/{instructorId}
- **GET** course/course-by-category/{categoryId}
- **GET** course/course-by-category-and-instructor
- **PUT** course/assign-to-instructor/{instructorId}/{courseId}
- **GET** course/get-inst/{courseId}
- **GET** course/get-cat/{courseId}
- **GET** course/get-dept/{courseId}
- **GET** course/rate/{courseId}/{rating}

# Lecture
- **POST** lecture/create/{courseId}/{instructorId}
- **GET** lecture/fetch-all
- **PUT** lecture/update/{lectureId}
- **DELETE** lecture/delete/{lectureId}
- **GET** lecture/fetch/{id}
- **GET** lecture/lecture-of-course/{courseId}
- **GET** lecture/lecture-of-course-instructor/{instructorId}/{courseId}
- **GET** lecture/course-of-lecture/{lectureId}
- **GET** lecture/instructor-of-lecture/{lectureId}
- **GET** lecture/lecture-of-course-instructor/{instructorId}
- **GET** lecture/assignment-of-lecture/{lectureId}

# Assignment
- **POST** /assignment/create/{userId}/{courseId}/{lectureId}
- **GET** /assignment/fetch-all/{userId}/{courseId}
- **GET** /assignment/fetch-all/{userId}/{courseId}/{lectureId}
- **PUT** /assignment/update/{userId}/{updateId}
- **DELETE** /assignment/delete/{userId}/{assignmentId}
- **GET** /assignment/fetch/{userId}/{assignmentId}

# Submission
- **POST** /submission/create/{studentId}/{assignmentId}
- **GET** /submission/fetch-all/{studentId}
- **GET** /submission/fetch-all-assignment/{studentId}/{assignmentId}

# Announcement
- **POST** /announce/create/{userId}/{departId}/{courseId}
- **GET** /announce/getAnnounce-list/{userId}
- **GET** /announce/getAnnounce-list-of-course/{userId}/{courseId}
- **PUT** /announce/update-announce/{userId}/{announceId}
- **DELETE** /announce/delete-announce/{userId}/{announceId}

# Enrollment
- **POST** /enrollment/enroll/{courseId}/{studentId}

# ChatBot
- **GET** /bot/chat/{prompt}


## HighLights
![Database Entity](https://github.com/kumarprem66/sparleom/blob/main/images/splendors.png)

## Demo

Explore our **[live demo](https://65c52340426c29007446b801--frabjous-griffin-33f102.netlify.app/)** to see the Education System in action. You can experience user registration, course enrollment, and other key features.

## Getting Started

Follow these steps to set up the Education System on your local machine.


### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/education-system.git
   ```

4. **Install Angular Dependencies:**
```bash
  cd frontend
  npm install
```
5. **Database Setup:**
### Create a MySql database and configure the database settings in settings.py.
### Apply migrations:

6.**Run the Application:**

### Start the Angular development server (in another terminal):
   ```bash
cd frontend
ng serve
```
**Access the Application:**

### Open a web browser and navigate to http://localhost:4200/ to access the Education System.


## Usage
The Education System is designed to be intuitive and user-friendly. Here are some basic usage instructions:

### User Registration:

Sign up as a student, instructor, or administrator.
Fill in your profile details.
Course Management:

Administrators can add and manage courses.
Instructors can assign themselves to the courses they teach.
Student Enrollment:

Students can enrol in available courses.
Access course materials and assignments.
Grading:

Instructors can grade assignments.
Students can view their grades.

### Contributing
We welcome contributions to the Education System project! Whether you want to report a bug, suggest an enhancement, or contribute code, please follow our contribution guidelines.

### License
This project is licensed under the MIT License.






