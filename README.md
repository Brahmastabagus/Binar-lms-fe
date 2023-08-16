# Todo List Website Project
This repository contains the codebase for a Todo List website, developed as part of the mockup test for the Binar Academy. The project aims to create a user-friendly web application for managing tasks and to-do lists. 

## Demo  
[Link Demo](https://mockuptest-todolist.zeabur.app/)

Available Account:
- 2345
- 5678

## Authors  
- [@Brahmastabagus](https://github.com/Brahmastabagus)  

# Table of contents  
1. [Tech Stack](#tech-stack)  
2. [Features](#features)
3. [Usage](#usage)
4. [Run Locally](#run-locally)
5. [Environment Variables](#environment-variables)
6. [Mockup test answers](#mockup-test-answers)  
    1. [Apakah Kegunaan JSON pada REST API?](#apakah-kegunaan-json-pada-rest-api)
    2. [Jelaskan bagaimana REST api bekerja?](#jelaskan-bagaimana-rest-api-bekerja)  
7. [Feedback](#feedback)  

## Tech Stack  

**Client:** Vite, React, Redux Toolkit, React Bootstrap

## Features  

- Login with 4 number
- Add new tasks with due dates.
- Mark tasks as completed.
- Edit task details.
- Delete tasks from the list.
- View details from the list.
- Filter tasks based on their priority (high/medium/low).
- Auth Middleware.
- User-friendly interface.
- Authentication Account. 

## Usage

1. Login with a 4-digit number using the available account above.
2. Add new tasks by clicking on the 'Create Todo' button and providing task details.
3. Mark tasks as completed by checking the checkbox.
4. Edit task details by clicking the icon 'Pencil' on the right task card.
5. Delete tasks by clicking the icon 'Trash' on right the task card.
6. Click on the task card to display a modal containing task details.
7. Use the filter options to view high or medium or low priority tasks.
8. You cannot access the todo page without logging in.

## Run Locally  

Clone the project  

~~~bash  
  git clone https://github.com/Brahmastabagus/Binar-lms-fe.git
~~~

Go to the project directory  

~~~bash  
  cd Binar-lms-fe
~~~

Install dependencies  

~~~bash  
npm install
~~~

Start the server  

~~~bash  
npm run start
~~~

## Environment Variables  

To run this project, you will need to add the following environment variables to your .env file  
`VITE_API`

# Mockup test answers
Here is the answer to the question provided in the mockup test on the Binar Academy's LMS:

## Apakah Kegunaan JSON pada REST API?
JSON pada REST API berguna sebagai format data untuk melakukan pertukaran informasi dari server ke client atau sebaliknya, dimana JSON ini mudah untuk dibaca oleh manusia maupun dibaca oleh mesin.

## Jelaskan bagaimana REST API bekerja?
Cara kerja dari REST API itu adalah dari client pengirimkan permintaan ke server. Permintaan akan dikirimkan melalui sebuah Endpoint yang sudah tersedia pada REST API yang memiliki operasi HTTP sesuai dengan permintaan. Kemudian, server akan menerima permintaan, mengolah informasi sesuai permintaan, dan mengirimkan kembali ke client dalam bentuk JSON beserta dengan status code.

## Feedback  

If you have any feedback, please reach out to us at brahmastabagus@gmail.com
