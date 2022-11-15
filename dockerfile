FROM node
WORKDIR /app
COPY . .
RUN yarn
RUN yarn tsc
EXPOSE 3000
CMD ["yarn", "start"]