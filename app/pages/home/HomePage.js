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
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';

//引入样式文件
import * as HomePageCss from '../../css/pages/home/HomePageCss';

import Loading from '../../component/Loading';

console.log("__homePage_111__",global.AppTheme);
export default class HomePage extends Component<{}> {
  constructor(props){
    super(props)
    this.state = {
      //获取页面默认主题样式
      AppTheme: 'red',
    }
    console.log("__homePage_222__",global.AppTheme);
  }

  //设置
  static navigationOptions = ({navigation}) => ({ 
      title:'首页',
      tabBarIcon: ({ tintColor,focused }) => (
        focused?
          <Text style={HomePageCss.styles(global.AppTheme).navTextActive}>
              首页
          </Text>
        :
          <Text style={HomePageCss.styles(global.AppTheme).navText}>
             首页
          </Text>
      )
  })

  componentWillMount(){
    console.log("__homePage___",global.AppTheme);
   // console.log("__homePage___", this.props.navigation.state.params.title);   
  }

  render() {
    //组件样式主题AppTheme={this.state.AppTheme}需传入

    //获取组件主题样式放在render里面达到重新渲染获取
    const styles = HomePageCss.styles(this.state.AppTheme);

    return (
      <View style={styles.container}>
        {/*loadding组件*/}
        <Loading isVisible={true} index={3} AppTheme={this.state.AppTheme}></Loading>

        {/*loadding组件*/}
        <Text style={styles.textColor}>首页</Text>

         {/*切换主题按钮*/}
        <View style={styles.themeContainer}>
          <TouchableOpacity
              onPress = {()=>{
                //点击切换主题后需要处理以下数据

                //修改本页面state主题 驱动render函数重新渲染 达到重新获取新设置主题效果
                this.setState({AppTheme:'red'});
                
                //DeviceEventEmitter触发 所有监听isChangeUi事件页面 所有页面state AppTheme重新复制 并重新渲染
                DeviceEventEmitter.emit('isChangeUi','red');

                //全局主题变量赋值 提供给其他页面初始化使用,本页面切换后使用
                global.AppTheme = 'red';

                //需刷新页面 参数随便给 不同主题参数必须不一样 页面才会刷新 此代码主要处理本页面切换后立即刷新渲染
                this.props.navigation.navigate("Main",{appTheme:1});
                }}
          >
            <Text style={styles.buttonNomar}>
            切换红色主题
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {()=>{
              
              this.setState({AppTheme:'green'});
              DeviceEventEmitter.emit('isChangeUi','green');
              global.AppTheme = 'green';
              this.props.navigation.navigate("Main",{appTheme:2});}}
          >
            <Text style={styles.buttonNomar}>
            切换绿色主题
            </Text>
          </TouchableOpacity>
        </View>
      </View>
     
    );
  }

}



