# Polished Appointment Booking Application

## Description 
A handy tool for managers and technicians to keep track of upcoming appointments. Clients can book their appointment directly through the application by signing up through the login page, once in the Polished system clients can select their favorite technician, preferred appointment time (based on availability) through the built in calander. When the client has finished their appointment a SMS message will be sent from the application to rate the customer's overall satisfaction.

  ## Table of Contents
  - [Installation](#installation)
  - [Features](#features)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

## Installation
  ```
   git clone ....
   npm i -> install the packages
   source schema.sql
   npm run seed -> adding database
  ``` 

  
## Features 
```
Online booking options in real time
Intelligent calendar to manage appointments easier
Automated SMS messaging to clients 
Smart phone/ Tablet compatibility
```
  
## Usage 
```
Update the dotenv file to reflect the example 
Run the server from the command line by typing node.server.js or npm start
Open the local host: 3001 in your browser to the homepage,
![screenshot]("homepage screen shot")
click the login to be routed to sign-up or login,
![screenshot]("login page")
 where you will be routed to the appointment's page
![screenshot]("appointment page"). 
Exit the host from the command line by entering control + c

```



## Built With
```
        "bcrypt": "^5.0.0",
        "connect-session-sequelize": "^7.0.4",
        "dotenv": "^8.2.0",
        "express": "^4.17.1",
        "express-handlebars": "^5.2.0",
        "express-session": "^1.17.1",
        "mysql2": "^2.2.5",
        "sequelize": "^6.3.5",
        "fullcalendar": "^5.11.3"
        "twilio"




```

## Contributing

## Tests 
Twilio-sending trial messages to verified phone numbers 
Debugged codes manually to make sure it was functional 

## Questions
If you have any questions about the repo, open an issue or contact me directly at odthientho@gmail.com. You can find more our projects at [odthientho](https://github.com/odthientho/), 
[ndubuisiazi](https://github.com/ndubuisiazi), [oliviaconley](https://github.com/oliviaconley),
[lflyew](https://github.com/lflyew), [rgonsahn](https://github.com/rgonsahn)

