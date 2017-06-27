import React from 'react'
import { View, Text, StyleSheet, Modal, ListView,Alert} from 'react-native'
import ActionSheet from 'react-native-actionsheet'


const options = [ '退出', 'Apple', 'Banana', 'Watermelon', <Text style={{color: 'red'}}>Durian</Text> ]
const title = 'Which one do you like?'

class MenuA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
    this.handlePress = this.handlePress.bind(this)
    this.showActionSheet = this.showActionSheet.bind(this)
  }

  showActionSheet(){
  		this.ActionSheet.show();
  }

  handlePress(i) {
    this.setState({
      selected: i
    })
    alert(i);
    if(i==1){
    	Alert.alert('你选苹果');
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={{marginBottom: 20}} >I like {options[this.state.selected]}</Text>
        <Text style={styles.button} onPress={this.showActionSheet}>我的菜单</Text>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={title}
          options={options}
          cancelButtonIndex={0}			//退出项放到最底下
          destructiveButtonIndex={4} //有无不影响
          onPress={this.handlePress}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 100,
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#38f'
  }
})

export default MenuA