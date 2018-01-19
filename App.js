/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  NetInfo,
  Platform,
  BackHandler, 
  DeviceEventEmitter
} from 'react-native';

import Navigation from './app/root'
import toast from './app/util/toast'

//定义默认主题
const defaultTheme = 'red';

global.AppTheme = defaultTheme;
console.log("__root__",global.AppTheme);  

export default class App extends Component<{}> {
  constructor(props){
    super(props)
    this.state = {
      //获取页面默认主题样式
      AppTheme: global.AppTheme,
    }
    this._lastPressBackTime = 0;
  }
  

  componentWillMount(){
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        const nav = this._nav;
        const routers = nav ? nav.getCurrentRoutes() : null;
        if (routers && routers.length > 1) {
          nav.pop();
          return true;
        }
        const now = new Date().getTime();
        if (now - this._lastPressBackTime < 3000) {
          return false;
        }
        this._lastPressBackTime = now;
        toast("再按一次退出", 'bottom');
        return true;
      });
    }

    console.log("___app____",global.AppTheme);
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
      console.log("____app__触发切换主题__主题名称为__",themeName);
      this.setState({
        AppTheme: themeName
      });
    });
  }


   

  render() {
    return (
      <View style={styles.container}>
        <Navigation
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  activeColor:{
    fontSize:Platform.OS === 'android'? 22:24,
    color:'blue'
  },
});