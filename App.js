
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,YellowBox,AsyncStorage} from 'react-native';
import  AllStack from './src/config/navigation'
import {Provider} from 'mobx-react'
import store from './src/mobx/index'
import Parse from 'parse/react-native'
import JPushModule from 'jpush-react-native';
import YinDaoPage from './src/YinDaoPage'
function setup() {
  Parse.setAsyncStorage(AsyncStorage)
  Parse.initialize('psjfapp');
  Parse.serverURL =  'http://jinfeng.ANDCORPTEACH.COM:10018/parse'
}
setup()
console.disableYellowBox=true
export default class App extends Component<Props> {
  componentWillMount(){
    if(Platform.OS=='android'){
 // 新版本必需写回调函数
        // JPushModule.notifyJSDidLoad();
        JPushModule.notifyJSDidLoad((resultCode) => {
          if (resultCode === 0) {}
    });
    
    // 接收自定义消息
    JPushModule.addReceiveCustomMsgListener((message) => {
      this.setState({pushMsg: message});
    });
    // 接收推送通知
    JPushModule.addReceiveNotificationListener((message) => {
      console.log("receive notification: " + message);
    });
    // 打开通知
    JPushModule.addReceiveOpenNotificationListener((map) => {
      console.log("Opening notification!");
      console.log("map.extra: " + map.extras);
      // 可执行跳转操作，也可跳转原生页面
      // this.props.navigation.navigate("SecondActivity");
    });
    }
   
      }
      componentWillUnmount(){
        if(Platform.OS=='android'){
          JPushModule.removeReceiveCustomMsgListener();
          JPushModule.removeReceiveNotificationListener();
        }  
      }
  render() {
    return (
      <Provider {...store}>
<AllStack />
    </Provider>

    );
  }
}

const styles = StyleSheet.create({
  
});
