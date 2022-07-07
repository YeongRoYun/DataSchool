# Docker
- Docker is a service that inlcudes **DAEMON** for container virtualization and **COMMAND** for manipulating it
- Specialize the deployment of applications

## Example
- Construct several test environments

## Benefits
- Light Virtualization
- Higher portability regardless to OS
- The connection with other containers or clouds

## Improper Usage
- Construct real OS environment
  - Use other virtualization like VMWare
- Non-Linux environments

## Concept

### Container Virtualization
- Isolate resources needed by an app in OS
- Container means the isolated environment
- Share the kernel

### Application-oriented Service
- Runtime doesn't matter the kernel
- Use DSL(Dockerfile) to configurate containers and deploy services
- VCS for image
- Layer-structure of image format
  - Step-by-step building is possible
- Docker registry for storing images
- Programmable API

## Simple Docker-Style
Run "hello world" script file
1. Make ```Dockerfile```
   ```
   FROM # Define docker image(OS)
   COPY # copy files to image
   RUN  # Execute commands

   # Above are execueted in build process
   # Now running process configure
   COM # Define commands executed before running container 
   ```
2. build image using ```Dockerfile```
   ```docker image build -t helloworld:latest .```
3. Run container
   ```docker container run helloworld:latest```

## The reasons of using docker

### Idempotency and IaC
- App always has dependent on some infra
- To make the environment equal, use IaC or Immutable Infra

#### IaC
- Define infrastructures as Code
- Configuration and Construction are easy but cannot guarantee **IDEMPOTENCY**
```
nodebrew install-binary stable
```
- stable version can be changed
- To guarantee idempotency, hard-coding is required

#### Immutable Infrastructure
- Duplicate the **stored** configuration
- To change the the configuration
  - Construct new server
  - Save the status
  - Destory the server
  - Duplicate the status
- Idempotency doesn't matter 'cause the server is destroied, not changed
- The time for construction can be more needed

#### Docker with Iac and Immutable Infra
- Infra configurations are managed by **Dockerfile**. Thus, **IaC** is main
- The kernel is shared. So, the time for construction is less. Thus, **Immutable infra** can be adopted

### High portability through **integrating env and app**
- The concept of docker container is the box including both env and app
- The image can be reused less regardless to the kernel

### Easy management
- The system consists of several apps and middlewares.
- For managing containers, docker runs each container individually
- The dependency must be concerned

#### Docker Container Ocastration System
- **Docker Compose** manages the containers easily using ```.yaml``` config file
```
version: "3"
services:
    web:
        image: gihydocker/web
        ports:
            - "3000:3000"
        environment:
            REDIS_TARGET: redis
        depends_on:
            - redis
    redis:
        image: "redis:alphine"
```

- **Docker Swarm** is the ocastration tool for Docker
- **Kubernetes** is mainly used
  
## Docker Container Deployment
| Concept | Role |
| - | - |
| Docker Image | Template integrating File Systems of the container and config of apps |
| Docker Container | Based on an image, Running status |

```
 ------------                          ------------
|            |                        |Running app |
|    Ubuntu. |     ---------------->  |            |
|  App files |     Create Container   |File System |
|            |                        |            |
 ------------                          ------------
     Image                               Container
```

### Dockerfile

#### Instructions
```
FROM image[:tag]
```
- Define a base image. 
- The image is published at Docker Hub, https://hub.docker.com
- Tag distingushes images such as version

```
RUN command1
[RUN command2]
```
- Define commands when building the image
- Several commands can be defined

```
COPY file container_path
```
- Copy the files in host to the container

```
WORKDIR working_directory
```
- Set the directory exists app

```
ENTRYPOINT [executable, args]
```
- Define the default process
- If **ENTRYPOINT** be, the arguments of **CMD** are Entrypoint's
- Can be overriden by ```docker run --entrypoint executable```

```
CMD [Running Command]
CMD ["executable", "arg1", etc] # run executable
CMD command arg1, etc # shell-script format
CMD ["arg1", etc] # with ENTRYPOINT
```
- Define the command executed when running the container
- Split command by ' ' such as ```["npm", "start"]```

```
EXPOSE port
```
- The container should listen to the port

```
LABEL key=value
```
- Define author, etc

```
ENV key=value
```
- Define environtial variables
  
```
ARG name
```
- arguments passed when building image
- Pass args by ```docker image build --build-arg key=val```

### .dockerignore
- same as ```.gitignore```

### Build Image
```
docker image build -t name[:tag] Dockerfile_path
```
- If name isn't specified, only the hash value can be used for indecating it
- If tag isn't specified, **latest** is default
- List images := ```docker image ls```
- Check iamge informations, ```docker image inspect image_name```

### Execute Container
```docker [container] run image_name [options]```

#### Options
- ```-d```: run as deamon mode, background
- ```-p outer:inner_port```: **port-forwarding**
  - The container itself is the isolated machine. So, ports are mapped in it
  - To forward requests to services, use **port-forwarding**

### Stop Container
```docker [container] stop id```

