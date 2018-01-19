/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Platform,
  Dimensions
} from 'react-native';



//引入组件样式文件
import * as LoadingCss from '../css/component/LoadingCss';

let {width, height} = Dimensions.get('window');

export default class Loading extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      types: [
        'CircleFlip',
        'Bounce',
        'Wave',
        'WanderingCubes',
        'Pulse',
        'ChasingDots',
        'ThreeBounce',
        'Circle',
        '9CubeGrid',
        'WordPress',
        'FadingCircle',
        'FadingCircleAlt',
        'Arc',
        'ArcAlt'
      ],
      size: 60,
      color: this.props.color
        ? this.props.color
        : "#FFFFFF",
      isVisible: this.props.isVisible
        ? this.props.isVisible
        : true
    }
  }

  render() {
    //console.log(this.props.index);
    //获取组件主题样式 放在render里面达到重新渲染获取
    const styles = LoadingCss.styles(this.props.AppTheme);
    var type = this.state.types[this.state.index];
    //console.log(type);
    return (
      <View style={styles.loadingView}>
       	<Text style={styles.text}>我是一个loading组件</Text>
      </View>
    );
  }
}

