'use strict';

import {
	Dimensions,
  	StyleSheet,
} from 'react-native';

import * as Base from '../Base';

let {width, height} = Dimensions.get('window');

//首页样式 ‘uiName’ 样式参数
export function styles(themeName){

	const styles = StyleSheet.create({
	  loadingView: {
	    flex: 1,
	    flexDirection: 'row',
	    justifyContent: 'center' ,
	    alignItems:  'center' ,
	    height: height,
	    width: width,
	    position: 'absolute',
	    opacity: 0.5,
	    backgroundColor: Base.getBase(themeName, 'bac_g_color'),

	  },

	  spinner: {
	    marginTop: height / 2 - 30,
	    marginLeft: width / 2 - 30
	  },
	  text: {
	  	color: Base.getBase(themeName, 'text_color'),
	  	fontSize: Base.getBase(themeName, 'font_size'),
	    marginTop: 15
	  }
	});

	return styles;
}
