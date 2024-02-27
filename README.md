# CloneKeep

A clone of some of the functions of [Google Keep](https://keep.google.com)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [knex](https://knexjs.org) installed a global package
  - `npm install -g knex`
- [Mysql](https://www.mysql.com/) installed and a database created.

### Installing 

- Clone the repository to your local machine:
    
   `git clone https://github.com/vicleyva/clonekeep.git`

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

- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [Knex](https://knexjs.org/)
- [Mysql](https://www.mysql.com/)
- [Multer](https://www.npmjs.com/package/multer)
- [Mui](https://mui.com/)
- [UUID](https://www.npmjs.com/package/uuid)

### About the Project

This project was created as part of studying and comprehending the React environment. It also serves as an opportunity to explore and use the MUI framework for styling.