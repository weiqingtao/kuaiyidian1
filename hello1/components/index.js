import React, { Component } from 'react'
import Storage from '../common/Storage'
import Login from './users/Login'

import {
  // StyleSheet,
  // Dimensions,
  View
} from 'react-native';


// let screenHeight=Dimensions.get('window').height;

export default class Index extends Component {
  constructor(props, context){
    super(props,context);
    this.state={};
    Storage.getInstance().setProp('index',this);
    this.state.body=<Login/>;
  }
  
  render() {
   
    return (
      <View>
        {this.state.body}
      </View>
    );
  }
}

// const Layout = StyleSheet.create({
//   outer:{
//     height:screenHeight-25,
//     flexDirection:'column',
//     justifyContent:'space-between'
//   }
// })