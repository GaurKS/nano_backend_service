# nano_service

## Pre-requisites
-   Install  [Node.js](https://nodejs.org/en/)
-  Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)


## Running the app

-   Clone the repository
```
git clone  <project_url>
```
-  Change directory to backend and install the package
```
cd backend
npm install
```
- Start your docker env in background and build the container.
```
docker compose up --build -d
```
- Change directory to frontend
```
cd ..
cd frontend 
```
-   Build and run the project
```
npm install
npm run start
```

-   Navigate to  `http://localhost:3000`
