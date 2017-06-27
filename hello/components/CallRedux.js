import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';

import { createStore } from 'redux'
import todoApp from '../redux/reducers/UserReducer'
let store = createStore(todoApp)

export default class Head extends Component {
  constructor(props, context){
      super(props,context);
      this.state={};
      this.state.show=<Text>show</Text>;
      store.subscribe(() =>{
        this.recall();
      })
  }
  login(){
    store.dispatch({ type: 'todos', text:'hello' });
  }
  recall(){
    this.setState({show:store.getState()['todos']['bb']});
  }
  render() {
      return (
          <View style={[Layout.top,{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}]}>
            <Text onPress={()=>{this.login()}}>
              登陆
            </Text>
            {this.state.show}
          </View>
          )
    }
}

const Layout = StyleSheet.create({
  top:{
    height:30,
    backgroundColor:'orange'
  }
})