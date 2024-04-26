# Project Setup Guide

This guide outlines the steps needed to get the project up and running on your local machine. This project consists of an image service, a back end server, and a front end application.

## Prerequisites

Before you start, ensure you have the following installed:
- Node.js and npm
- Python
- MongoDB
- HTTP-server (can be installed via npm)

## Setup Instructions

### Image Service

To serve local images, use the HTTP-server. Navigate to your image directory and start the server:

```bash
http-server /Users/<path-to-poodle-search>/archive/test -p 8080
```

Replace <path-to-poodle-search> with the actual path to your project directory.

### Back End Service
The back end service uses MongoDB and a Python server. Follow these steps:

Import Database to MongoDB:
Make sure MongoDB is running on your machine.
Import your database data. (Ensure you provide specific commands or files if needed.)
Start the Python Server:
Navigate to the fruit directory and start the server using:
```bash
cd fruit
python app_v2.py
```

### Front End Service
Set up and run the front end locally:
```bash
cd poodle-search
npm run dev    # Prepares the development environment
npm start      # Starts the front end service
```


