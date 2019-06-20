import React,{Component} from 'react'
import {Home,Me,
  HomeDetail,Message,
  ZhiJie,JiaDian,FenLei,
 Contact,FeedBack,MyOrder,Login,Forgot
} from '../component/index'
import { 
     createBottomTabNavigator,
     createAppContainer,
     createStackNavigator ,
     createDrawerNavigator,
     SafeAreaView
    } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {sty} from './styles'
import LinearGradient from 'react-native-linear-gradient';
import {
  View,Text,
  TouchableOpacity,
  Image,ScrollView,
  StyleSheet,
  ActivityIndicator,
  Platform
} from 'react-native'

const BottomTab=createBottomTabNavigator(
    {
      home:Home,
    //   manage:Manage,
    //   remote:Remote,
      me:Me
    },
    {
     initialRouteName: 'home',
     defaultNavigationOptions:({ navigation })=>({
         tabBarIcon:({focused, horizontal, tintColor})=>{
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'home') {
                iconName ='ios-home';
              } else if (routeName === 'manage') {
                iconName = 'ios-bookmarks';
              }else if(routeName==='remote'){
               iconName='ios-contacts'
              }else{
                  iconName='ios-person'
              }
              return <Ionicons name={iconName} size={horizontal ? 20 : 25} 
          color={focused?sty.themehui:sty.themeColor} />;
         }
     }),
     tabBarOptions: {
        activeTintColor:sty.themehui,
        inactiveTintColor:sty.themeColor,
      },
    }
)

const Diy=(props)=>{
  return (
    <LinearGradient colors={['#40E0D0','#FF8C00','#FF0080']}>
     <ScrollView>
       <SafeAreaView style={{flex:1}}>
       <View
          style={{width:'100%',height:50,paddingLeft:16,justifyContent:'center'}}>
          <Text style={{fontSize:20,fontWeight:'500',color:'#ccc'}}>Main Menu</Text>
        </View>
        {
          ['Contact',"FeedBack"].map((item,index)=>{
          <TouchableOpacity onPress={()=>{
            props.navigation.navigate(item)
            props.navigation.closeDrawer()
          }}
          style={{width:'100%',height:50,paddingLeft:16,justifyContent:'center'}}>

    <Text style={{fontSize:18,fontWeight:'500',color:props.activeItemKey===item?'rgb(251,80,85)':'#fff'}}>{item}</Text>
          </TouchableOpacity>
          })
        }
       </SafeAreaView>
     </ScrollView>
</LinearGradient>
  )
}
const Drawer=createDrawerNavigator(
  {
    Home:{
      screen:Home,
      navigationOptions:()=>({
          header:null,
          headerBackTitle:null,
      })
   },

  },
  {
    drawerWidth:sty.w*.7,
    drawerPosition:'left',
    contentComponent:Diy,
  }
  )
const AllStack=createStackNavigator({
    //  Btm:{
    //     screen:BottomTab,
    //     navigationOptions:()=>({
    //         header:null,
    //         headerBackTitle:null,
    //     })
    //  },
    Drawer:{
      screen:Drawer,
      navigationOptions:(navigation)=>({
        header:null,
        headerBackTitle:null,
    })
    },
    Home:{
      screen:Home,
      navigationOptions:()=>({
          header:null,
          headerBackTitle:null,
      })
   },
     
     HomeDetail:{
       screen:HomeDetail,
       navigationOptions:()=>({
        title:'我的',
        headerTintColor:'white',
         headerStyle: {
          backgroundColor:sty.themeColor,
        },
    })
     },
     Message:{
      screen:Message,
      navigationOptions:()=>({
         title:'我的消息',
         headerTintColor:'white',
         headerStyle: {
          backgroundColor:sty.themeColor,
        },
   })
    },
    ZhiJie:{
      screen:ZhiJie,
      navigationOptions:()=>({
        //  title:'Fast Repair',
        title:Platform.OS=='ios'?'Fast Repair':'天天快修宝典',
         headerTintColor:'white',
         headerStyle: {
          backgroundColor:sty.themeColor,
        },
   })
    },
    JiaDian:{
      screen:JiaDian,
      navigationOptions:()=>({
        //  title:'Fast Repair',
        title:Platform.OS=='ios'?'Fast Repair':'天天快修宝典',
         headerTintColor:'white',
         headerStyle: {
          backgroundColor:sty.themeColor,
        },
   })
    },
    FenLei:{
      screen:FenLei,
      navigationOptions:()=>({
         title:'分类快修',
         headerTintColor:'white',
         headerStyle: {
          backgroundColor:sty.themeColor,
        },
        
   })
    },
    MyOrder:{
      screen:MyOrder,
      navigationOptions:()=>({
         title:'我的订单',
         headerTintColor:'white',
         headerStyle: {
          backgroundColor:sty.themeColor,
        },
        
   })
    },
    Contact:{
      screen:Contact,
      navigationOptions:()=>({
        title:'联系我们',
        headerTintColor:'white',
        headerStyle: {
         backgroundColor:sty.themeColor,
       },
       
  })
    } ,
    Login:{
      screen:Login,
      navigationOptions:()=>({
        header:null,
        headerBackTitle:null,  
  })
    } ,
    FeedBack:{
      screen:FeedBack,
      navigationOptions:()=>({
        title:'我的反馈',
        headerTintColor:'white',
        headerStyle: {
         backgroundColor:sty.themeColor,
       },  
       
  })
    },
    Forgot:{
      screen:Forgot,
      navigationOptions:()=>({
        title:'找回密码',
        headerTintColor:'white',
        headerStyle: {
         backgroundColor:sty.themeColor,
       },  
       
  })
    }
    
})

export default createAppContainer(AllStack)