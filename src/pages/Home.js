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