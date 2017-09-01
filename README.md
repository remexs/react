# react
React入门学习实战
====
第三章 新增用户
----
- 首先在/src目录下新增一个pages目录，用于存放渲染页面的组件。
- 然后在/src/pages中新增一个Home.js文件。
在这个文件中写入一个基本的React组件：
````
import {Component} from 'react';

class Home extends Component {
  render () {
    return (
      <div>Home page.</div>
    );
  }
}

export default Home;
````
### 配置路由
- 修改/src/index.js为：

````
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './pages/Home';
ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path="/" component={HomePage}/>
        </Switch>
    </Router>
), document.getElementById('app'));
````
-  <a href="http://reacttraining.cn/web/guides/quick-start">react-router4.x API</a> 
- 然后在/src/pages中新增一个/user/UserAdd.js用户编辑文件.
在这个文件中写入一个UserAdd的React组件：
````
import {Component} from 'react';

class UserAdd extends Component {
    render() {
        return (
            <div>
                <header>
                    <h1>添加用户</h1>
                </header>

                <main>
                    <form>
                        <label>用户名：</label>
                        <input type="text"/>
                        <br/>
                        <label>年龄：</label>
                        <input type="number"/>
                        <br/>
                        <label>性别：</label>
                        <select>
                            <option value="">请选择</option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                        <br/>
                        <br/>
                        <input type="submit" value="提交"/>
                    </form>
                </main>
            </div>
        );
    }
};
export default UserAdd;
````
- 然后在index.js 中添加路由
````
...
import UserAddPage from './pages/user/UserAdd';
...
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={HomePage}/>
    <Route path="/user/add" component={UserAddPage}/>
  </Router>
), document.getElementById('app'));
````
- 修改 /pages/Home.js 添加导航链接到用户编辑页面。
````
import {Component} from 'react';
import { Link } from 'react-router-dom';
class Home extends Component {
    render() {
        return (
            <Link to="/user/add">添加用户</Link>
        );
    }
};
export default Home;
````
### 获取表单的值 并向服务插入数据

- 在 /pages/user/UserAdd.js 中添加构造函数 使用 state 维护表单值

````
class UserAdd extends React.Component {
    constructor () {
        super();
        this.state = {
          name: '',
          age: 0,
          gender: ''
        };
        this.handleSubmit.bind(this);//表单提交时this为空，这里使用绑定this。
    }
}
````
- 并添加表单提交处理函数
````
    handleValueChange (field, value, type = 'string') {
        // 由于表单的值都是字符串，我们可以根据传入type为number来手动转换value的类型为number类型
        if (type === 'number') {
            value = +value;
        }

        this.setState({
            [field]: value
        });
    }
````
- 修改render函数绑定事件
````
     render () {
        const {name, age, gender} = this.state;
        return (
            <div>
                <header>
                    <h1>添加用户</h1>
                </header>
    
                <main>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <label>用户名：</label>
                        <input type="text" value={name} onChange={(e) => this.handleValueChange('name', e.target.value)}/>
                        <br/>
                        <label>年龄：</label>
                        <input type="number" value={age || ''} onChange={(e) => this.handleValueChange('age', e.target.value, 'number')}/>
                        <br/>
                        <label>性别：</label>
                        <select value={gender} onChange={(e) => this.handleValueChange('gender', e.target.value)}>
                            <option value="">请选择</option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                        <br/>
                        <br/>
                        <input type="submit" value="提交"/>
                    </form>
                </main>
            </div>
        );
     }
````
- 修改 表单提交处理函数 向服务器插入数据
````
 handleSubmit(e) {
        // 阻止表单submit事件自动跳转页面的动作
        e.preventDefault();
        console.log(this);
        const {name, age, gender} = this.state;
        fetch('http://localhost:3000/user', {
            method: 'post',
            // 使用fetch提交的json数据需要使用JSON.stringify转换为字符串
            body: JSON.stringify({
                name,
                age,
                gender
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                // 当添加成功时，返回的json对象中应包含一个有效的id字段
                // 所以可以使用res.id来判断添加是否成功
                if (res.id) {
                    alert('添加用户成功');
                    this.setState({
                        name: '',
                        age: 0,
                        gender: ''
                    });
                } else {
                    alert('添加失败');
                }
            })
            .catch((err) => console.error(err));
    }
````

