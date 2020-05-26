import React, { Component } from 'react';
import { Text, View, 
  TextInput,
  TouchableOpacity,
  StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
export default class Checkout extends Component {

  constructor(props) {
     super(props);
     this.state = {
       data:"",
       selectedIndex: 0,

       nombre:"", 
       correo:"",
       direccion:"",
       cruzamientos:"",
       referencias:"",
       colonia:"",
       telefono:"",
       datos_vacio:true
     };
     this.updateIndex = this.updateIndex.bind(this)
    
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  componentDidMount()
  {
    AsyncStorage.getItem('cart').then((cart)=>{
      if (cart !== null) {
        // We have data!!
        const cartfood = JSON.parse(cart)
       
        console.log(cartfood)
        
       
      }
    })
    .catch((err)=>{
      alert(err)
    })
  }

////checar si tiene los datos de envio

retrieveData = async () => {
  try {
    const name = await AsyncStorage.getItem("perfil")

    if (name !== null) {
      const e = JSON.parse(name)
      
     
      this.setState({ 
        nombre:e.nombre, 
        correo:e.correo,
        direccion:e.direccion,
        cruzamientos:e.cruzamientos,
        referencias:e.referencias,
        colonia:e.colonia,
        telefono:e.telefono,
        datos_vacio:false
      })


     
      //console.log(this.state.datos_vacio);
    }else{
      this.setState({
        datos_vacio:true
      })
    }
    
  } catch (e) {
    alert('Failed to load name.')
  }
}




  render() {
    const buttons = ['Pasar a la tienda', 'Servicio a domicilio']
  const { selectedIndex } = this.state
  this.retrieveData();
    //console.log(selectedIndex);
    return (
      <View style={{flex:1,alignItems: 'center', justifyContent: 'flex-start'}}>
          <View style={{marginTop:10 ,marginLeft:20, marginRight:20, alignItems:"center"}}>
          <Text style={{fontSize:32,fontWeight:"bold",color:"#000000", alignSelf:"center"}}>Selecciona un método de entrega</Text>
          </View>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={styles.containerStyle}
            buttonStyle={styles.buttonStyle}
            selectedButtonStyle={styles.selectedButtonStyle}
            innerBorderStyle={{width: 0, color:"white"}}
            containerBorderRadius={0}
            underlayColor={"gray"}
            
           // buttonStyle={{ backgroundColor :"#f4511e"}}
          />
          <View>
            {this.state.selectedIndex == 0 ? 
            <Text>selecciono 0</Text>:
            this.state.selectedIndex == 1 &&
            <View>  
                           
                             
                              <Text style={styles.description}>  
                              <Icon
                                name="md-pin"
                               
                                size={25}
                                color="oracle"
                              
                              /> Se te enviará en la siguiente dirección:</Text>
                           
                          <Text style={styles.info}>A nombre: {this.state.nombre}</Text>
                          <Text style={styles.description}>Dirección: {this.state.direccion}  </Text>
                          <Text style={styles.description}>Cruzamientos: {this.state.cruzamientos}  </Text>
                          <Text style={styles.description}>Referencias: {this.state.referencias}  </Text>
                          <Text style={styles.description}>Colonia: {this.state.colonia}  </Text>
                          <Text style={styles.description}>Teléfono: {this.state.telefono}  </Text>
                          </View>
 
          }
          </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'flex-start',
  },
  containerStyle: {
      height: 50,
      width: '100%',
      // borderTopRightRadius: 20,
      borderWidth: 0,
      backgroundColor: "white",
      marginTop: 0,
      borderRadius: 0
  },
  buttonStyle: {
      backgroundColor: "white",
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      borderWidth: 0,
  },
  selectedButtonStyle: {
      backgroundColor:"gray",
  },
  info:{
    textAlign:'center',
    fontSize:16,
    color: "#696969",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
});
