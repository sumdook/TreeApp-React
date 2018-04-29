import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash';
import withAuthorization from '../Session/withAuthorization';
import { auth } from '../../firebase';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

import { Layout, Menu, Icon, Tabs, Spin, Card , Row, Col} from 'antd';
const TabPane = Tabs.TabPane;

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

ReactChartkick.addAdapter(Chart);

class HomePage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    collapsed: false,
    data: {}
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  componentDidMount() {
    this.database = firebase.database().ref('/REDWOODPINEMONITORING_try/REGION1/TREE1/');

    this.database.on('value',snap =>{
      this.setState({
        data: snap.val()
      });
    })
  }

  fetchData = (data) => {
    this.setState({data: {} });
    this.database = firebase.database().ref('/REDWOODPINEMONITORING_try/'+data);
    this.database.on('value',snap =>{
      this.setState({
        data: snap.val()
      });
    })
  }
  renderNode1 = () => {
    if(!_.isEmpty(this.state.data)){
      return Object.keys(this.state.data).map( (key, value) =>{
        console.log(this.state.data[key]);
        const graphData = [
                  {"name":"Humidity", "data": {}},
                  {"name":"Temperature", "data": {}}
        ];
        for(const i in this.state.data[key])
          {
            if(i=='latest')continue;
            const date = new Date(this.state.data[key][i].TIME*1000).toLocaleString();
            const humidity = this.state.data[key][i].HUMIDITY;
            const temperature = this.state.data[key][i].TEMP;

            graphData[0].data[date] = humidity;
            graphData[1].data[date] = temperature;
            console.log(graphData);

          }
        
        return (
            <TabPane tab={key.toString()} key={value+1}>
            <Row>
            <Col>
              <Card title="Latest Updates"style={{ width: 300, margin: "20px 50px" }}>
                <p>Humidity: {this.state.data[key].latest.HUMIDITY}</p>
                <p>Temperature: {this.state.data[key].latest.TEMPERATURE}</p>
                <p>Time: {new Date(this.state.data[key].latest.TIME*1000).toLocaleString()} </p>
              </Card>
            </Col>
            <Col>
               <Card title="Graph"style={{width: '70%', margin: "20px 50px"}}>
                <LineChart data={ graphData} />
              </Card>
            </Col>
            </Row>



            </TabPane>
          );
      });
    }else{
      return(
        <div style={{textAlign:'center',width:'100%'}}>
          <Spin size="large" style={{margin:'auto', padding:'200px'}} />
        </div>
          );
    }
  }
  render() {

    return (
      <div style={{height:'100%'}}>
        <Layout style={{ minHeight: '93vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={<span><Icon type="appstore-o" /><span>Region 1</span></span>}
            >
              <Menu.Item key="1"><span onClick={() => {this.fetchData("/REGION1/TREE1")}}>Tree 1</span></Menu.Item>
              <Menu.Item key="2"><span onClick={() => {this.fetchData("/REGION1/TREE2")}}>Tree 2</span></Menu.Item>
              <Menu.Item key="3"><span onClick={() => {this.fetchData("/REGION1/TREE3")}}>Tree 3</span></Menu.Item>
              <Menu.Item key="4"><span onClick={() => {this.fetchData("/REGION1/TREE4")}}>Tree 4</span></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="appstore-o" /><span>Region 2</span></span>}
            >
              <Menu.Item key="5"><span onClick={() => {this.fetchData("/REGION2/TREE1")}}>Tree 1</span></Menu.Item>
              <Menu.Item key="6"><span onClick={() => {this.fetchData("/REGION2/TREE2")}}>Tree 2</span></Menu.Item>
              <Menu.Item key="7"><span onClick={() => {this.fetchData("/REGION2/TREE3")}}>Tree 3</span></Menu.Item>
              <Menu.Item key="8"><span onClick={() => {this.fetchData("/REGION2/TREE4")}}>Tree 4</span></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span><Icon type="appstore-o" /><span>Region 3</span></span>}
            >
              <Menu.Item key="9"><span onClick={() => {this.fetchData("/REGION3/TREE1")}}>Tree 1</span></Menu.Item>
              <Menu.Item key="10"><span onClick={() => {this.fetchData("/REGION3/TREE2")}}>Tree 2</span></Menu.Item>
              <Menu.Item key="11"><span onClick={() => {this.fetchData("/REGION3/TREE3")}}>Tree 3</span></Menu.Item>
              <Menu.Item key="12"><span onClick={() => {this.fetchData("/REGION3/TREE4")}}>Tree 4</span></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={<span><Icon type="appstore-o" /><span>Region 4</span></span>}
            >
              <Menu.Item key="13"><span onClick={() => {this.fetchData("/REGION4/TREE1")}}>Tree 1</span></Menu.Item>
              <Menu.Item key="14"><span onClick={() => {this.fetchData("/REGION4/TREE2")}}>Tree 2</span></Menu.Item>
              <Menu.Item key="15"><span onClick={() => {this.fetchData("/REGION4/TREE3")}}>Tree 3</span></Menu.Item>
              <Menu.Item key="16"><span onClick={() => {this.fetchData("/REGION4/TREE4")}}>Tree 4</span></Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="logout" />
              <span onClick={auth.doSignOut} >Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: '26px 0 0 0', minHeight: 200 }}>
          <Tabs defaultActiveKey="1">
            {this.renderNode1()}
          </Tabs>
        </Content>
        </Layout>
      </Layout>
      </div>





    );
  }
}



const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);