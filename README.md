# react
React入门学习实战
===
第四章 用户管理
---
- 新增/pages/user/UserList.js 文件
- 创建组件并导出组件

````
import React from 'react';

class UserList extends React.Component {

  render () {
    return (
      ...
    );
  }
}

export default UserList;
````
- 当页面加载的时候需要调用接口来获取用户列表，并把获取到的用户列表数据存放到组件的state中（this.state.userList）
````
class UserList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userList: []
    };
  }

  componentWillMount () {
    fetch('http://localhost:3000/user')
      .then(res => res.json())
      .then(res => {
        this.setState({
          userList: res
        });
      });
  }

  render () { ... }
}
````
#### <a href ="https://segmentfault.com/a/1190000004168886">React：组件的生命周期 </a>
- 当组件在客户端被实例化，第一次被创建时，以下方法依次被调用：
1. getDefaultProps
2. getInitialState
3. componentWillMount
4. render
5. componentDidMount
- 当组件在服务端被实例化，首次被创建时，以下方法依次被调用：
1. getDefaultProps
2. getInitialState
3. componentWillMount
4. render
componentDidMount  不会在服务端被渲染的过程中调用。

- 在render方法中，使用数组的map方法将用户数据渲染为一个表格：
````
render () {
    const {userList} = this.state;

    return (
      <div>
        <header>
          <h1>用户列表</h1>
        </header>

        <main>
          <table>
            <thead>
              <tr>
                <th>用户ID</th>
                <th>用户名</th>
                <th>性别</th>
                <th>年龄</th>
              </tr>
            </thead>

            <tbody>
              {
                userList.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.gender}</td>
                      <td>{user.age}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </main>
      </div>
    );
  }
````
- 在/src/index.js文件中添加指向这个页面的路由，并在/src/pages/Home.js中加入相应的链接：
````
import UserListPage from './pages/user/UserList';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={HomePage}/>
    <Route path="/user/add" component={UserAddPage}/>
    <Route path="/user" component={UserListPage}/>
  </Router>
), document.getElementById('app'));
````

````
class Home extends React.Component {
  render () {
    return (
      <div>
        <header>
          <h1>Welcome</h1>
        </header>

        <main>
          <Link to="/user">用户列表</Link>
          <br/>
          <Link to="/user/add">添加用户</Link>
        </main>
      </div>
    );
  }
}
````
- 在pages/user/UserList.js中添加用户编辑 和删除处理
````
handleEdit(user){
        console.log(this);
        this.props.history.push("/user/add/"+user.id);
    }

    handleDel (user) {
        const confirmed = confirm(`确定要删除用户 ${user.name} 吗？`);

        if (confirmed) {
            fetch('http://localhost:3000/user/' + user.id, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        userList: this.state.userList.filter(item => item.id !== user.id)
                    });
                    alert('删除用户成功');
                })
                .catch(err => {
                    console.error(err);
                    alert('删除用户失败');
                });
        }
    }
````
- 修改 /pages/user/UserAdd.js 提交后处理，判断新增/删除类型
````
 handleSubmit(e) {
        // 阻止表单submit事件自动跳转页面的动作
        e.preventDefault();
        console.log(this);
        const {name, age, gender,id} = this.state;
        let apiUrl = 'http://localhost:3000/user';
        let method = 'post';
        if(id){
            apiUrl += '/' + id;
            method = 'put';
        }
        fetch(apiUrl, {
            method: method,
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
                        gender: '',
                        id:null
                    });
                    this.props.history.push("/user");
                } else {
                    alert('添加失败');
                }
            })
            .catch((err) => console.error(err));
    }
````
- 修改 index.js 添加路由过滤 
````
ReactDOM.render((
    <Router basename="/">
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/user" component={UserList}/>
            <Route exact path="/user/add"  component={UserAddPage}/>
            <Route exact path="/user/add/:id"  component={UserAddPage}/>
        </Switch>
    </Router>
), document.getElementById('app'));
````