#Script for running docker and uploading latest container to docker hub
##########################
#This script assumes that the container has been started and is running
#And has the name epa-middleware. If not, the script will fail.
##########################
echo "---------------------"
echo "Building Docker Image"
echo "---------------------"
docker build -t conceptplus/epa-middleware .

echo "----------------------------------"
echo "Pushing Docker Image to Docker Hub"
echo "----------------------------------"
docker push conceptplus/epa-middleware

echo "-----------------------------------------"
echo "Stopping the Current Running Docker Image"
echo "-----------------------------------------"
docker stop epa-middleware
docker rm epa-middleware

echo "-------------------------------------------------"
echo "Running Docker Image - conceptplus/epa-middleware"
echo "-------------------------------------------------"
docker run -p 8181:8181 --name epa-middleware -d conceptplus/epa-middleware