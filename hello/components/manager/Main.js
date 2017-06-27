import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,     //获取屏幕高宽
  Text,
  View,
  Alert
} from 'react-native';

let screenHeight=Dimensions.get('window').height;

export default class Main extends Component {
	render() {
	    return (
	    	<View style={[Layout.body]}>
			<Text>
	          To get started, edit index.android.js
	        </Text>
	        <Text>
	        	hello,{this.props.name}
	        </Text>
	        </View>
	    )
	}
}

const Layout = StyleSheet.create({
   body:{
	    height:screenHeight-100,
	    backgroundColor:'yellow'
	  }
})