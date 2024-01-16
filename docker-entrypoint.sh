#!/bin/sh
# This is your Docker entrypoint script

docker_executable="/usr/bin/docker"  # Assuming Docker executable is in /usr/bin/

# Check if the Docker executable exists
if command -v docker &> /dev/null; then
    # If it exists, proceed with the entrypoint commands
    echo "Docker executable found. Starting your Vue.js app."
    
    # Run any pre-entrypoint commands here
    
    # Start your Vue.js app
    npm run start
else
    # If it doesn't exist, display an error message
    echo "Error: Docker executable not found. Please make sure Docker is installed."
    # You may choose to exit the script or take other appropriate actions
    exit 1
fi