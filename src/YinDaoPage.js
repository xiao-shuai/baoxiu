import React,{Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    Platform,
    RefreshControl,
    Linking,
    WebView,
    NetInfo
  } from 'react-native'
import {observable} from 'mobx'
import { SafeAreaView ,NavigationActions} from 'react-navigation';
import { Divider } from 'react-native-elements'
import {inject,observer} from 'mobx-react'
import {sty} from '../src/config/styles'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import  AllStack from '../src/config/navigation'
import {Provider} from 'mobx-react'
import store from '../src/mobx/index'

@inject(["homeStore"])
@observer // 监听当前组件
class YinDaoPage extends Component{
    constructor(props){
       super(props)
       this.state={
           show:false,
       }
    }
componentWillMount(){
   console.log('tiaozhuan%o',this.props.homeStore.isfirst)
   AsyncStorage.getItem('qd').then(res=>{
      console.log('qdqd!!',res)
      if(res!==null){
        this.setState({show:true})
      }
       
   }).catch(err=>{
     console.log('err',err)
   })
  
}
    render(){
        const imgs=[
            {
              img:require('./img/qd1.jpg'),
            },
            {
                img:require('./img/qd2.jpg'),
              },
            ]
           const a=this.props.homeStore.isfirst
        return(
            this.state.show?
            <Provider {...store}>
            <AllStack />
        </Provider>
        :
          <SafeAreaView style={{flex:1,alignItems:'center'}}>
                <Swiper 
            showsButtons={false}
            showsPagination={false}
            loop={false} 
            autoplay={false}
           
            >
               {
         imgs.map((item,index)=>{
             return(
             <View key={index}>
            <Image source={item.img} 
            style={{width:sty.w,height:sty.h}}
            resizeMode="cover"
            />
            {
                index==0?
                <View >
                    <View style={{
                width:sty.w*.06,
                height:sty.w*.06,
                backgroundColor:'white',
                position:'absolute',
                bottom:sty.h*.15,
                right:sty.w*.4,
                borderRadius:sty.w*.03,
                borderWidth:1,
                borderColor:sty.themehui2,
                }}></View>
                    <View style={{
                         width:sty.w*.06,
                         height:sty.w*.06,
                         backgroundColor:sty.themeColor,
                         position:'absolute',
                         bottom:sty.h*.15,
                         left:sty.w*.4,
                         borderRadius:sty.w*.03
                    }}>

                    </View>
                </View>
                :
                <TouchableOpacity style={{
                    position:'absolute',
                    width:sty.w*.4,
                    height:sty.h*.06,
                    bottom:sty.h*.15,
                    left:sty.w*.3,
                    backgroundColor:sty.themeColor,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:5
                }} onPress={()=>{
                    let b='yes'
                    this.props.homeStore.updateisfirst(b)
                    AsyncStorage.setItem('qd','ok')
                    this.setState({show:true})
                }}>
                <Text style={{fontSize:sty.h*.03,color:'white'}}>马上体验</Text>
                </TouchableOpacity>
            }

             </View>
             )
                   })
               }
                </Swiper>
            </SafeAreaView>
            
        
        )
    }
}

export default YinDaoPage