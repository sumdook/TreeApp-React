import React, { Component } from 'react';
import * as firebase from 'firebase';

import withAuthorization from '../Session/withAuthorization';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.database = firebase.database().ref('/REDWOODPINEMONITORING_try/REGION1/TREE1/NODE1').child('latest');
    this.state = {
      latest: {}
    };
  }

  componentDidMount() {
    this.database.on('value',snap =>{
      console.log(snap.val());
      this.setState({
        latest: snap.val()
      });
    })

    console.log(this.state.latest);
  }

  render() {

    return (/*
      <div>
        <h1>Home</h1>
        <p>Region1 TREE1 Node1</p>

        Latest Time: {this.state.latest.TIME}
        <br/>
        Latest Temp: {this.state.latest.TEMP}

      </div>
      */
      <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      </Layout>





    );
  }
}



const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);