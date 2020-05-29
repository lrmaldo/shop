import React, { Component } from 'react';
import { Text, View, 
    TouchableOpacity,
    ScrollView,
    Alert,
  StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements'
//import { ScrollView } from 'react-native-gesture-handler';

import AnimatedLoader from 'react-native-animated-loader';
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
       email:"",
       datos_vacio:true,
       cartconfirmado:[],
       id_tieda:"",
       nombretienda:"",
       direccionTienda:"",
       telefonoTienda:"",
       visible: false
     };
     this.updateIndex = this.updateIndex.bind(this)
    
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  recargarDatostienda = async () => {
    try {
      const datos = await AsyncStorage.getItem("datostienda")

      if (datos !== null) {
        const e = JSON.parse(datos)
        
       this.setState({
         nombretienda:e.nombretienda,
         direccionTienda:e.direccionT,
         telefonoTienda:e.telefonoTienda,
       })
       // console.log(e)


       
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

  componentDidMount()
  {
    AsyncStorage.getItem('datostienda').then((datos)=>{
      if (datos !== null) {
        // We have data!!
        const e = JSON.parse(datos)
        console.log(e)
        this.setState({
          id_tienda:e.id_tienda,
          nombretienda:e.nombreTienda,
          direccionTienda:e.direccionT,
          telefonoTienda:e.telefonoTienda,
        })
       
      }
    })
    .catch((err)=>{
      alert(err)
    })



    AsyncStorage.getItem('cart').then((cart)=>{
      if (cart !== null) {
        // We have data!!
        const cartfood = JSON.parse(cart)
       
        console.log(cartfood)
        this.setState({cartconfirmado:cartfood})
       
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
        email:e.correo,
        datos_vacio:false,
       total:this.props.navigation.getParam('productos'),
       // direccion:this.props.navigation.getItem('direccionTienda')
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

metodotienda = async() =>{
  this.setState({ visible: !this.state.visible });
  var that = this;
  let enviotienda = {
    datoscliente:{
      nombre:this.state.nombre,
      telefono:this.state.telefono,
      email:this.state.email,
    },
    datostienda:{
      id_tienda:this.state.id_tienda,
      nombretienda:this.state.nombretienda
    },
    pedido:this.state.cartconfirmado,
    total:this.state.total,
    tipo:"Recoger en tienda"
  }


  var that = this;
  var url ="http://markettux.sattlink.com/api/recursos/store";
  fetch(url,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(enviotienda)
    }).then(function (response) {
      return response.json();
    }).then(function (result) { 
      // console.log(result);
      if(!result.error){
     
                  that.setState({ visible: false });
                    Alert.alert(result.message);
                    that.props.navigation.navigate('Finalizar');
                    //Toast.showWithGravity(result.message, Toast.LONG, Toast.CENTER);
   }else{
   // Alert.alert(result.error_msg);
    console.log(result);
}
}).catch(function (error) {
console.log("-------- error ------- "+error);
alert("result:"+error)
});



  console.log(JSON.stringify(enviotienda))
}
metododomicio= async () =>{
  this.setState({ visible: !this.state.visible });
  var that = this;
  let enviotienda = {
    datoscliente:{
      nombre:this.state.nombre,
      telefono:this.state.telefono,
      email:this.state.email,
      direccion:this.state.direccion,
      cruzamientos:this.state.cruzamientos,
      referencias:this.state.referencias,
      colonia:this.state.colonia
    },
    datostienda:{
      id_tienda:this.state.id_tienda,
      nombretienda:this.state.nombretienda
    },
    pedido:this.state.cartconfirmado,
    total:this.state.total,
    tipo:"Servicio a domicilio"
  }

  var that = this;
  var url ="http://markettux.sattlink.com/api/recursos/storedomicilio";
  fetch(url,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(enviotienda)
    }).then(function (response) {
      return response.json();
    }).then(function (result) { 
       console.log(result);
      if(!result.error){
                    that.setState({ visible: false });
                    Alert.alert(result.message);
                    that.props.navigation.navigate('Finalizar');
                    //Toast.showWithGravity(result.message, Toast.LONG, Toast.CENTER);
   }else{
   // Alert.alert(result.error_msg);
    console.log(result);
}
}).catch(function (error) {
console.log("-------- error ------- "+error);
alert("result:"+error)
});



  console.log(JSON.stringify(enviotienda))

}


  render() {
    const buttons = ['Pasar a la tienda', 'Servicio a domicilio']
  const { selectedIndex } = this.state
  this.retrieveData();
 //this.recargarDatostienda();
  //console.log(this.state.direccionTienda)
    //console.log(selectedIndex);  al primer view se le tiene que agregar esto --> alignItems: 'center'
    return (
      <ScrollView>
      <View style={{flex:1, justifyContent: 'flex-start',  borderRadius:20, paddingVertical:20, backgroundColor:'white'}}>
      <AnimatedLoader 
        visible={this.state.visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../../res/3321-shipment.json")}
        animationStyle={styles.lottie}
        speed={1}
        
      />
       
          <View style={ styles.productRow} >
         { this.state.cartconfirmado.map((item,i)=>{
                   return(

                    <View style={{ marginBottom:10, flexDirection:"row",justifyContent:"space-evenly"}}>
                      <View style={{ flex:1, }}><Text style={{ textAlign:"left", fontSize:19}}>{item.food.titulo}</Text></View>
                      <View style={{flex:1,flex:2}}></View>
                     
                      <View style={{flex:1,  }}><Text style={{ textAlign:"right", fontSize:19}}>${item.precio*item.quantity}</Text></View>
                    </View>
                   
          
                     
                 )
            })
          }
            <View style={{height:3, backgroundColor:"#000000",  top:0, left:0, right:0, borderBottomRightRadius:0}}/>
            <View style ={{ marginTop:10, alignSelf:"baseline", flexDirection:"row"}}>
              <Text style={{textAlign:"left", fontSize:19}}>Total</Text>
              <View style={{ flex:1, flex:2}}></View>
              <Text style={{textAlign:"right", fontSize:19}}>${this.state.total}</Text>
            </View>
          </View>
         
          
          <View style={{marginTop:15, marginBottom:10}}>
          <Text style={{fontSize:23,fontWeight:"bold",color:"#000000", alignSelf:"center"}}>Selecciona un método de entrega</Text>
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
            <View>
            <Text style={styles.description}> <Icon
            name="location-city"
           
            size={45}
            color="oracle"
          
          /> </Text>
          <Text style={styles.description}>Retirar a nombre de: {this.state.nombre}</Text>
          <Text style={styles.description}> en:</Text>
          <Text style={styles.description}> {this.state.direccionTienda}</Text>
          <Text style={styles.description}>Telefono de contacto</Text>
          <Text style={styles.description}>{this.state.telefonoTienda}</Text>
          <View style={styles.productRow}>
                            <View style={{height:3, backgroundColor:"#000000",  top:0, left:0, right:0, borderBottomRightRadius:0}}/>
                          </View>

                         <Text style={styles.tituloMetodo}>Metodo de pago </Text>

                         <Text style={styles.tituloMetodo}> Efectivo </Text>

                          <View style={styles.productRow}>
                                <Button
                                  buttonStyle={{ backgroundColor:'#f9aa34'}}
                                    icon={
                                      <Icon2
                                      name="md-checkmark-circle"
                                      size={25}
                                      color="white"
                                      //style={{marginStart:20}}
                                      />
                                          }
                                title="  Finalizar"
                                onPress= {this.metodotienda} 
                                />
                          </View>
          </View>
          :
            this.state.selectedIndex == 1 &&
            <View>  
                           
                             <Text style={styles.description}> <Icon
                                name="local-shipping"
                               
                                size={45}
                                color="oracle"
                              
                              /> </Text>
                              <Text style={styles.description}>  
                              Se te enviará en la siguiente dirección:</Text>
                           
                          <Text style={styles.description}>A nombre de: {this.state.nombre}</Text>
                          <Text style={styles.description}>Dirección: {this.state.direccion}  </Text>
                          <Text style={styles.description}>Cruzamientos: {this.state.cruzamientos}  </Text>
                          <Text style={styles.description}>Referencias: {this.state.referencias}  </Text>
                          <Text style={styles.description}>Colonia: {this.state.colonia}  </Text>
                          <Text style={styles.description}>Teléfono: {this.state.telefono}  </Text>
                          
                          <Text style={styles.info} onPress={()=>this.props.navigation.navigate('EditPerfil')}>Modificar datos</Text>
                          <View style={styles.productRow}>
                            <View style={{height:3, backgroundColor:"#000000",  top:0, left:0, right:0, borderBottomRightRadius:0}}/>
                          </View>

                         <Text style={styles.tituloMetodo}> Metodo de pago </Text>

                         <Text style={styles.tituloMetodo}> Efectivo </Text>

                          <View style={styles.productRow}>
                                <Button
                                  buttonStyle={{ backgroundColor:'#f9aa34'}}
                                    icon={
                                      <Icon2
                                      name="md-checkmark-circle"
                                      size={25}
                                      color="white"

                                      //style={{marginStart:20}}
                                      />
                                          }
                                title="  Finalizar"
                                loading={this.state.cargando?true:false}
                                onPress= {this.metododomicio} 
                                />
                          </View>
             </View>
 
          }
          </View>
      </View>
      </ScrollView>
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
    fontSize:20,
    color: "blue",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },

  productRow: {
    marginTop: 20,
    marginLeft:10,
    marginRight:10,
   
  },
  tituloMetodo:{
    textAlign:"center",
    fontSize:22,
    color:"black",
    fontWeight:"bold",
    marginTop:5,
  },
  lottie: {
    width: 220,
    height: 220,
    aspectRatio:4
  }
});
