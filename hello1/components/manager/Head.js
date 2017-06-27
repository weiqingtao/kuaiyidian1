import React, { Component } from 'react';
import Login from '../users/Login'
import Storage from '../../common/Storage'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
} from 'react-native';


export default class Head extends Component {
	constructor(props, context){
	    super(props,context);
	}

	async logout(){
		let response = await fetch('http://192.168.1.157:3000/shop/logout');
		if(response.ok){
			let text = await response.text();
			if(text==1){
				Storage.getInstance().getProp('index').setState({body:<Login/>});
			}
		}
	}

	render() {
		//const navigate = Storage.getInstance().getProp('navigate');
		let shoprole = this.props.shoprole;
		let roleName='服务员';
		if(shoprole==0){
			roleName='管理员';
		}else if(shoprole==2){
			roleName='后厨';
		}
	    return (
	        <View style={[Layout.top,{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}]}>
	          <Text style={{flexGrow:1,textAlign:'center',backgroundColor:'#fff'}}>{this.props.shopname}{roleName}</Text>
	          <Button
	            onPress={()=>{this.logout()}}
	            color='green'
	            title="注销"
	            style={{flexGrow:1}}
	          />
	          
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