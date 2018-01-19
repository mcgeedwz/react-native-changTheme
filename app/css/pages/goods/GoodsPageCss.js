'use strict';

import {
  Platform,
  StyleSheet,
} from 'react-native';


import * as Base from '../../Base';

//首页样式 ‘uiName’ 样式参数
export function styles(themeName){

	const styles = StyleSheet.create({
	  container: {
	    flex: 1,
	    backgroundColor: Base.getBase(themeName, 'bac_g_color'),
	    alignItems: 'center',
	  },
	  textColor:{
	  	color: Base.getBase(themeName, 'text_color'),
	  	fontSize: Base.getBase(themeName, 'font_size'),
	  },
	  navText:{
	  	fontSize: Platform.OS === 'android'? 22:24,
	  	color: Base.getBase(themeName, 'nav_text'),
	  },
	  navTextActive:{
	  	fontSize: Platform.OS === 'android'? 22:24,
	  	color: Base.getBase(themeName, 'nav_text_active'),
	  }
	});
	
	return styles;
}


