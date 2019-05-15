import { observable, action } from "mobx";

class HomeStore{
    @observable text;
    @observable order;
    @observable isfirst;
    @observable fk;
    constructor(){
    this.text='wowoww777'
    this.isfirst='no'
    this.fk=[
        {
         con:'请修复iPhone Max机型显示字体图标问题',    
        }
]
    this.order=[
        {
       'status':1,   //1 已完成 ，0预约中
      'lx':'直接下单',
      'dz':'北京市昌平区',
      'time':'2019-4-3',
      'bxinfo':'水管漏水',
      'xm':'郭先生',
      'phone':'18845676765',
      'money':'100',
      'ddh':'287676543234567'
        }
    ]
    }
   @action
   updatefk=(e)=>{
       this.fk.push(e)
   }
   updateorder=(e)=>{
    this.order.push(e)
   } 
   updateisfirst=(e)=>{
       this.isfirst=e
   }

}
const homeStore=new HomeStore()
export {homeStore}