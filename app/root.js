
import React from 'react';
import {
    StyleSheet,
    Platform,
    Button,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

//公共方法
import * as utils from './util/utils';

//底部顶部导航组件
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';

//主菜单页面
import HomePage from './pages/home/HomePage';

//商品页
import GoodsPage from './pages/goods/GoodsPage';

//用户中心
import MyPage from './pages/my/MyPage';

console.log("__root__",global.AppTheme);  

const TabNav = TabNavigator (
  {
    Main: { 
      screen: HomePage,
      navigationOptions:({navigation}) => ({ 
          screen: HomePage, 
      }),
      
    },
    GoodsPage: { 
      screen: GoodsPage,
      navigationOptions:({navigation}) => ({ 
          screen: GoodsPage, 
      }),

    },
    MyPage: { 
      screen: MyPage,
      navigationOptions:({navigation}) => ({ 
          screen: MyPage,
      }),

    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    initialRouteName: 'Main',
    scrollEnabled:false,
    swipeEnabled:false,
    lazy: true,
    tabBarOptions: {
        activeTintColor: '#ff4500',
        inactiveTintColor: '#333',//utils.getDefaultColor('font_blackcolor'),
        showIcon:true,
        indicatorStyle: {
          height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        }, 
        style: {
            backgroundColor: utils.getDefaultColor('bg_bar'), // TabBar 背景色
            height: Platform.OS === 'android'? 50:50,
            paddingBottom:Platform.OS === 'android'? 0:5,
        },
        labelStyle:{
            marginTop:Platform.OS === 'android' ? 0:utils.VersionIOS() < 11  ? 0 : 15,
        },
        iconStyle:{
          marginTop:-4,
        },
        titleStyle:{
          fontSize: 16,
        }

    },
  }
);


const StackNav = StackNavigator(  
    
  {  
    Tab:{screen:TabNav},   //顶部导航嵌套底部导航组合使用
  },  
  
  {  
    navigationOptions:{  
      headerBackTitle:null,  
      headerTintColor:'#333', 
      headerStyle:{
          backgroundColor: utils.getDefaultColor('bg_bar'),
          height: utils.screenWidth()*0.11,
      },
      headerTitleStyle:{
          alignSelf: 'center',
          fontSize: Platform.OS === 'android'? 16:14,
          fontWeight: 'normal',
          color: utils.getDefaultColor('font_blackcolor'),
      },
      headerBackTitleStyle:{ 
        fontSize: 14,
        color: '#ff4800',
      },
      showIcon:false, 
      swipeEnabled:false,  
      animationEnabled:false, 
      gesturesEnabled: true,

    },  
    mode:'card', 

  }
);


export default StackNav
  
 


