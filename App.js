/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * author  Ing Leonardo Maldonado
 * Abril 2020  tiempos de Covid19
 */

import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
var { width } = Dimensions.get("window")

// import Components
import Tienda from './src/tienda'
import Carrito from './src/carrito'
import Checkout from './src/checkout'
import Perfil from './src/perfil'
// unable console yellow
console.disableYellowBox = true;


// import icons
import Icon from 'react-native-vector-icons/Ionicons';


export default class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module:1,
    };
 }

 render() {
  return (
    <View style={{flex:1}}>
       {
        this.state.module==1? <Tienda />
        :this.state.module==2? <Carrito />
        :this.state.module==3? <Perfil />
        :<Checkout />
       }
       <View style={styles.bottomTab}>
         <TouchableOpacity style={styles.itemTab} onPress={()=>this.setState({module:1})}>
           <Icon name="md-restaurant" size={30} color={this.state.module==1?"#900":"gray"} />
           <Text>Tienda</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.itemTab} onPress={()=>this.setState({module:2})}>
           <Icon name="md-cart" size={30} color={this.state.module==2?"#900":"gray"} />
           <Text>Carrito</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.itemTab} onPress={()=>this.setState({module:3})}>
           <Icon name="md-person" size={30} color={this.state.module==3?"#900":"gray"} />
           <Text style={{color:'black'}}>Perfil</Text>
         </TouchableOpacity>
       
       </View>
    </View>
  );
}


}




const styles = StyleSheet.create({
  bottomTab:{
    height:60,
    width:width,
    backgroundColor:'orange',
    flexDirection:'row',
    justifyContent:'space-between',
    elevation:8,
    shadowOpacity:0.3,
    shadowRadius:50,
    
  },
  itemTab:{
    width:width/3,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    
    
  }
});

