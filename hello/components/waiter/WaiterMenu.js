import React, { Component } from 'react';
import {getHttp} from '../../common/HttpBean'
import {
  StyleSheet,
  Dimensions,     //获取屏幕高宽
  Text,
  View,
  Alert
} from 'react-native';

let screenHeight=Dimensions.get('window').height;

export default class Main extends Component {
	constructor(props, context){
	    super(props,context);
	    this.getMenu();
	}
	async getMenu(){
		let response = await getHttp('shop/getMenu');
		let jsonRs = await response.json();
		alert(jsonRs[0][0].typename);
	}
	render() {
	    return (
	    	<View style={[Layout.body]}>
			<Text>菜单</Text>
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