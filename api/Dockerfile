FROM node:latest
RUN npm install -g fauna-shell
COPY ./schema.fql /home
COPY .fauna-shell /root
ENTRYPOINT ["tail", "-f", "/dev/null"]
