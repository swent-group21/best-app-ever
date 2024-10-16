# Get your ip
ip="\"$(hostname -I | awk '{print $1}')\""

# Store into .ip file
echo "${ip}" | tee .ip

# Build container
docker build  \
    --build-arg REACT_NATIVE_IP=${ip} \
    -t strive .

docker run -it --rm --name strive_cont \
           -p 19001:19001 \
           -p 19002:19002 \
           -p 19006:19006 \
           -e REACT_NATIVE_PACKAGER_HOSTNAME=${ip} \
           -v ./:/opt/strive:rw \
           strive

