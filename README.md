# SamplePOS

## Demo


## Overview
This repository represents a sample POS system with features like login,register,(add/edit/delete/view) products, and (add/view) orders.

## Technologies
Node.js for backend with Express framework
Angular2 for frontend

## Project Structure
This project consists of a frontend (samplepos-frontend) folder that is basically an Angular2 application that utilizes the API endpoints. This folder when built for production, exports itself into 'public' folder.

The API part consists of 3 major modules (Users,Products,Orders)

Users module is responsible for registeration/authentication/viewing of a user.
Products module is responsible for addition/deletion/updation/viewing of a product.
Orders module is responsible for creation/viewing of an order.

## Requirements
Node
NPM
Angular2
MongoDB

## HowTo
Clone this repo locally and then;

FOR FRONTEND:
The frontend is already exported in 'public' folder. After any changes are made, you can
rebuild using 

//(you must be in samplepos-frontend folder)
npm install --save
ng build --prod 

FOR BACKEND:
//(You must be in root folder)
npm install --save
nodemon