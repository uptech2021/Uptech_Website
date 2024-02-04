# Uptech Website
This repository contains the source code for the Uptech website, a Next.js application. It's set up to work with Docker to ensure a consistent development and production environment.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

### Installing
1. **Clone the Repository**  
Clone this repository to your local machine:
```
git clone https://github.com/uptechinc/Uptech_Website.git
cd Uptech_Website
```
2. **Building the Docker Image**  
Build the Docker image using the following command:  
```
docker build -t uptech-website .
```
3. **Running the Application**  
- For development (with hot reloading):
```
docker run -p 3000:3000 -v $(pwd):/app uptech-website
```
- For production:
```
docker run -p 3000:3000 uptech-website
```
The application will be available at **http://localhost:3000**.  

## Workflow for Collaboration
1. **Pull the Latest Changes**
Regularly pull the latest changes from the main repository:
```
git pull origin main
```
2. **Making Changes**
- Create a new branch for your updates.

3. **Creating a Pull Request**
Go to the repository on GitHub and create a pull request for your branch.
