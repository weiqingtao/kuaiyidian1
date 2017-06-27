import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,     //获取屏幕高宽
  Button,
  Alert,
  TouchableHighlight
} from 'react-native';

import { StackNavigator } from 'react-navigation';

class FirstPage extends Component {
     static navigationOptions = {
        title: 'FirstPage',
      };
    render () {
        const { navigate } = this.props.navigation;
        return(
            <View style={{backgroundColor:'burlywood',flex:1}}>
                <Button
                  //onPress={() => navigate('Second')}
                  onPress={() => navigate('Second', { user: 'Lucy' })}
                  title="Chat with Lucy"
                  style={{width:60,height:60}}
                />
            </View>
        )
    }
}



export class SecondPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Chat with ${navigation.state.params.user}`,
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

export const SimpleApp = StackNavigator({
  Home: { screen: FirstPage },
  Second: {screen:SecondPage},
  Third: {screen:ThirdPage}
});

const styles = StyleSheet.create({
    text:{color:'#fbcadf'}
})
