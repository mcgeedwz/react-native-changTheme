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

import * as GoodsPageCss from '../../css/pages/goods/GoodsPageCss';

export default class GoodsPage extends Component<{}> {
  constructor(props){
    super(props)
    this.state = {
      //获取页面默认主题样式
      AppTheme: global.AppTheme,
   	}
  }

  //设置
  static navigationOptions = ({navigation}) => ({ 
      title:'商品',
      tabBarIcon: ({ tintColor,focused }) => (
        focused?
          <Text style={GoodsPageCss.styles(global.AppTheme).navTextActive}>
              商品
          </Text>
        :
          <Text style={GoodsPageCss.styles(global.AppTheme).navText}>
             商品
          </Text>
      )
  })
  
  componentWillMount(){
  	console.log("___GoodsPage____",global.AppTheme);
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
      console.log("___GoodsPage__触发切换主题__主题名称为__",themeName);
  	  this.setState({
  	  	AppTheme: themeName
  	  });
  	});
  }

  render() {
    const styles = GoodsPageCss.styles(this.state.AppTheme);
    return (
      <View style={styles.container}>
        <Text style={styles.textColor}>商品</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});