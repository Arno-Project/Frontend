FROM node:alpine as react_build
ENV BASE_HOST 0.0.0.0
WORKDIR /app/

# NOTE put this dockerfile and default.conf in build dir
COPY . .

FROM nginx:1.23.1-alpine

COPY --from=react_build /app /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d

# fire up nginx
EXPOSE 80
CMD ["nginx","-g","daemon off;"]