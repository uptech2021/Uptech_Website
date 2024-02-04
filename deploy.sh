#!/bin/bash

# Name of the Docker image
IMAGE_NAME="uptech-website"

# Name of the Docker container
CONTAINER_NAME="uptech_container"

# Build the Docker image for production
docker build -t $IMAGE_NAME .

# Stop and remove the existing container if it exists
docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME

# Run the new container in detached mode (in the background)
docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
