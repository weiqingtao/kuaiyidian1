import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Alert,
  TouchableHighlight
} from 'react-native';

class FirstPage extends Component {
     static navigationOptions = {
        title: 'FirstPage',
      };
    render () {
        const { navigate } = this.props.navigation;
        return(
            <View style={{backgroundColor:'burlywood',flex:1}}>
                <Button
                  //onPress={() => navigate('Second')}    //不带参跳转
                  onPress={() => navigate('Second', { user: 'Lucy' })}  //带参跳转
                  title="Chat with Lucy"
                  style={{width:60,height:60}}
                />
            </View>
        )
    }
}

export class SecondPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Chat with ${navigation.state.params.user}`, //注意:`是左上角~键
      });
    render () {
        const { navigate } = this.props.navigation;
        return(
            <View style={{backgroundColor:'green',flex:1}}>
                <TouchableHighlight onPress={() => navigate('Home', { user: 'Lucy' })}>
                <Text style={[styles.text,{fontSize:15}]}>第一页push</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    onPress={() => navigate('Third', { user: 'Lucy' })}
                >
                <Text style={[styles.text,{fontSize:15}]}>第三页pop</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

export class ThirdPage extends Component {
    render () {
        const { navigate } = this.props.navigation;
        return(
            <View style={{backgroundColor:'yellow',flex:1}}>
                <TouchableHighlight 
                    onPress={() => navigate('Home')}
                    >
                <Text style={[styles.text,{fontSize:15}]}>第一页push</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    onPress={() => navigate('Second', { user: 'aaaaa' })}
                    >
                <Text style={[styles.text,{fontSize:15}]}>第二页pop</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

export default  SimpleApp = StackNavigator({
  Home: { screen: FirstPage },
  Second: {screen:SecondPage},
  Third: {screen:ThirdPage}
});

const styles = StyleSheet.create({
  text:{
    backgroundColor:'green',
    color:'red'
  }
})