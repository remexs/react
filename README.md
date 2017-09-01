# react
React入门学习实战
====
第二章 客户端及服务器搭建
----

### 搭建服务器

- 首先执行npm i json-server -g把json-server作为全局工具安装
- 新建一个项目目录（后面文中所有的路径根目录都表示该项目目录）
- 在根目录中执行npm init初始化一个npm项目（会有一些项目配置需要你输入，一直敲回车就行了）
- 新建/server目录用于放置服务端的文件
- 新建/server/db.json文件作为服务端的数据库文件
- 在/server/db.json文件中写入以下数据：
```
{
 "user": [
   {
     "id": 10000,
     "name": "一韬",
     "age": 25,
     "gender": "male"
   },
   {
     "id": 10001,
     "name": "张三",
     "age": 30,
     "gender": "female"
   }
 ],
 "book": [
   {
     "id": 10000,
     "name": "JavaScript从入门到精通",
     "price": 9990,
     "owner_id": 10000
   },
   {
     "id": 10001,
     "name": "Java从入门到放弃",
     "price": 1990,
     "owner_id": 10001
   }
 ]
}
```
- 最后在/server目录执行json-server db.json -w -p 3000

现在打开浏览器，访问网址http://localhost:3000

### 搭建客户端
- 在根目录执行npm i roadhog -g来安装roadhog，这是一个快速且功能强大的react项目搭建工具
- 新建/src目录，用于存放客户端代码
- 新建/public目录，用户存放项目的静态文件（图片等）
- 新建/src/index.js和/public/index.html两个文件，分别作为应用的入口文件和页面的入口文件
- 执行npm i react react-dom react-router react-router-dom -S，安装基本的react依赖(安装后将在package.json中写入相关依赖)
- 在/src/index.js中写入以下代码
```
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render((
  <div>Hello React!</div>
), document.getElementById('app'));

```

- 在/public/index.html里写入以下代码

```
<!doctype html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Hello React</title>
</head>
<body>
  <!-- 这个div必须和index.js里的render方法里传入的第二个参数保持一致 -->
  <div id="app"></div>
  <!-- roadhog背后会把你的代码从入口文件开始打包成一个index.js文件 -->
  <script src="./index.js"></script>
</body>
</html>
```

上面都搞定之后就可以执行roadhog server来启动我们的React应用了！<br>
启动成功会自动打开http://localhost:8000，如果你看到页面里显示了”Hello react!”

为了节约时间我们可以把这两个指令写入package.json的scripts中

```
"scripts": {
  "server": "cd server && json-server db.json -w -p 3000",
  "dev": "roadhog server"
}
```
然后，就可以执行：

npm run server<br>
npm run dev