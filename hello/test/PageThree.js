import React, { Component } from 'react';
import Storage from '../common/Storage'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
} from 'react-native';


export default class PageThree extends Component {
	constructor(props, context){
	    super(props,context);
	}

	render() {
		
	    return (
	        <View>
	          <Text>
	            第三页
	          </Text>
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