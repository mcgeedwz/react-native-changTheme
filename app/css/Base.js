'use strict';

/**
* 此换肤方案每次刷新即 重新开启应用则回归默认主题
* 换肤原理 全局定义主题变量 
* 使用全局主题变量 初始化相应的样式值 将样式渲染到页面 
* 使用 DeviceEventEmitter 监听机制 触发改变所有页面state 主题变量 并重新渲染页面 达到切换主题刷新所有页面样式
*/

//定义公共样式变量值
export function getBase(themeName, alias) {
    
    //分不同的主题 所有主题的变量键名相同 值自定义
    const baseStyles = {

        //红色主题
    	red:{
            //大面积背景色
    		bac_g_color:'#ccc',

            //大面积字体色
			text_color: '#ff4800',

            //按钮背景色
            bt_bac_g_color: '#ff4800',

            //按钮字体色
            bt_text_color: '#fff',

            //大字号
			font_size: 40,

            //普通字号
            font_size_n: 20,

            //小字号
            font_size_s: 14,

            //导航默认字体颜色
            nav_text: '#333',

            //导航active字体颜色
            nav_text_active: '#ff4800',
    	},

        //绿色主题
    	green:{
            //大面积背景色
    		bac_g_color:'#f1f1f1',

            //大面积字体色
			text_color: 'green',

            //按钮背景色
            bt_bac_g_color: 'green',

            //按钮字体色
            bt_text_color: '#fff',

            //大字号
			font_size: 50,

            //小字号
            font_size_n: 20,

            //导航默认字体颜色
            font_size_s: 14,

            //导航默认字体颜色
            nav_text: '#333',

            //导航active字体颜色
            nav_text_active: 'green',
    	}
    }

    //返回传入制定主题 名称的值
    return baseStyles[themeName][alias];
}