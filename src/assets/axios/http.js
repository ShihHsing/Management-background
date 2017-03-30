import axios from 'axios';
import store from '../store';
import router from '../router/router.js'
import Qs from 'qs';

// axios 配置
axios.defaults.timeout = 5000;

// https://bird.ioliu.cn/v1/?url=
axios.defaults.baseURL = 'http://a001.aybc.so/';
// axios.defaults.withCredentials = true

// 请求前对数据做处理
axios.defaults.transformRequest = [function(data){
        //依自己的需求对请求数据进行处理
        return Qs.stringify(data,{arrayFormat:'brackets'});
    }],
//添加一个请求拦截器
axios.interceptors.request.use( 
  config => {

    //在请求发送之前做一些事
    return config;

  }, 
  error => {

    //当出现请求错误是做一些事
    return Promise.reject(error);

  }
);

//添加一个返回拦截器
axios.interceptors.response.use(
  response => {

    //在请求发送之前做一些事
    
    if (response.data) {
      // statement
      switch (response.data.flag) {
        case 9004:
          // statements_1
          router.push({
            path: 'home'
          })
          break;
      }
    }
    return response;

  }, 
  error => {

    //当出现请求错误是做一些事
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit(USER_SIGNOUT);
          router.replace({
            path: 'login'
          })
      }
    }
    return Promise.reject(error)   // 返回接口返回的错误信息
  }
);

export default axios;
