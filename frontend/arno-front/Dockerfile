# pull official base image
FROM node:alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
# RUN npm install react-scripts

# add app
COPY . ./

# start app
CMD ["npm", "start"]
