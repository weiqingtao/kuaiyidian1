import React, { Component } from 'react';
import Storage from '../../common/Storage'
import ManagerIndex from '../manager/ManagerIndex'
import WaiterIndex from '../waiter/WaiterIndex'
import {postHttp} from '../../common/HttpBean'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  TextInput,
} from 'react-native';

export default class Login extends Component {
	constructor(props, context){
	    super(props,context);
	}
	
	async login(){
		let formBody = 'email='+this.state.email+'&pwd='+this.state.pwd;
	    let text = await postHttp('shop/mobileLogin',formBody);
	    let arr = text.split(',');
	    if(arr[0]==1){	//登陆成功跳转
	    	let index = Storage.getInstance().getProp('index');
	    	if(arr[2]==0){
	    		index.setState({body:<ManagerIndex shopname={arr[1]} shoprole={arr[2]}/>});
	    	}else if(arr[2]==1){  //服务员
	    		index.setState({body:<WaiterIndex shopname={arr[1]} shoprole={arr[2]}/>});
	    	}else if(arr[2]==2){
	    		//后厨
	    	}
			
	    }else{
	    	alert('账号/密码错误');
	    }
		
	}
	
	render() {
	    return (
	    	<View style={{flexDirection:'row'}}>
	    		<View style={{flexGrow:1}}></View>

		    	<View style={[Layout.top,{marginTop:90,flexDirection:'column',justifyContent:'center',flexGrow:3}]}>
		          	<View style={[Layout.row]}>
		          		<View style={[Layout.col1]}><Text>账号:</Text></View>
		          		<View style={[Layout.col2]}>
		          			<TextInput  style={[Layout.input]} placeholder='请输入账号'
		          				onChangeText={(email) => this.setState({email})}
		          			/>
		          		</View>
		          	</View>
		          	<View style={[Layout.row]}>
		          		<View style={[Layout.col1]}><Text>密码:</Text></View>
		          		<View style={[Layout.col2]}>
		          			<TextInput style={[Layout.input]} placeholder='请输入密码'
		          				onChangeText={(pwd) => this.setState({pwd})}
		          			/>
		          		</View>
		          	</View>
		          	<View style={[Layout.row]}>
		          		<View style={[Layout.col,{alignItems:'center'}]}>
		          			<Button
					            onPress={()=>{this.login()}}
					            color='green'
					            title="登陆"
					         />
		          		</View>
		          	</View>
		        </View>

		        <View style={{flexGrow:1}}></View>
	        </View>
	    )
    }
}

const Layout = StyleSheet.create({
  top:{
     backgroundColor:'orange'
  },
  row:{
  	flexDirection:'row',
  	alignItems:'center',
  },
  col:{
  	flexGrow:1,
  	// borderStyle:'solid',
  	// borderWidth:1,
  	// borderColor:'blue',
  },
  col1:{
  	flexGrow:1,
  	alignItems:'flex-end'
  },
  col2:{
  	flexGrow:10,
  	alignItems:'flex-start'
  },
  input:{
    borderWidth: 1,
    marginLeft: 5,
    paddingLeft: 5,
    borderColor: '#CCC',
    borderRadius: 4,
    width:'80%',
    margin:12,
  	backgroundColor:'#fff',
  	width:'80%',
  	height:36,
  }
})