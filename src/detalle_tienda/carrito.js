import React, { Component } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions,ScrollView } from 'react-native';
var { width } = Dimensions.get("window")
// import icons
import Icon from 'react-native-vector-icons/Ionicons';
//recibir los productos agregados
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
export default class Carrito extends Component {

  constructor(props) {
     super(props);
     this.state = {
        dataCart:[],
        carritovacio:false,
        total:0,
     };
  }

  componentWillMount()
  {
    AsyncStorage.getItem('cart').then((cart)=>{
      if (cart !== null) {
        // We have data!!
        const cartfood = JSON.parse(cart)
       
        console.log(cartfood)
        if(cartfood.length === 0){
          this.setState({carritovacio:true})
          //console.log("se checho")
        }else{
          this.setState({dataCart:cartfood})
        }
       
      }
    })
    .catch((err)=>{
      alert(err)
    })
  }

  render() {
    this.total()
    const {carritovacio} = this.state;
    console.log(carritovacio)
    if(carritovacio){ 
      return(  <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
        
        <LottieView  style={{ position: 'relative', alignSelf: 'center', bottom: 10, width:150, height: 150 }}
                          source={require('../../res/2056-gagaha.json')} autoPlay loop  />

                        
        <Text style={{fontSize:32,fontWeight:"bold",color:"#f9aa34"}}>Carrito vacio</Text>
        
        </View>)
    }else{
      return (
      
        <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
             <View style={{height:20}} />
           <Text style={{fontSize:32,fontWeight:"bold",color:"#f9aa34"}}>Carrito</Text>
           <View style={{height:10}} />
  
           <View style={{flex:1}}>
  
             <ScrollView>
  
               {
                 this.state.dataCart.map((item,i)=>{
                   return(
                     <View style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
                       <Image resizeMode={"contain"} style={{width:width/3,height:width/3}} source={{uri: item.food.url_foto}} />
                       <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
                         <View>
                           <Text style={{fontWeight:"bold", fontSize:20}}>{item.food.titulo}</Text>
                           <Text>{item.food.descripcion}</Text>
                         </View>
                         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                           <Text style={{fontWeight:'bold',color:"#f9aa34",fontSize:20}}>${item.precio*item.quantity}</Text>
                           <View style={{flexDirection:'row', alignItems:'center'}}>
                             <TouchableOpacity onPress={()=>this.onChangeQual(i,false)}>
                               <Icon name="ios-remove-circle" size={35} color={"#f9aa34"} />
                             </TouchableOpacity>
                             <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{item.quantity}</Text>
                             <TouchableOpacity onPress={()=>this.onChangeQual(i,true)}>
                               <Icon name="ios-add-circle" size={35} color={"#f9aa34"} />
                             </TouchableOpacity>
                           </View>
                         </View>
                   <Text></Text>
                       </View>
                     </View>
                   )
                 })
               }
               <View style={{height:10}}><Text></Text></View>
  
               <View style={{height:20}} />
  
               <TouchableOpacity style={{
                   backgroundColor:"#f9aa34",
                   width:width-40,
                   alignItems:'center',
                   padding:10,
                   borderRadius:5,
                   margin:20
                 }} onPress={() => this.props.navigation.navigate('Checkout',{productos: this.total()})}>
                 <Text style={{
                     fontSize:24,
                     fontWeight:"bold",
                     color:'white'
                   }}>
                  (${this.total()}) Terminar compra
                 </Text>
               </TouchableOpacity>
  
               <View style={{height:20}} />
             </ScrollView>
  
           </View>
  
        </View>
      );
    }

    
  }


   total(){
      
      var arr =this.state.dataCart;
      //const cart = this.state.datacart;
      console.log("dentro de  la funcion"+JSON.stringify(arr))
     var total = 0;
      for (var i in arr){
        //console.log(arr.push(object[i].food.titulo));
        total = total +(arr[i].food.precio*arr[i].quantity);
        console.log(arr[i].food.precio*arr[i].quantity);
        console.log(total);
       
      }
      return total;
   
    
  }
  onChangeQual(i,type)
  {
    const dataCar = this.state.dataCart
    let cantd = dataCar[i].quantity;

    if (type) {
     cantd = cantd + 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
     console.log(" mas dos items");
     AsyncStorage.setItem('cart',JSON.stringify(dataCar));
    }
    else if (type==false&&cantd>=2){
     cantd = cantd - 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
     console.log("dos items");
     AsyncStorage.setItem('cart',JSON.stringify(dataCar));
    }
    else if (type==false&&cantd==1){
    dataCar.splice(i,1)
     this.setState({dataCart:dataCar})
       
    
    console.log(dataCar);
  AsyncStorage.setItem('cart',JSON.stringify(dataCar));
       }
    //mostrar vista de carrito vacio
    if(dataCar.length===0){
      this.setState({carritovacio:true})
    }
  }
}