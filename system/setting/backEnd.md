# nginx + node backend 구성
synology docker의 ubuntu를 기본으로 하여 sudo 명령어는 쓰지 않았지만 기록은 넣어 둔다.

### nginx 설치

```ubuntu
sudo apt-get install nginx
```

### Cerbot설치
> Let's Encrypt 인증서 발급을 위함.<br>cron.d에 자동 등록(90일마다 자동 갱신)

```ubuntu
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo certbot --nginx -d whitecrow79.synology.me

/etc/letsencrypt/live/whitecrow79.synology.me

sudo certbot renew --dry-run
```

### nginx기본설정

> nginx.conf

```ubuntu
user www-data;
worker_processes 1;
pid /run/nginx.pid;

events { 
  worker_connections 1024;
}

http {

  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 65;
  types_hash_max_size 2048;

  include /etc/nginx/mine.types;
  default_type application/octet_stream;

  #SSL Setting
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE                                                                              
  ssl_prefer_server_ciphers on;

  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  #Gzip Settings

  gzip on;

  include /etc/nginx/conf.d/*.conf;
  include /etc/nginx/sites-enabled/*;

}
```

### reverse proxy 설정

> /sites-available/default

```ubuntu

server {                                                                        
  listen 443;                                                             
  listen [::]:443;                                                        
                                                                          
  ssl on;                                                                 
  ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;                              
  server_name www.whitecrow79.synology.me;                                
                                                                          
  ssl_certificate /etc/letsencrypt/live/whitecrow79.synology.me/fullchain.pem;                                                                            
  ssl_certificate_key /etc/letsencrypt/live/whitecrow79.synology.me/privkey.pem;                                                                          
                                                                          
  location / {                                                            
    proxy_pass http://whitecrow79.synology.me:4557;                 
  }                                                                       
                                                                                
}

```

### node 설정

> 더 이상의 설명은 생략한다.

### ssh
```ubuntu
ssh whitecrownode@whitecrow79.synology.me -p4522
```

### scp

```ubuntu
scp -P 4522 whitecrownode@whitecrow79.synology.me:/home/whitecrownode/node-back/app/.env /Users/whitecrow/dev/node-back/app
```
