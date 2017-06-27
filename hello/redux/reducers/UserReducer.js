import React, { Component } from 'react';
import { combineReducers } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Alert
} from 'react-native';

function visibilityFilter(state={aa:0}, action) {
    alert('aaa');

    alert(state['aa']);

    state['aa']=action['text'];
    // alert(state);
    // for(var key in state){
    //     alert(key+'='+state[key]);
    // }
    // alert('//---------//');
    // alert(action);
    // for(var key in action){
    //     alert(key+'='+action[key]);
    // }
    return state;
}
//方法二
function todos(state = 'bb', action) {
    alert('bbb');
    // alert(state);
    // alert('---------');
    // alert(action);
    var obj=new Object();
    obj['bb']=<Text>bbbbbbbbbbbbbbbbb</Text>; 
    return obj;

}

//--定义reducer方法
//todoApp中的两个方法名将作为调用方store.getState()[key]中key的两个键名
const todoApp = combineReducers({
    todos,
    visibilityFilter,
    fun:function(state,action){return {};}
})

export default todoApp