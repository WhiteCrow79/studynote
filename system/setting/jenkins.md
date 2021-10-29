# jenkins 설정
node로 구성한 backEnd 소스를 git으로 관리하고 jenkins를 이용하여 CI/CD 환경을 구축한다.

### jdk설치

```ubuntu
sudo apt-get install openjdk-8-jdk 
```

### jenkins설치

```ubuntu
sudo apt-get install wget
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
```

### jenkins port 변경

```ubuntu
vi /etc/default/jenkins
```

### 초기 비밀번호 확인

```ubuntu
cat /var/lib/jenkins/secrets/initialAdminPassword
```

### jenkis 기본 설정
 1. git Intergration plugin 설치
 2. 새로운 item생성 : node-backend
 3. 소스 코드 관리 탭 : git repository URL 등록 및 설정
 4. 빌드 유발 탭 : GitHub hook trigger for GITScm polling
 5. 빌드 환경 탭 : node-backend
 6. Build 탭 : Execute managed script : node-build(plugin 설치 후 작성)

### Add git Webhook
jenkins에 신호?를 준다.(신호를 받으면 script 실행)
>github 로그인 후 repository 선택
 1. Settings : Add Webhook
 2. Payload URL : http://whitecrow79.synology.me:9090/github-webhook/
 3. Just the push event 선택

### jenkins node ssh 접속
id/pw 없이 키로 node서버 접속

>jenkins : ssh key 생성
```ubuntu
sudo su - jenkins
ssh-keygen -t rsa
cat ~/.ssh/id_rsa.pub
```

>node : ssh key 설정(ssh가 구성되어 있어야 함)
```ubuntu
sudo su - whitecrownode
vi ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/*
```

>jenkins : ssh hostname 설정<br>~/.ssh/config
```ubuntu
Host server-node
HostName whitecrow79.synology.me
User whitecrownode
port 4522
```
### shell script 생성
 1. Managed Scripts plugin 설치
 2. jenkins관리 > Managed files > Add a new config > Managed script file
 3. script작성
```ubuntu
#!/bin/sh
echo "node-build start"
ssh server-node <<EOF                                                                                  
        cd ~/node-back/app                                                                             
        git pull origin master                                                                         
        npm install                                                                                    
        npm start                                                                                      
        exit                                                                                           
EOF
```

### 기타
>synology docker ubuntu의 rc 자동실행 설정이 되질 않아 다른 방법으로 해결<br>ex)update-rc start.sh defaults >> /root/.bashrc
 