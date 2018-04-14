import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './index.css'

import AuthUserContext from '../Session/AuthUserContext';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  /*<ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>
  */
<Layout>
    <Header className="header">
      <Link to={routes.LANDING}><div className="logo" /></Link>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to={routes.HOME}>Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to={routes.ACCOUNT}>Account</Link></Menu.Item>
      </Menu>
    </Header>
  </Layout>




const NavigationNonAuth = () =>
  <Layout>
    <Header className="header">
      <Link to={routes.LANDING}><div className="logo" /></Link>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to={routes.LANDING}>Explore</Link></Menu.Item>
        <Menu.Item key="2"><Link to={routes.SIGN_IN}>Sign In</Link></Menu.Item>
      </Menu>
    </Header>
  </Layout>


export default Navigation;
