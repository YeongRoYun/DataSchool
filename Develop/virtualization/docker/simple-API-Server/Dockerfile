FROM node:latest
RUN mkdir /usr/local/server
COPY server /usr/local/server
WORKDIR /usr/local/server
RUN npm install
LABEL auther="yyr"
EXPOSE 3000
# CMD ["npm", "start"]
ENTRYPOINT [ "npm" ]
CMD [ "start" ]
ENV key=value
ARG name