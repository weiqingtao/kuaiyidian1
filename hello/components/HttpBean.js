import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Alert
} from 'react-native';

function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}

export default class HttpBean extends Component {
	constructor(props, context){
	    super(props,context);
	}

	//-------------Get请求------------------------
	async sendGet(){
		//Alert.alert('get请求');
		let response = await fetch('http://192.168.1.138:3000/aa.html');
		if(response.ok){
			let text = await response.text();
			Alert.alert(text);
			//let json = JSON.stringify(text);
		}
	}

	//--------------------二进制提交表单-------------------------
	async sendBinaryPost(){
		var formData = new FormData();
		formData.append('email','aa');
		formData.append('pwd','bb');
	    let response = await fetch('http://192.168.1.138:3000/shop/login',{
	    	method:'POST',
	    	headers:{},
	    	body:formData
	    });
	    let text = await response.text();
	    alert(text);
	}

	async sendPost(){
		var fetchOptions = {
	        method: 'POST',
	        headers: {
	          'Accept': 'application/json',
	          //表单
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        body:'email=aaaaaaa&pwd=bbbbbbbbb'
	      };
	    let response = await fetch('http://192.168.1.138:3000/shop/aa',fetchOptions);
	    let text = await response.text();
	    Alert.alert(text);
	}
	render() {
	    return (
	        <View style={[Layout.top,{flexDirection:'row',justifyContent:'center',alignItems:'center'}]}>
	          <Button
				  onPress={this.sendPost}
				  title="http请求"
				  color="#841584"
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