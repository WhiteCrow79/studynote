## workflow

> working directory(unchecked or tracked) > staging area > .git directory

## command

### 설정
```ubuntu
git config --list
git config --global -e
git config --global core.editor "code --wait"

git config --global user.name "whitecrow"
git config --global user.email "love012xx@gmail.com"

git config --global core.autocrlf input

git config --global alias.st status 
```

### gitignore
```ubuntu
echo *.log > .gitignore
```

### working dirctory
```ubuntu
git add a.txt
git add .

git rm --cached a.txt
git rm --cached *
```

### status
```ubuntu
git status
git status -s

git diff
git diff --staged
git diff --cached
```

### commit
```ubutu
git commit -m 'first commit'
git commit -am 'second commit'
```

### branch
> 기본은 master<br>브랜치 생성(최초 한 번 commit이 되야 함 )

```ubuntu
git branch
git branch exp
git checkout exp
git checkout -b exp

git log --branches --decorate --graph --oneline
git log master..exp
git log -p exp..master
git diff master..exp
git diff exp..master
```

### merge
> 병합 : exp작업내용 master로

```ubuntu
git checkout master
git merge exp
```

> 병합 : master를 exp로 병합 후 exp 삭제

```ubuntu
git checkout exp
git merge master

git checkout master
git branch -d exp
git branch -D exp
```

> HEAD파일에 현재 branch정보를 가지고 있음(HEAD > refs/heads/master)<br>
refs/heads/exp 디렉토리 삭제 시 branch 삭제와 같음(file일뿐)

### conflict
자동 병합: common.txt<br>
충돌 (내용): common.txt에 병합 충돌<br>
자동 병합이 실패했습니다. 충돌을 바로잡고 결과물을 커밋하십시오.

```ubuntu
funciton b
function a
<<<<<<< HEAD
function c
=======
funciton d
>>>>>>> exp
```

### reset
```ubuntu
git reset --hard bb4cbb309b6bebc0d148f82e9d0539abcecf1766
```

### reset cancel(되돌리기)
> ORIG_HEAD에 저장 후 위험한 명령어 실행(reset) 정보가 있다
```ubuntu
git reset --hard ORIG_HEAD
```

### reflog(모든기록) 
```ubuntu
git reflog
```

### ditached
```ubuntu
git checkout bb4cbb309b6bebc0d148f82e9d0539abcecf1766

git checkout master
```