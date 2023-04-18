# Dockerfile
FROM nginx

COPY ./src/index.html /usr/share/nginx/html/
CMD ["nginx-debug", "-g", "daemon off;"]