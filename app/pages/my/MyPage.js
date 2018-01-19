/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  NetInfo,
  Platform,
  BackHandler, 
  DeviceEventEmitter,
} from 'react-native';

import * as MyPageCss from '../../css/pages/my/MyPageCss';

export default class MyPage extends Component<{}> {
  constructor(props){
    super(props)
    this.state = {
      //获取页面默认主题样式
      AppTheme: global.AppTheme, 
   	}
    
  }

     //设置
  static navigationOptions = ({navigation}) => ({ 
      title: '首页',
          tabBarLabel: '首页',
          tabBarIcon: ({ tintColor,focused }) => (
              focused?
              <Text style={MyPageCss.styles(global.AppTheme).navTextActive}>
                  首页
              </Text>
              :
              <Text style={MyPageCss.styles(global.AppTheme).navText}>
                 首页
              </Text>
      )
  })

  
  componentWillMount(){

  	console.log("___myPage____",global.AppTheme);

  	//启用监听函数
   	this.changeUiEmitter();
  }

  componentWillUnmount() {
    console.log("componentWillUnmount__remove______");
    // 移除切换样式监听
    this.isChangeUi.remove();
  }

  //切换样式监听函数
  changeUiEmitter(){
	this.isChangeUi = DeviceEventEmitter.addListener('isChangeUi',(themeName)=>{
    console.log("___myPage__触发切换主题__主题名称为__",themeName);
	  this.setState({
	  	AppTheme: themeName
	  });
	});
  }

  render() {
    const styles = MyPageCss.styles(this.state.AppTheme);
    return (
      <View style={styles.container}>
        <Text style={styles.textColor}>用户中心</Text>
      </View>
    );
  }
}

