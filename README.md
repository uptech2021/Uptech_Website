# Uptech Website
<img src="https://github.com/uptechinc/Uptech_Website/assets/62683196/df1e7109-bf69-47ac-bd2a-72ab17868b76" width="50%" height="50%" alt="Alt text">  

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


# Docker Management Guide
<img src="https://1.bp.blogspot.com/-MbT2cN_FQn8/XsuLfcGby_I/AAAAAAAALIs/w5ypVNXhvegwgeysPvMLCgb9tXdhE15LACLcBGAsYHQ/s1600/docker.png" width="50%" height="50%" alt="Alt text">
This guide provides instructions on how to manage Docker images and containers including creation, naming, renaming, and listing.

## Docker Images
### Creating Docker Images
To create a Docker image from a Dockerfile, use the docker build command. Navigate to the directory containing your Dockerfile and run:
```
docker build -t [image_name] .
```
- Replace [image_name] with your desired image name. Example:
```docker build -t uptech-website:latest```
### Listing Docker Images
To list all Docker images on your system:
```
docker images
```
### Deleting Docker Images
To delete a specific Docker image:
```
docker rmi [image_name]
```
- Replace [image_name] with the name of the image you want to remove.

## Docker Containers
### Creating and Running Containers
To create and run a Docker container from an image:

```
docker run -d -p [host_port]:[container_port] --name [container_name] [image_name]
```
- Replace [host_port] with the port number on your host.
- Replace [container_port] with the port number in the container.
- **`[container_name]`** is your custom name for the container.
- **`[image_name]`** should match the image you want to run.

Example:
```
docker run -d -p 3000:3000 --name uptech-app uptech-website
```
### Listing Docker Containers
To list all running containers:
```
docker ps
```
To list all containers, including stopped ones:
```
docker ps -a
```
### Renaming Docker Containers
To rename a Docker container:

1. Stop the container if it's running:
```
docker stop [old_container_name]
```
2. Rename the container:
```
docker rename [old_container_name] [new_container_name]
```
3. Restart the container if needed:
```
docker start [new_container_name]
```
### Deleting Docker Containers
To delete a specific container:
```
docker rm [container_name]
```
To delete all stopped containers:
```
docker container prune
```
