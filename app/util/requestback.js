/**
 * 网络服务js
 * 
 */

'use strict';

import hhzapi from './api.js'
import encrypt from './encrypt.js'

const interface_url = "https://www.beta.haohaizi.com/api?"
 
export default {
    /**
     * app POST请求方式
     * @params	act : method
     *			obj : request params
     *			
     * @author andy  2017.11.1 
     */
    hhzPostRequest(act, obj, doSuccess, doFail) {
      let actmod = act.replace(/\./g, '_');
      let post_data;
      let data = hhzapi[actmod](obj);
      post_data = encrypt.remoteResult(data);
      console.log('请求的接口:');
      console.log(post_data);
      //'Content-Type': 'application/json',
      fetch(interface_url, {
        method: 'POST',
        timeout: 60,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body: post_data
      })
      .then((response) => response.json())//取数据  
      .then((responseJson) => {//处理数据  
      	console.log("POST《》《》《》《》《》《》请求接口（"+act+"）返回的数据");
      	console.log(responseJson);
        
        if (responseJson.rsp == 'succ') {
          doSuccess(responseJson);
        } else {
          doFail(responseJson.message);
        }
  
      })  
      .catch((error) => {  
      	console.log('catch error返回的数据');
        doFail(error);
      })
    },

    /**
     * app Get请求方式
     * @params	act : method
     *			
     * @author andy  2017.11.1 
     */
    hhzGetRequest(act, doSuccess, doFail) {
      let request_url = interface_url + act;

      fetch(request_url, {
        method: 'GET',
      })
      .then((response) => response.json()) 
      .then((responseJson) => {
        console.log(responseJson);
        doSuccess(responseJson);
  
      })  
      .catch((error) => {  
        console.error(error);
        doFail(error);
      })
    }


}