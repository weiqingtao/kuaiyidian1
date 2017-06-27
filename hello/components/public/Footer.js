
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Alert
} from 'react-native';

import Head from './Head'

const onButtonPress = (helloFun) => {
  //Alert.alert(thisa);
  helloFun('我是footer');
};

let screenHeight=Dimensions.get('window').height;


export default class Footer extends Component {
  constructor(props, context){
    super(props,context);
    //this.state={};
  }

  myfun(){
    Alert.alert("hello");
  }

  changeBody(fun){
    let head = <Head/>;
    fun(head);
  }

  render() {
    let self=this;
    return (   
        <View style={[Layout.bottom,{justifyContent:'space-around',alignItems:'center'}]}>
          <Button
            onPress={()=>{onButtonPress(this.props.helloFun)}}
            color='green'
            title="菜单"
          />
          <Button
            onPress={()=>{this.changeBody(this.props.changeBody)}}
            color='blue'
            title="换body"
          />
          <Text>
            菜单
          </Text>
        </View>
    );
  }
}

const Layout = StyleSheet.create({
  bottom:{
    height:45,
    backgroundColor:'green',
    flexDirection:'row',
  }
})

