/**
 * 网络服务js
 * 
 */

'use strict';

import hhzapi from './api.js'
import encrypt from './encrypt.js'
const interface_url = "https://www.beta.haohaizi.com/api?"
import Toast from '@remobile/react-native-toast';

export default{
    hhzPostRequest(act, obj){
      console.log("11111");
      let actmod = act.replace(/\./g, '_');
      let post_data;
      let data = hhzapi[actmod](obj);
      post_data = encrypt.remoteResult(data);
      console.log('请求的接口:',post_data);
      return _fetch(fetch_promise(interface_url, post_data), 10000);
    }
}

function _fetch(fetch_promise, timeout) {
    var abort_fn = null;
    var abort_promise = new Promise((resolve, reject) => {
        abort_fn = function() {
            reject('abort promise');
        };
    });
    var abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);
    setTimeout(function(){
        abort_fn();
    }, timeout);

    return abortable_promise;
}

function fetch_promise(url, post_data) {
    return new Promise((resolve, reject) => {
        fetch(url,{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          },
            body: post_data
        }).then((response) => { 
            return response.json();     
        }).then((jsonData) => {
          if (jsonData.rsp == 'succ') {
             resolve(jsonData);
          } else {
            reject(jsonData.message);
          }
        }).catch((err) => {
            if (err.message === 'Network request failed'){
                reject('网络出错');
                Toast.showShortCenter('网络出错');
            } else if (err === 'abort promise'){
                reject('请求超时');
                console.log('请求超时');
            }
           //这里可以使用resolve(err),将错误信息传回去
        })
    })
}