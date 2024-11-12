# Expo Dockerization Tutorial

This documentation provides a step-by-step guide for developers who want to containerize their React Native apps using Expo. The goal is to freeze the local environment to avoid dependency or node version issues during development. This guide assumes that the repository already contains a working `Dockerfile` and will use the command `npx expo start --tunnel` to run the Expo app.

**Note: We are following this tutorial so if you have any questions please read into it.**
[Tutorial](https://medium.com/@ashaymotiwala/dockerize-your-react-native-application-the-right-way-541e049c59cf)

## Prerequisites

Before proceeding, ensure the following are installed on your local machine:

- **Docker Desktop**: For containerization.
- **Node.js**: Required for running JavaScript and Node-based applications.
- **Expo CLI**: Install globally using the following command:
  ```bash
  npm install --global expo-cli
  ```
- **React Native Application**: If you don't have one, follow [this tutorial](https://blog.expo.dev/developing-a-react-native-app-with-expo-cf6566732311) to create a basic React Native app.

## Setting your IP as an argument for Docker

1. First run `npm start` so as to learn your expo ip address is.
2. Copy and paste it into your .ip file

## Dockerfile Overview

The provided `Dockerfile` is designed to containerize your Expo project. Below is a breakdown of the key components:

### Key Dockerfile Sections

1. **Base Image**: The Dockerfile uses the `node:14.18.1-buster-slim` image as the base.

   ```dockerfile
   FROM node:14.18.1-buster-slim
   ```

2. **Environment Variables**:

   - `NODE_ENV`: Defines the environment (development or production).
   - `PORT`: Exposes the necessary ports for Expo (19006, 19001, 19002).
   - `REACT_NATIVE_PACKAGER_HOSTNAME`: Exposes the IP to the container

   ```dockerfile
   ENV REACT_NATIVE_PACKAGER_HOSTNAME=${REACT_NATIVE_IP}
   ```

3. **Global Packages**: Installs the latest versions of `npm` and `expo-cli`, and adds `@expo/ngrok` for tunneling.
   ```dockerfile
   RUN npm i --unsafe-perm -g npm@latest expo-cli@latest
   RUN yarn add @expo/ngrok
   ```
4. **App Setup**: Copies the app's `package.json` and installs dependencies using `yarn`.
   ```dockerfile
   COPY package.json package-lock.json ./
   RUN yarn install
   ```
5. **Command to Start Expo**: The default command to start the Expo app is:
   ```dockerfile
   CMD ["npx", "expo", "start", "--tunnel"]
   ```
   This ensures that the Expo app runs in tunnel mode, allowing access from devices on different networks.

## Running the Docker Container

### Step 1: Build the Docker Image

To build the Docker image, run the following command in your project directory:
Takes in the IP as an argument

```bash
docker build  \
    --build-arg REACT_NATIVE_IP=$(cat .ip) \
    -t strive .
```

This command will create a Docker image named strive following the Dockerfile in the root directory

### Step 2: Run the Docker Container

Run the container with the necessary port mappings:

```bash
docker run -it --rm --name strive_cont \
            -p 19001:19001 \
            -p 19002:19002 \
            -p 19006:19006 \
            -e REACT_NATIVE_PACKAGER_HOSTNAME=$(cat .ip) \
            -v ./:/opt/strive:rw \
            strive
```

This command will create a container named strive_cont following the built image strive

### Step 3: Verify the IP Address

Ensure that the `REACT_NATIVE_PACKAGER_HOSTNAME` in the `Dockerfile` matches the IP address assigned by Expo to your local machine. You can check this by running the Expo app locally:

```bash
npx expo start
```

The IP address displayed in the terminal should match the one in the `Dockerfile`.

### Step 4: Access the Container (Optional)

If you need to access the running container, use the following command:

```bash
docker exec -it strive_cont bash
```

## Step 5: Expo Mode

Once inside the container, you can manually start the Expo app with:

```bash
expo start --tunnel
```

## Step 5: Testing Mode

Once inside the container, you can test your code using

```bash
npm test
```

## Why Use Tunnel Mode?

By default, Expo listens for connections on your local network. However, when using the `--tunnel` option, Expo sets up a secure tunnel using `ngrok`, allowing access from any device with an internet connection. This is especially useful when your local machine and Docker container are on different networks.

### Tunnel Mode Benefits:

- **Cross-Network Access**: Devices on different networks can access the development server.
- **Secure Connection**: The tunnel is secured via `ngrok`.
- **Unique URL**: Expo generates a unique URL (e.g., `https://random-subdomain.ngrok.io`) that can be used to access the app.

## Troubleshooting

If the Expo app is not accessible:

1. **Check IP Address**: Ensure the `REACT_NATIVE_PACKAGER_HOSTNAME` in the `Dockerfile` matches the IP assigned by Expo.
2. **Container Access**: Use `docker exec` to access the container and manually start the Expo app with `expo start --tunnel`.
3. **Network Issues**: Ensure that the necessary ports (19001, 19002, 19006) are exposed and accessible.

## Conclusion

By following this guide, you can successfully containerize your Expo-based React Native app and run it in a Docker environment. Using the `--tunnel` option ensures that your app is accessible from any device, regardless of network configurationj