It is used like 

```docker stop $(docker container ls --filter "ancestor=image_name" -q)```
- ```-q``` outputs the ID

### Docker command
- ```docker [container] ps``` := Show container processes

### The usage of docker
Divided into the usage of images and containers

### Image

#### DEFINITION
- The template for constructing containers
- The archive consisting of file system, applications, dependencies, configurations, etc
  - ```Dockerfile``` just writes down the steps of configurations

#### Build
- The process making images

#### Commands
```
docker image help
```
```
docker image build -t repository[:tag] [options] Dockerfile_path
```
- ```-f Specific_Dockerfile_name```
- ```--pull=true|false```
  - pull base-image forcely
  - previous pulled images are stored in local
  - building speed is slower
  - If all are same, building image doesn't change **IMAGE ID**

```
docker search [options] keywords
```
- Search **docker-hub**
- ```--limit n``` : searching limit
- The namespace of official repositories are **library**
  - mysql --> library/mysql
- Sorted by the number of **STAR**s
- To search **tag**
  - Manually access the repositories
  - Use APIs in https://hub.docker.com

```
docker image pull [options] repository_name[:tag]
```
- Pull images manually. The image is used when building
- ```--platform OS/architecture```
  - Specify the current platform
  - In M1, should be mentioned ```OS/arm64```

```
docker image ls [options] [repository[:tag]]
```
- Show stored images in daemon server

```
docker image tag repository[:tag]|image_id new_repo[:tag]
```
- Tagging at the specific image
- A tag is associated with only an image
  - If latest image has same tag with the previous, 
    ```
    REPOSITORY TAG IMAGE_ID
    example/image latest some_id1
    <none> <none> some_id2
    <none> <none> some_id3
    ```
  - None is the previous tagged image
- So, the **VERSION** of images can be distingushed by **IMAGE ID**
  
```
docker image push [options] repository[:tag]
```
- Register the current stored image to the registery like **docker hub**

### Container

#### Lifecycle
- RUNNING
  - ```docker container run```
  - The services defined in COM or ENTRYPOINT are running
  - The next step of RUNNING  is STOP
- STOP
  - ```docker container stop```
  - Explicit or Implicit(the services are closed)
  - The stop statuses remain. So, it can restart
- DESTROY
  - Destroyed containers **NEVER** restart
  - The container constructed with a same image isn't same as others
    - Created time, etc are different

#### Command
```
docker container run [options] repository[:tag]|image_id [command] [args]
```
- Create and Run a container from an image. 

For Server services
- ```-d```: run as deamon mode, background
- ```-p outer:inner_port```: **port-forwarding**
  - The container itself is the isolated machine. So, ports are mapped in it
  - To forward requests to services, use **port-forwarding**

For REPL Services
- ```-i``` : connect stdin in container to in host
- ```-t``` : activate psedu-terminal in container
- ```-it``` : use both **i** and **t**
- ```--rm``` : destroy when stop the container
- ```-v``` : share the files in host

For general
- ```--entrypoint executable``` : override the **ENTRYPOINT**
- ```command args``` : override the **CMD**
  - With entrypoint, wirte arguments
  ```
  docker container run --entrypoint uname -it alpine:latest -a
  ```
- ```--name container_name```
  - Default name is random
  - Named container is usually used in development, not deployment
  - The container with same name cannot be constructed before **DESTROY** the previous

- ```docker container ls [options]```
  - Show RUNNING or STOP containers
- ```-q``` : **Extract** container id
- ```--filter "key=val"```
  - ```name=container_name```
  - ```ancestor=repository```
  - ```status=exited``` for stopped containers
- ```-a``` : include STOP containers

```
docker container stop container_(id|name)
```
- Stop Container

```
docker container restart container_(id|name)
```
- Restart stopped container

```
docker container rm container_(id|name)
```
- Destroy container
- ```-f``` : destroy running container
- When ```docker container run```, use both ```--rm``` and ```--name``` for REPL services

```
docker container logs [options] container_(id|name)
```
- Log stdouts of the container
- ```-f``` : same as ```tail -f```

```
docker container exec [options] container_(id|name) command args
```
- Execute the command on the running container
  - After forking the virtual kernel in the container, run exec
- ```-it```
  - Connect stdin(```-i```) and allocate pseudo terminal(```-t```)
  - Access the container inside like **ssh**

```
docker container cp [options] container_(id|name):container host
docker container cp [options] host container_(id|name):container
```
- Same as ```cp a b``` command
- Use for debugging
- Can be executed for stopped containers

### Commands for managing and controling the docker
```
docker (container|image|system) prune [options]
```
- Destroy all stopped containers
- Delete all untagged(**dangling**) images
- Remove all docker resources such as images, containers, volumns, etc

```
docker container stats
```
- Same as ```top``` in linux
- Check the current usages of system resouces

```
docker top container [ps options]
```
- Check the processes in the container

### API
https://docs.docker.com/engine/api/
- Docker supports RESTful API with local or remote docker deamon

## Container configuration and deployment

