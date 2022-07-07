# Node.js with Docker
https://nodejs.org/ko/docs/guides/nodejs-docker-webapp/
## Node vs Nodemon
- Node is recommanded 'cause Nodemon require sub-modules
- Also, the service runs on docker is complete itself. So, it doesn't changed its source code

## Base Image
- **node[:version]** image is used
  - node and npm are pre-installed

## Dockerfile
- ```WORKDIR``` is used for **npm**. Not use ```CD work_dir```

- ```Expose``` is used for setting **PORT**

## docker run options
```-p public:hidden```
- Map outer port and port in container
- Service uses the hidden port
  
```-d```
- Run container detached mode, background

## Test
```curl -i [scheme://]host[:port][/location][?query][#fragments]```
- To test ```GET```, use **curl**
```curl -i localhost:public_port```