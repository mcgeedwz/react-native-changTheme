'use strict';

import {
    Platform,
    PixelRatio,
    Linking,
    DeviceEventEmitter,
} from 'react-native';

import * as asyncstorage from './asyncstorage';

const { height, width } = require('Dimensions').get('window');

// ui设计图的宽度是750
const UIPixelRatio = width / 750;

/*
 设备的像素密度，例如：
 PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
 PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 PixelRatio.get() === 3.5        Nexus 6       */

// iphone6的像素密度
const defaultPixel = 2;
// px转换成dp
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
// 获取缩放比例
const scale = Math.min(height / h2, width / w2);
const basePx = 375

/**
 * 常用颜色,
 *	调用方法 
 *      utils.getDefaultColor('bg_redcolor')
 * @return 返回常用的颜色
 */
export function getDefaultColor(alias) {
    const htycolors = {
      //分割线颜色
      split_color:'#E4E4E4', //灰色分割线

      //边框线颜色
      border_ccc: '#ccc', //灰色

      //常用字体颜色
      font_graycolor:'#D7D7D7',  //灰色字体
      font_darkcolor:'#949494',  //深色字体
      font_blackcolor:'#333333', //黑色字体
      font_whitecolor:'#FFFFFF', //白色字体
      font_redcolor:'#FF534C',  //红色字体

      //常用背景颜色
      bg_redcolor:'#FF534C',  //红色背景
      bg_graycolor:'#EEEEEE',  //灰色背景
      bg_whitecolor:'#FFFFFF', //白色背景
      bg_bar:'#f2f2f2',    //导航ui灰色背景
    }

    return htycolors[alias];
}

/**
 * 判断当前系统是不是iOS
 * @return {Boolean} [description]
 */
export function px2dp(px) {
    return px *  width / basePx
}

/**
 * 判断当前系统是不是iOS
 * @return {Boolean} [description]
 */
export function isIOS() {
    return Platform.OS === "ios";
}

/**
 * 获取当前ios版本
 * @return {Boolean} [description]
 */
export function VersionIOS() {
    const majorVersionIOS = parseInt(Platform.Version);
    return majorVersionIOS;
}

/**
 * 获取当前android版本
 * @return {Boolean} [description]
 */
export function VersionAndroid() {
    return Platform.Version;
}

/**
 * 获取屏幕宽度
 * @return {[type]} [description]
 */
export function screenWidth() {
    return width;
}

/**
 * 获取屏幕高度
 * @return {[type]} [description]
 */
export function screenHeight() {
    return height;
}

/**
 * 转成像素单位
 * @param  {[type]} dp [description]
 * @return {[type]}    [description]
 */
export function toPixels(dp) {
    return PixelRatio.getPixelSizeForLayoutSize(dp);
}

/**
 * 转成dp
 * @param  {[type]} px [description]
 * @return {[type]}    [description]
 */
export function toDips(px) {
    return px * UIPixelRatio;
}

export function getPixelRatio() {
    return PixelRatio.get();
}

/**
 * 获取字体大小
 * @param  {[type]} px 参考图上的像素值
 * @return {[type]}    字体大小
 */
export function getFontSize(px) {
    // return toDips(px) * PixelRatio.get() / 3;
    return toDips(px) + (isIOS() ? 2 : 4);
    
    // px = Math.round((px * scale + 0.5) * PixelRatio.get() / PixelRatio.getFontScale());
    // return px / defaultPixel;
}

/**
 * 去掉数组中的重复项
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
export function unique(arr) {
    let result = [], hash = {};
    for (let i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

/**
 * 检查是不是手机号
 */
export function isPhone(phone) {
    return RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/).test(phone);
}

export function isEmail(mail) {
    return RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(mail);
}

/**
 * 检查身份证号的合法性
 */
export function isCardno(cardno) {
    return RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(cardno);
}

/**
 * 检查日期的合法性
 */
export function checkDate(year, month, date) {
    year = parseInt(year);
    month = parseInt(month);
    date = parseInt(date);
    if (year < 1970) {
        return false;
    }
    return true;
}

const timeStrings = {
    seconds: "1分钟前",
    minute: "1分钟前",
    minutes: "%d分钟前",
    hour: "1小时前",
    hours: "%d小时前",
    day: "1天前",
    days: "%d天前",
    month: "1个月前",
    months: "%d月前",
    year: "1年前",
    years: "%d年前"
};

