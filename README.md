React入门学习实战
======
第一章 nodejs 安装,npm 环境搭建。
------
* 官网下载 nodejs http://nodejs.cn/
* 修改 mpm 镜像和本地安装路径
* 打开cmd，输入npm config set registry https://registry.npm.taobao.org
* 在nodejs 安装目录下新建 node_global node_cache 文件夹
* 新增环境变量  添加 NODE_PATH  nodejs安装目录
* 在path 中添加 %NODE_PATH%\;%NODE_PATH%\node_modules;%NODE_PATH%\node_global
* 启动cmd，输入npm config set prefix "C:\Program Files\nodejs\node_global" 以及 npm config set cache "C:\Program Files\nodejs\node_cache"

cmd 输入 npm i create-react-app -g
cmd 输入 npm i yarn -g
cmd 输入 npm i webpack -g
cmd 输入 npm i express -g
cmd 输入 npm i dva-cli -g
cmd 输入 npm i json-server -g
cmd 输入npm i roadhog -g
