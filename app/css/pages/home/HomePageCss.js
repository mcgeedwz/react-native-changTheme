'use strict';

//首页样式文件
import {
  Platform,
  StyleSheet,
} from 'react-native';

//导入通用样式值文件
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
	  },
	  themeContainer:{
	    width: 200,
	    height: 200,
	    flexDirection: 'column',
	    justifyContent: 'center' ,
	    alignItems: 'center',
	  },
	  buttonNomar:{
	  	margin: 10,
	  	padding: 10,
	  	fontSize: Base.getBase(themeName, 'font_size_n'),
	  	color: Base.getBase(themeName, 'bt_text_color'),
	  	backgroundColor: Base.getBase(themeName, 'bt_bac_g_color'),
	  	borderRadius: 6
	  }

	});

	//返回 styles实例
	return styles;
}


