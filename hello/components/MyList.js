import React, { Component } from 'react';
let GiftedListView = require('react-native-gifted-listview');

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';

function pressFun(rowData) {
    //console.log(rowData+' pressed');
    Alert.alert(rowData);
  }

export default class MyList extends Component{
	_onFetch(page = 1, callback, options) {
		Alert.alert('page:'+page);
    // setTimeout(() => {
      var rows = ['row '+((page - 1) * 3 + 1), 'row '+((page - 1) * 3 + 2), 'row '+((page - 1) * 3 + 3)];
    //   if (page === 3) {
      //   callback(rows, {
      //     allLoaded: true, // the end of the list is reached
      //   });
      // } else {
        callback(rows);
    //   }
    // }, 1000); // simulating network fetching
  }


  /**
   * When a row is touched
   * @param {object} rowData Row data
   */
  

  /**
   * Render a row
   * @param {object} rowData Row data
   */
  _renderRowView(rowData) {
    return (
      <TouchableHighlight
        style={styles.row}
        underlayColor='#c8c7cc'
        onPress={()=>{pressFun(rowData);}}
      >
        <Text>{rowData}</Text>
      </TouchableHighlight>
    );
  }

	render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar} />
       	<GiftedListView
          rowView={this._renderRowView}
          onFetch={this._onFetch}
          firstLoader={true} // display a loader for the first fetching
          pagination={true} // enable infinite scrolling using touch to load more
          refreshable={false} //true表下拉刷新(整个列表重新加载,从第一页),false表下拉不重载
          withSections={false} // enable sections
          customStyles={{
            paginationView: {
              backgroundColor: '#eee',
            },
          }}

          refreshableTintColor="blue"

          enableEmptySections={true}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  navBar: {
    height: 64,
    backgroundColor: '#CCC'
  },
  row: {
    padding: 10,
    height: 44,
  },
});