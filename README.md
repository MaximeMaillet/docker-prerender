# Docker prerender

[Prerender](https://prerender.io/) in Docker

## Usage

For use docker-prerender you should configure your HTTP server for redirect request from bot.

### Docker or docker-compose

```
docker run -d -p 8080:8080 deuxmax/docker-prerender:latest
```

```
# docker-compose.yml
version: '2'

services:
    app:
        image: ${APP_IMAGE}
        restart: always
        links:
            - prerender
    
    prerender:
        image: deuxmax/docker-prerender:latest
        restart: always
```

### Nginx

Replace `${URL_PUPPETEER}` by your docker url

```
location / {
    try_files $uri @prerender;
}

location @prerender {
    set $prerender 0;
    if ($http_user_agent ~* "googlebot|bingbot|yandex|baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkShare|W3C_Validator|whatsapp") {
        set $prerender 1;
    }
    if ($args ~ "_escaped_fragment_") {
        set $prerender 1;
    }
    if ($http_user_agent ~ "Prerender") {
        set $prerender 0;
    }
    if ($uri ~* "\.(js|css|xml|less|png|jpg|jpeg|gif|pdf|doc|txt|ico|rss|zip|mp3|rar|exe|wmv|doc|avi|ppt|mpg|mpeg|tif|wav|mov|psd|ai|xls|mp4|m4a|swf|dat|dmg|iso|flv|m4v|torrent|ttf|woff|svg|eot)") {
        set $prerender 0;
    }

    resolver 127.0.0.11;

    if ($prerender = 1) {
        proxy_pass http://${URL_PUPPETEER}:8080/render?url=$scheme://$host$request_uri;
    }
    if ($prerender = 0) {
        rewrite .* /index.html break;
    }
}
```

*From : [https://gist.github.com/thoop/8165802](https://gist.github.com/thoop/8165802)*

## Install from source

Clone source :

```bash
git clone git@gitlab.eoko-lab.fr:eoko/docker-prerender.git
```

Install packages :

```bash
nvm install
npm install
```
