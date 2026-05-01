These all are the steps for running a docker file -

 => first make a docker file name "Dockefile"  must check the nameing convention of dockers file

=> check the basic code on "Dockerfile"  -

# this step brings node and OS together, this step is always same
    FROM node:20-alpine

# here last dot (.) means image, it means "copy package.json in image"
     COPY ./package.json .
     COPY ./package-lock.json .

     RUN npm install

# This step brings - /src , server.js , dockerfile
# This only step runs again and again left others are saved in cache becz they do not run over again and again

    COPY . .
    CMD ["node", "server.js"]




=> Phases of Dockers implementation

Phase1 -
  convert the express server into Image of Docker
  run command -  docker build . -t express_server(This is an image name)


Phase2 - 
     convert the image into container 
     express_server(This is an image name)
     
      run command -  docker run express_server


=> After second phase server run on container's port no 9000 of docker that is why it can't run on browser or we can't access it from your system.

=> 'docker run' command lists the all containers that are currently running 

=>  "docker stop" command stop the container

To access the port outside the container "port mapping" is performed this is how it is done -
    => again run a image using command "docker run -p 8080:9000 express_server"
       docker run -p 8080:9000 -  -p = port mapping
                                   8080 = random number (or use 9000)
                                   9000 = current port 
                                   express_server = name 
    => after this command server runs on your system's browser but now on the port 8080                               


=> check node version - 

     node --version -> v22.16.0
=> now check the node version running on dockers container   
      7338a4ab2 - (replace this current container id)
      
     docker exec -it 7338a4ab2 node --version -> v20.20.2


 both versions are different 
 
=> This is the reason dockers does not have any effect on what the diff collaborators versions are, it make the version same for all



* In docker we can make multiple container on single image

=> "docker ps" command is used to check the containers currently running 

=> "docker stop d0a848283530" we can stop docker container using its id
=> "docker rm d0a848283530" remove the container using id


When we build a Docker image, only the APIs included at that time will run in the container. If we add a new API later, it won’t work until we rebuild the image and restart the container.

To run this later added api http://localhost:8000/api/users follow these steps -

step1 - "docker build -t express_server" run this command again to make an image again

step2 - "docker run -p 8080:9000 express_server" use this command again make a container






 During development, we use "Docker Compose", rebuilding the image again and again is not a good approach.

step1 -   
  now make a "docker-compose.yml" file for docker compose


docker-compose.yml-

    services:
    
      backend: 
       build: ./Backend 
       ports:
           - "8080:9000"
       volumes:
           - ./Backend:.

what the above code do -

   build: ./Backend → "Look inside the 'Backend' folder for instructions on how to build the app"

   ports: "8080:9000" → "Open your browser on port 8080 to talk to the app running on port 9000 inside the container"

   volumes: ./Backend:. → "Keep syncing files between your computer and the container, so when you change code, it updates automatically in the running container (no need to rebuild)"



step2-
"docker compose up" run this command from the folder(DOCKER) where it present 
    PS C:\XTutorials\Sheriyans\DOCKER> docker compose up


step3 -
now change the code of Dockerfile to this -

    FROM node:20-alpine

     WORKDIR /app

     COPY ./package.json /app
     COPY ./package-lock.json /app

     RUN npm install
     COPY . /app
     CMD ["node", "server.js"]

  and docker-compose.yml to this -
  
     services:
     backend: 
        build: ./Backend 
         ports:
             - "8080:9000"
        volumes:
              - ./Backend:/app
              - backend_node_modules:/app/node_modules
        command: npx nodemon -L server.js     


      volumes:
          backend_node_modules:

what the code is doing in Dockerfile undestand it -

  WORKDIR /app → Create and switch to the /app folder inside the container (like cd /app)

  COPY ./package.json /app → Copy your package.json file into the container's /app folder

  COPY ./package-lock.json /app → Copy your package-lock.json file too

  COPY . /app → Copy ALL your remaining project files into the container


step4- run this command
  docker build . -t express_server  

step5- stop the running container (don't delete it)  

step6- run this command
  docker run -p 8080:9000 express_server

step7- add this line in docker-compose.yml file, this line reflects the server changes 

      command: npx nodemon -L server.js     

step8- run command on this folder
PS C:\XTutorials\Sheriyans\DOCKER> docker compose up 


  

=> We don’t include node_modules in a Docker image because: 
   * makes image heavy and slow
   * local modules (Windows/Mac) may break in Linux container

=> Docker installs packages inside its own container, not from your computer using this "RUN npm install" in Dockerfile
       
   So if 5 developers run the same Docker image:
     all get same Node version
     same packages
     same OS (Linux container)
