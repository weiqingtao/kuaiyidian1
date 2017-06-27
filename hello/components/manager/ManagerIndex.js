import React, { Component } from 'react';
import Head from '../public/Head'
import Main from './Main'
import Footer from './Footer'
import Storage from '../../common/Storage'

import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Alert
} from 'react-native';


let screenHeight=Dimensions.get('window').height;

export default class Index extends Component {
  constructor(props, context){
    super(props,context);
    this.state={};
    this.state.body=<Main name='李四'/>;
    //this.changeBody.bind(this);
  }
  helloFun(param){
    Alert.alert(param);
  }
  changeBody(tag){
      this.setState({body:tag});
  }
  // static navigationOptions = ({ navigation }) => ({
  //       title: `餐厅App`,
  //     });
  render() {
    // const { navigate } = this.props.navigation;
    // alert(this.props.navigation.navigate);
    //Storage.getInstance().setProp('navigate',this.props.navigation.navigate);
    return (
      <View style={[Layout.outer]}>
        <Head shopname={this.props.shopname} shoprole={this.props.shoprole}/>
        {this.state.body}
        <Footer helloFun={this.helloFun} changeBody={this.changeBody.bind(this)}/>
      </View>
    );
  }
}

const Layout = StyleSheet.create({
  outer:{
    height:screenHeight-25,
    flexDirection:'column',
    justifyContent:'space-between'
  }
})