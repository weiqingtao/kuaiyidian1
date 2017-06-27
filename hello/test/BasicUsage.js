import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  ScrollView,
} from 'react-native';
import PageOne from './PageOne'
import PageTwo from './PageTwo'
import PageThree from './PageThree'

import ScrollableTabView  from 'react-native-scrollable-tab-view';

export default class BasicUsage extends Component {
	constructor(props, context){
	    super(props,context);
	}
  render() {
    return (
      <ScrollableTabView
      style={{marginTop: 20, }}
      initialPage={2}
      //renderTabBar={() => <PageThree/>}
      >
      <ScrollView tabLabel="pageOne">
        <View>
          <PageOne/>
          <Text>aaaaaaaaaaaaaa</Text>
        </View>
      </ScrollView>
      <ScrollView tabLabel="pageTwo">
        <View>
          <PageTwo/>
          <Text>bbbbbbbbbbbbb</Text>
        </View>
      </ScrollView>
      <ScrollView tabLabel="pageThree">
        <View>
          <PageThree/>
          <Text>ccccccccccccccccc</Text>
        </View>
      </ScrollView>
      
      </ScrollableTabView>
    );
  }
}