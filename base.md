### 2026-4-12 uniapp 旅游项目入门到熟悉

#### 本地创建项目并关联github
 -1. 本地新建uniapp 项目
 -2. GitHub创建一个新的仓库
 -3. 进入本地新建的uniapp的项目
 -4. 执行命令：
	-1. git init
	-2. git add .
	-3. git commit -m "init"
	-4. git remote add origin https://github.com/用户名/仓库名.git
	-5. git branch -M main
	-6. git push -u origin main
	-7. 如果出现问题：fatal: unable to access 'https://github.com/Alice-Girl/travelWorkSpace.git/': Failed to connect to 127.0.0.1 port 7890 after 6 ms: Couldn't connect to server
	-8. 修复问题
		-a. git config --global --unset http.proxy
		-b. git config --global --unset https.proxy

####
