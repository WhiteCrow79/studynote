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

### jenkins + git