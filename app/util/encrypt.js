/**
 *
 * @desc 加密
 *
 * @author andy team  2017.11.2
 */
'use strict';

import React, {Component} from 'react';
import md5Js from './md5.js';
import utf8 from './utf8.js'
const sysParameter = {
    APP_KEY         : "haohaizi100000003",
    APP_SERECT      : "FYbpWGGYDbHNFuPKynocv9",
    FORMAT          : "JSON",
    V               : "2.0",
    SIGN_TYPE       : "MD5",
    //TIMESTAMP       : Math.round(new Date().getTime()/1000).toString()
    process_date    : function(date1){
        var fullyear = date1.getFullYear();
        var month = (date1.getMonth()+1) > 9 ? date1.getMonth()+1 : '0'+(date1.getMonth()+1);
        var day = date1.getDate() > 9 ? date1.getDate() : '0'+date1.getDate();
        var hours = date1.getHours() > 9 ? date1.getHours() : '0'+date1.getHours(); 
        var seconds = date1.getSeconds() > 9 ? date1.getSeconds() : '0'+date1.getSeconds();
        var minutes = date1.getMinutes() > 9 ? date1.getMinutes() : '0'+date1.getMinutes();
        return fullyear+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;       
    },  
    TIMESTAMP       : function(){
        var now = new Date();
        return sysParameter.process_date(now);
    }
}

export default class Encrypt extends Component{
  static remoteResult(data){
    let sys_config = {
        app_key     : sysParameter.APP_KEY,
        format      : sysParameter.FORMAT,
        v           : sysParameter.V,
        timestamp   : sysParameter.TIMESTAMP
        //timestamp   : '2017-11-03 15:19:27'
    }
    let request_data = Object.assign(sys_config,data);
    request_data = this.add_sign(request_data);
    request_data = this.tidy_data(request_data);
    //request_data = this.toQueryString(request_data);
    

    return request_data;
  }

  static add_sign(request_data){
    let sign = this.create_sign(request_data);
    request_data['sign'] = sign;   
    return request_data;
  }

  static create_sign(param){
    let sign_basis = 'ANDYHHZ' + this.assemble(param) + sysParameter.APP_SERECT;
    return md5Js.hex_md5(sign_basis).toUpperCase();
  }

  static assemble(param){
      let joint = '';
      if(typeof param == "object" && Object.getOwnPropertyNames(param).length > 0){
          let arr = Object.getOwnPropertyNames(param);
          let arr1 = arr.sort();
          for(let i in arr1){
            let val = param[arr1[i]];
              if(val == void 0 || val == ''){
                  continue;
              }
              if(typeof val == "boolean"){
                  let val = val ? 1 : 0;
              }
              val = (typeof val == "object" && Object.getOwnPropertyNames(val).length > 0) ? this.assemble(val) : val;
              joint += (arr1[i]+val);
          }
      }
      return utf8.encode(joint);
  } 
  
  static tidy_data(param){
    let formData = new FormData();

    if(typeof param == "object" && Object.getOwnPropertyNames(param).length > 0){
        let arr = Object.getOwnPropertyNames(param);
        let arr1 = arr.sort();
        for(let i in arr1){
          formData.append(arr1[i], param[arr1[i]]);
        }
    }

    return formData;
  }

  static toQueryString(param) {
    return param ? Object.keys(param).sort().map(function (key) {
        var val = param[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}


}


