## docker

### image pull
```ubuntu
docker pull httpd
```

### 컨테이너 생성
```ubuntu
docker run --name ws2 httpd
```

### 컨테이너 스톱
```ubuntu
docker stop ws2
```

### 컨테이너 시작
```ubuntu
docker start ws2
```

### 컨테이너 로그
```ubutu
docker logs -f ws2
```

### 컨테이너 삭제
```ubutu
docker rm ws2
```