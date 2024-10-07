#!/usr/bin/sh

Help()
{
    # Display Help
    echo "This script build docker images automatically"
    echo
    echo "Syntax: build_images [-v|-W]"
    echo "options:"
    echo "W              Run in a WLS environment and change docker to docker.exe binary."
    echo "v <version>    Set the version of the docker image."
    echo "y              Skip the input check"
    echo "h              Display this help."
    echo
}

PrintLogo()
{
    # Display the logo
    echo  ".--------------------------------."
    echo  "|          BUILD IMAGES          |"
    echo  "|              alpha             |"
    echo  "|                                |"
    echo  "|   Basic docker image builder   |"
    echo  "|  to push to push the generated |"
    echo  "|   images to the Google Cloud   |"
    echo  "|        Artifact Registry       |"
    echo  "| Mantainer: jgnacio             |"
    echo "\`--------------------------------´"
}

Check_Build()
{
    # Check if the image in the current directory
    if [ -n "$file_found" ]; then
        echo "*** $DOCKER_FILE ****"
        if [ "$file_found" = "server&client" ]; then
            echo "* from server/Dockerfile *"
            cat server/Dockerfile
            echo "* from client/Dockerfile *"
            cat client/Dockerfile
        else
            cat Dockerfile
        fi
        echo
        printf "Are you sure to build this image? [Y/n] "
        read -r default_input
        if [ "$default_input" = "y" ] || [ -z "$default_input" ]; then
            Build
        else
            exit 1
        fi
        echo "*LIST IMAGES"
        printf "Are you sure to Push this image? [Y/n] "
        read -r default_input
        if [ "$default_input" = "y" ] || [ -z "$default_input" ]; then
            Push
        else
            exit 1
        fi
        exit
    else
        echo "Dockerfile not found in the current directory."
        exit 1
    fi
}

Build()
{
    # Build the image in the current directory
    if [ "$file_found" = "server&client" ]; then
        $DOCKER_BIN build -t "$URL_REPO""$IMAGE_NAME"".front":"$IMAGE_TAG" client/ && printf "\033[0;32mImage uccesssfully Build!\033[0m\n"
        $DOCKER_BIN build -t "$URL_REPO""$IMAGE_NAME"".api":"$IMAGE_TAG" server/ && printf "\033[0;32mImage uccesssfully Build!\033[0m\n"
    else
        $DOCKER_BIN build -t "$URL_REPO""$IMAGE_NAME":"$IMAGE_TAG" . && printf "\033[0;32mImage uccesssfully Build!\033[0m\n"
    fi
    
}

Push()
{
    # Push the image to Google Cloud artifact registry
    gcloud auth print-access-token | $DOCKER_BIN login -u oauth2accesstoken --password-stdin https://$CLOUD_ZONE-docker.pkg.dev \
    && printf "credentials updated. \033[0;32m[OK]\033[0m\n" || printf "\n\033[0;31mcredentials updated. [FAIL]\033[0m\n"
    
    if [ "$file_found" = "server&client" ]; then
        $DOCKER_BIN push "$URL_REPO""$IMAGE_NAME"".front":"$IMAGE_TAG" && printf "Successfully pushed to Google Cloud artifact registry. \
        \033[0;32m[OK]\033[0m\n" || printf "\n\033[0;31mAn error has occurred on the Front image push. [FAIL]\033[0m\n"
        $DOCKER_BIN push "$URL_REPO""$IMAGE_NAME"".api":"$IMAGE_TAG" && printf "Successfully pushed to Google Cloud artifact registry. \
        \033[0;32m[OK]\033[0m\n" || printf "\n\033[0;31mAn error has occurred on the API image push. [FAIL]\033[0m\n"
    else
        $DOCKER_BIN push "$URL_REPO""$IMAGE_NAME":"$IMAGE_TAG" && printf "Successfully pushed to Google Cloud artifact registry. \
        \\033[0;32m[OK]\033[0m\n" || printf "\n\033[0;31mAn error has occurred. [FAIL]\033[0m\n"
    fi
    
}

# Set variables
DOCKER_BIN="docker"
DOCKER_FILE="Dockerfile"
CLOUD_ZONE="us-west1"
URL_REPO="$CLOUD_ZONE""-docker.pkg.dev/caramel-world-437314-q2/aslan-docker/"
IMAGE_NAME="product-sku-internal-service"
file_found=$( (test -f Dockerfile && echo ".") \
    || (test -f server/Dockerfile && test -f client/Dockerfile \
&& echo "server&client"))

# Get options
while getopts ":hv:Wy" option; do
    case $option in
        h) # Display Help
            Help
        exit;;
        W) # Run in WLS environment
            DOCKER_BIN="docker.exe"
        ;;
        y) # Skip input checks
            no_check=true
        ;;
        
        v) # Set version
            IMAGE_TAG="$OPTARG"
            PrintLogo
            sleep 0.3
            if [ "$no_check" = true ]; then
                Build
                Push
            else
                Check_Build
            fi
        exit;;
        \?) # Unrecognized option
            echo "Unknown option: $OPTARG"
        exit 1;;
    esac
done