export function timeAgo(timestamp) {
    let seconds = Math.floor((new Date().getTime() - timestamp) / 1000);
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    let years = days / 365;

    function substitute (string, number) {
        return string.replace(/%d/i, number);
    }

    let words = seconds < 45 && substitute(timeStrings.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute(timeStrings.minute, 1) ||
        minutes < 45 && substitute(timeStrings.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute(timeStrings.hour, 1) ||
        hours < 24 && substitute(timeStrings.hours, Math.round(hours)) ||
        hours < 48 && substitute(timeStrings.day, 1) ||
        days < 30 && substitute(timeStrings.days, Math.floor(days)) ||
        days < 60 && substitute(timeStrings.month, 1) ||
        days < 365 && substitute(timeStrings.months, Math.floor(days / 30)) ||
        years < 2 && substitute(timeStrings.year, 1) ||
        substitute(timeStrings.years, Math.floor(years));

    return words;
}

export function formatDateTime(date, fmt: String = 'yyyy-MM-dd hh:mm:ss', judgeDoday: Boolean = true) {
    const o = {
        // 月份
        "M+": date.getMonth() + 1,
        // 日
        "d+": date.getDate(),
        // 小时
        "h+": date.getHours(),
        // 分
        "m+": date.getMinutes(),
        // 秒
        "s+": date.getSeconds(),
        // 季度
        // "q+": Math.floor((date.getMonth() + 3) / 3),
        // 毫秒
        "S": date.getMilliseconds()
    };
    if (judgeDoday && fmt.indexOf(' ') !== -1) {
        const now = new Date();
        if (now.getDate() === o['d+'] && now.getMonth() + 1 === o['M+'] && now.getFullYear() === date.getFullYear()) {
            fmt = fmt.split(' ')[1];
        } else {
            fmt = fmt.split(' ')[0];
        }
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
}

/**
 * 将两个数组进行merge，key相同的话，就认为是同一个元素
 */
export function mergeArray(arrA, arrB, key) {

    function hasItem(arr, key, val) {
        for (let i = 0; i < arr.length; i++) {
            if(arr[i][key] === val) return true;
        }
        return false;
    }

    for (let i = 0; i < arrB.length; i++) {
        if (!hasItem(arrA, key, arrB[i][key])) {
            arrA.push(arrB[i]);
        }
    }

    return arrA;
}

export function getItemFromArray(arr, key, val) {
    for (let i = 0; i < arr.length; i++) {
        if(arr[i][key] === val) return arr[i];
    }
    return null;
}

export function getItemsFromArray(arr, key, val) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if(arr[i][key] === val) result.push(arr[i]);
    }
    return result;
}

export function isPasswordLegal(password) {
    return RegExp(/^[0-9a-zA-Z-_~!@#$%^&*]+$/).test(password);
}

function _deepcopy(source) {
    let result = source instanceof Array ? [] : {};
    let t = null;
    for (let key in source) {
        t = typeof(source[key]);
        if (key === "reply") {
            console.log(t);
        }
        result[key] = t === "object" ? _deepcopy(source[key]): source[key];
    }
    return result; 
}

/**
 * 深度复制
 * @param  {[type]} source [description]
 * @return {[type]}        [description]
 */
export function deepcopy(source) {
    return _deepcopy(source);
}

export function isUndefined(val) {
    return typeof val === "undefined";
}

export function obj2Str(obj) {
    if (typeof(obj) === "string") return obj;
    let str = '';
    for (let key in obj) {
        str += `key=>${key},val=${obj[key]}\n`;
    }
    return str;
}

export function number2Str(num, length) {
    num = num.toString();
    while (num.length < length) {
        num = '0' + num;
    }
    return num;
}

/**
 * 移除string最后的几位
 */
export function removeLast(str, num) {
    num = num || 1;
    return str.substr(0, str.length - num);
}

export function isNullOrEmpty(str: String) {
    if (typeof str === "undefined") return true;
    if (str === '') {
        return true;
    }
    if (!str) {
        return true;
    }
    return false
}


//时间戳转换
export function conversionTime(time){
    var date = new Date();  
    date.setTime(time * 1000);  
    var y = date.getFullYear();      
    var m = date.getMonth() + 1;      
    m = m < 10 ? ('0' + m) : m;      
    var d = date.getDate();      
    d = d < 10 ? ('0' + d) : d;      
    var h = date.getHours();    
    h = h < 10 ? ('0' + h) : h;    
    var minute = date.getMinutes();    
    var second = date.getSeconds();    
    minute = minute < 10 ? ('0' + minute) : minute;      
    second = second < 10 ? ('0' + second) : second;
    var newtime =  y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;    
    //console.log("___newtime____",newtime);
    return newtime;
  }

//打开浏览器端页面
export function OpenHtml(url){
    Linking.canOpenURL(url)
    .then((supported)=>{  
      if (!supported){  
        console.log('Can\'t handle url: ' + url);  
        Alert.alert(  
          '提示',   
          'Can\'t handle url: ' + url,  
          [  
            {text: 'OK', onPress:()=>{}}  
          ]  
        );  
      }else{  
        return Linking.openURL(url);  
      }  
    })  
    .catch((err)=>{  
      console.log('An error occurred', err);  
      Alert.alert(  
        '提示',   
        'An error occurred: ' + err,  
        [  
          {text: 'OK', onPress:()=>{}}  
        ]  
      );  
    });


}

  // 退出登陆
  export function logout(){
      let _this = this;
      asyncstorage.removeItem('crmId').then((value)=>{
          DeviceEventEmitter.emit('isLoginOut','已退出');
      });
  }
