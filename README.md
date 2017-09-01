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
<pre> <code>
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
<code></pre>
- 最后在/server目录执行json-server db.json -w -p 3000

现在打开浏览器，访问网址http://localhost:3000


### 搭建客户端
- 在根目录执行npm i roadhog -g来安装roadhog，这是一个快速且功能强大的react项目搭建工具
- 新建/src目录，用于存放客户端代码
- 新建/public目录，用户存放项目的静态文件（图片等）
- 新建/src/index.js和/public/index.html两个文件，分别作为应用的入口文件和页面的入口文件
- 执行npm i react react-dom react-router react-router-dom -S，安装基本的react依赖
- 在/src/index.js中写入以下代码
