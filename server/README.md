# Prerequisites

## Setup Node.js

To setup NodeJS you need to follow these steps:

### Mac OS X

- Step1: Install Home brew

```
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

$ brew -v
```

- Step2: Install Node using Brew

```
$ brew install node

$ node -v

$ npm -v
```

### Linux Systems

- Install Node using apt-get

```

$ sudo apt install nodejs

$ sudo apt install npm

$ node -v

$ npm -v
```

### Windows 
- Install Node using the official Website: Just go on [official Node.js website](https://nodejs.org/) and download the installer.



## Setup MongoDB

Follow this Guide to install and run MongoDB Community Edition on your local machine: [Install MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/)


## Installing Required Dependencies

Entering `npm install` into the terminal will install all dependencies.

If this doesn't work, enter the following command:
```
$ npm i express express-validator express-session passport passport-local passport-linkedin passport-facebook passport-google mongoose connect-mongo body-parser bcrypt dotenv
```

## Recommended Tool
Nodemon is a very useful tool somebody can use to refresh the server each time they save.
You can install this by entering:
```
$ npm i nodemon -g
```

This way, any projects you work on will be able to use nodemon by simply calling it in the terminal.
Example for our current backend:
```
$ nodemon server.js
```

## Setup Backend Application

- Step1: Git clone the application

```
$ git clone -b BackEnd https://bitbucket-students.deakin.edu.au/scm/dimm-ug/euclideon.git backend

$ cd backend
```

- Step2: Install node modules in the backend folder 

```
$ npm i

or

$ npm install
```

- Step3: Start the application in the backend folder

```
$ npm run start
```

The current version of your application would be listening on **http://localhost:8080** or **http://localhost:3000**

