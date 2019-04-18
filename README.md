# SamplePOS

## Demo
https://konstantvariablespos.herokuapp.com

## Overview
This repository represents a sample POS system with features like login,register,(add/edit/delete/view) products, and (add/view) orders.

## Technologies
Node.js for backend with Express framework <br>
Angular2 for frontend

## Project Structure
This project consists of a frontend (samplepos-frontend) folder that is basically an Angular2 application that utilizes the API endpoints. This folder when built for production, exports itself into 'public' folder.

The API part consists of 3 major modules (Users,Products,Orders) <br>

Users module is responsible for registeration/authentication/viewing of a user. <br>
Products module is responsible for addition/deletion/updation/viewing of a product. <br>
Orders module is responsible for creation/viewing of an order. <br>

## Requirements
Node <br>
NPM <br>
Angular2 <br>
MongoDB <br>

## HowTo
Clone this repo locally and then; <br>

FOR FRONTEND: <br>
The frontend is already exported in 'public' folder. After any changes are made, you can
rebuild using <br>

//(you must be in samplepos-frontend folder) <br>
npm install --save <br>
ng build --prod <br>

<br>
FOR BACKEND:<br>
//(You must be in root folder) <br>
npm install --save <br>
nodemon

## Misc
All the API end points and frontend routes are protected.
<br>For direct request to the API, two headers along with the request data are to be sent.
<br>"Authorization":<token>
<br>//token will be returned once the user is authenticated.
  <br> and <br>
  "Content-Type":"application/json"
  <br>

