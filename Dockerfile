# pull base image
FROM node:22-bookworm-slim

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 19006 for node, and 19001 and 19002 (tests) for debug
ARG PORT=19006
ENV PORT $PORT
EXPOSE 19006 19001 19002

# add in your own IP that was assigned by EXPO for your local machine

# Use ARG to get the IP during build
ARG REACT_NATIVE_IP
ENV REACT_NATIVE_PACKAGER_HOSTNAME=${REACT_NATIVE_IP}

# install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm -g npm@latest expo-cli@latest
RUN apt-get update && apt-get install -y qemu-user-static

#We need to install this inorder to start a tunnel on the docker conatiner
#RUN npm i @expo/ngrok

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir /opt/strive && chown root:root /opt/strive
WORKDIR /opt/strive
ENV PATH /opt/strive/.bin:$PATH
USER root
COPY package.json package-lock.json ./
RUN npm install
RUN expo install expo-auth-session expo-random


# copy in our source code last, as it changes the most
WORKDIR /opt/strive
# for development, we bind mount volumes; comment out for production
COPY . /opt/strive/

CMD ["npx","expo", "start", "--tunnel"]
