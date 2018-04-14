import React, { Component } from 'react';
import * as firebase from 'firebase';

import withAuthorization from '../Session/withAuthorization';


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

    return (
      <div>
        <h1>Home</h1>
        <p>Region1 TREE1 Node1</p>

        Latest Time: {this.state.latest.TIME}
        <br/>
        Latest Temp: {this.state.latest.TEMP}

      </div>
    );
  }
}



const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);