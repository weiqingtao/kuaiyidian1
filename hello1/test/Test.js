import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
   ProgressViewIOS
} from 'react-native';


import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
class TabBarView extends Component {
  render() {
    return (
    <ScrollableTabView tabBarUnderlineColor="rgb(23,102,171)" tabBarActiveTextColor="black"  style={{marginTop:20}}>
      <View tabLabel='城市工资排行'>
        <Text style={styles.phoneContainer}>
          城市工资排行
        </Text>
        <ProgressViewIOS style={styles.progressView}  progress={0.3}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="purple" progress={0.2}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="red" progress={0.4}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="orange" progress={0.6}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="yellow" progress={0.8}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="black" progress={0.9}/>
      </View>

      <View tabLabel='行业工资排行'>
        <Text style={styles.phoneContainer}>
          行业工资排行
        </Text>
        <ProgressViewIOS style={styles.progressView}  progress={0.3}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="purple" progress={0.2}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="red" progress={0.4}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="orange" progress={0.6}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="yellow" progress={0.8}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="black" progress={0.9}/>
    </View>

      <View tabLabel='职业工资排行'>
        <Text style={styles.phoneContainer}>
          职业工资排行
        </Text>
        <ProgressViewIOS style={styles.progressView}  progress={0.3}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="purple" progress={0.2}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="red" progress={0.4}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="orange" progress={0.6}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="yellow" progress={0.8}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="black" progress={0.9}/>
      </View>

    </ScrollableTabView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  progressView: {
    marginTop: 20,
    marginLeft:10,
    marginRight:10,

  },
  phoneContainer :{
    borderColor:"rgb(241,241,241)",
    backgroundColor:"rgb(255,255,255)",
    flex:1,
    borderStyle:"solid",
    borderWidth:1,
    margin:10,
    borderRadius:3,
    shadowColor: "rgb(229,229,229)",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 3
    }
  }
});

AppRegistry.registerComponent('TabBarView', () => TabBarView);