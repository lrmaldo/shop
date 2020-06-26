import React, { Component } from 'react';
import {
  Text, View,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Fontisto';
import { Button } from 'react-native-elements'

import Toast from 'react-native-simple-toast';
import AnimatedLoader from 'react-native-animated-loader';
export default class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      selectedIndex: 0,

      nombre: "",
      correo: "",
      direccion: "",
      cruzamientos: "",
      referencias: "",
      colonia: "",
      telefono: "",
      email: "",
      datos_vacio: true,
      cartconfirmado: [],
      id_tienda: this.props.navigation.getParam('id_tienda'),
      nombretienda: this.props.navigation.getParam('nombre'),
      direccionTienda: this.props.navigation.getParam('direccionT'),
      telefonoTienda: this.props.navigation.getParam('telefonot'),
      fotoT:this.props.navigation.getParam('fotot'),
      lat: this.props.navigation.getParam('lat'),
      long: this.props.navigation.getParam('long'),
      visible: false,
      total: this.props.navigation.getParam('total'),
      botonactivo: true,



    };
    this.updateIndex = this.updateIndex.bind(this)

  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }



  componentDidMount() {

    AsyncStorage.getItem('cart').then((cart) => {
      if (cart !== null) {
        // We have data!!
        const cartfood = JSON.parse(cart)

        console.log(cartfood)
        this.setState({ cartconfirmado: cartfood })

      }
    })
      .catch((err) => {
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
          nombre: e.nombre,
          correo: e.correo,
          direccion: e.direccion,
          cruzamientos: e.cruzamientos,
          referencias: e.referencias,
          colonia: e.colonia,
          telefono: e.telefono,
          email: e.correo,
          datos_vacio: false,
          total: this.props.navigation.getParam('total'),
          datos_vacio: false,
          botonactivo: false
          // direccion:this.props.navigation.getItem('direccionTienda')
        })



        //console.log(this.state.datos_vacio);
      } else {
        this.setState({
          datos_vacio: true,
          botonactivo: true
        })
      }


    } catch (e) {
      Toast.showWithGravity("Ocurrio un problema", Toast.LONG, Toast.CENTER);
    }
  }

  metodotienda = async () => {
    this.setState({ visible: !this.state.visible });
    var that = this;
    let enviotienda = {
      datoscliente: {
        nombre: this.state.nombre,
        telefono: this.state.telefono,
        email: this.state.email,
      },
      datostienda: {
        id_tienda: this.state.id_tienda,
        nombretienda: this.state.nombretienda
      },
      pedido: this.state.cartconfirmado,
      total: this.state.total,
      tipo: "Recoger en tienda"
    }


    var that = this;
    var url = "http://markettux.sattlink.com/api/recursos/store";
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enviotienda)
    }).then(function (response) {
      return response.json();
    }).then(function (result) {
      // console.log(result);
      if (!result.error) {

        that.setState({ visible: false });
        that.guardarPedido("Recoger en tienda");// guardar pedido en el modulo del usuario "mis pedidos"
        that.props.navigation.navigate('Finalizar', {
          tipo: true, nombretienda: that.state.direccionTienda,
          lat: that.state.lat, long: that.state.long
        });
        //Toast.showWithGravity(result.message, Toast.LONG, Toast.CENTER);
      } else {
        // Alert.alert(result.error_msg);
        //console.log(result);
      }
    }).catch(function (error) {
      console.log("-------- error ------- " + error);
      that.setState({ visible: false });
      Toast.showWithGravity("Ocurrio un problema", Toast.LONG, Toast.CENTER);

    });



    console.log(JSON.stringify(enviotienda))
  }
  metododomicio = async () => {
    this.setState({ visible: !this.state.visible });
    var that = this;
    let enviotienda = {
      datoscliente: {
        nombre: this.state.nombre,
        telefono: this.state.telefono,
        email: this.state.email,
        direccion: this.state.direccion,
        cruzamientos: this.state.cruzamientos,
        referencias: this.state.referencias,
        colonia: this.state.colonia
      },
      datostienda: {
        id_tienda: this.state.id_tienda,
        nombretienda: this.state.nombretienda
      },
      pedido: this.state.cartconfirmado,
      total: this.state.total,
      tipo: "Servicio a domicilio"
    }

    var that = this;
    var url = "http://markettux.sattlink.com/api/recursos/storedomicilio";
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enviotienda)
    }).then(function (response) {
      return response.json();
    }).then(function (result) {
      console.log(result);
      if (!result.error) {
       
        that.setState({ visible: false });
        //Alert.alert(result.message);
        that.guardarPedido("Servicio a domicilio");
        that.props.navigation.navigate('Finalizar', { tipo: false });
        //Toast.showWithGravity(result.message, Toast.LONG, Toast.CENTER);
      } else {
        // Alert.alert(result.error_msg);
        console.log(result);
      }
    }).catch(function (error) {
      console.log("-------- error ------- " + error);
      that.setState({ visible: false });
      Toast.showWithGravity("Ocurrio un problema", Toast.LONG, Toast.CENTER);

    });



    console.log(JSON.stringify(enviotienda))

  }

  guardarPedido(tipos){
    ///este metodo sirve para guardar el pedido 
   // console.log(this.state.nombre)
var that = this;
   let newpedido =  {
    datoscliente: {
      nombre: that.state.nombre,
      telefono: that.state.telefono,
      email: that.state.email,
      direccion: that.state.direccion,
      cruzamientos: that.state.cruzamientos,
      referencias: that.state.referencias,
      colonia: that.state.colonia
    },
    datostienda: {
      id_tienda: that.state.id_tienda,
      nombretienda: that.state.nombretienda,
      fotourl:that.state.fotoT,
      direccionTienda:that.state.direccionTienda,
      telefonot:that.state.telefonoTienda,
      lat:that.state.lat,
      long:that.state.long
    },
    pedido: that.state.cartconfirmado,
    total: that.state.total,
    tipo: tipos,
    fecha: Date.now()
  }
    AsyncStorage.getItem('mispedidos').then((pedidos) => {
      if (pedidos !== null) {
        // We have data!!
        const data_pedidos = JSON.parse(pedidos)

        //console.log(data_pedidos)
         
        data_pedidos.push(newpedido)
        AsyncStorage.setItem('mispedidos', JSON.stringify(data_pedidos));

      }else{
        console.log("no se encontro")
        const pedido = []
        //console.log(JSON.stringify(pedido))
        pedido.push(newpedido)
        AsyncStorage.setItem('mispedidos', JSON.stringify(pedido));
      }
      
    })
      .catch((err) => {
       // alert(err)
       console.log(err)
      })
  }


  render() {
    const buttons = ['Pasar a la tienda', 'Servicio a domicilio']
    const { selectedIndex } = this.state
  
    this.retrieveData();
    
    //console.log(selectedIndex);  al primer view se le tiene que agregar esto --> alignItems: 'center'
    return (
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'flex-start', borderRadius: 20, paddingVertical: 20, backgroundColor: 'white' }}>
          <AnimatedLoader
            visible={this.state.visible}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("../../res/3321-shipment.json")}
            animationStyle={styles.lottie}
            speed={1}

          />

          <View style={styles.productRow} >
            {this.state.cartconfirmado.map((item, i) => {
              return (

                <View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-evenly" }}>
                  <View style={{ flex: 1, }}><Text style={{ textAlign: "left", fontSize: 19 }}>{item.food.titulo}</Text></View>


                  <View style={{ flex: 1, }}><Text style={{ textAlign: "right", fontSize: 19 }}>${item.precio * item.quantity}</Text></View>
                </View>



              )
            })
            }
            <View style={{ height: 3, backgroundColor: "#000000", top: 0, left: 0, right: 0, borderBottomRightRadius: 0 }} />
            <View style={{ marginTop: 10, alignSelf: "baseline", flexDirection: "row" }}>
              <Text style={{ textAlign: "left", fontSize: 19 }}>Total</Text>
              <View style={{ flex: 1, flex: 2 }}></View>
              <Text style={{ textAlign: "right", fontSize: 19 }}>${this.state.total}</Text>
            </View>
          </View>


          <View style={{ marginTop: 15, marginBottom: 10 }}>
            <Text style={{ fontSize: 23, fontWeight: "bold", color: "#000000", alignSelf: "center" }}>Selecciona un método de entrega</Text>
          </View>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={styles.containerStyle}
            buttonStyle={styles.buttonStyle}
            selectedButtonStyle={styles.selectedButtonStyle}
            innerBorderStyle={{ width: 0, color: "white" }}
            containerBorderRadius={0}
            underlayColor={"gray"}

          // buttonStyle={{ backgroundColor :"#f4511e"}}
          />
          <View>
            {this.state.selectedIndex == 0 ?
              <View>
                <Text style={styles.description}> <Icon3
                  name="shopping-store"

                  size={38}
                  color="oracle"

                /> </Text>

                {this.state.datos_vacio ?
                  <View><Text style={styles.description}>No encontramos tu datos para </Text>
                    <Text style={styles.description}>poder enviarle al vendedor</Text>
                    <Text style={styles.info} onPress={() => this.props.navigation.navigate('EditPerfil')} >Ingresalo aquí</Text>

                  </View>
                  :
                  <View>
                    <Text style={styles.description}>Retirar a nombre de: {this.state.nombre}</Text>
                    <Text style={styles.description}> en:</Text>
                    <Text style={styles.description}> {this.state.direccionTienda}</Text>
                    <Text style={styles.description}>Telefono de contacto</Text>
                    <Text style={styles.description}>{this.state.telefonoTienda}</Text>
                    <Text style={styles.info} onPress={() => this.props.navigation.navigate('EditPerfil')} >Editar nombre</Text>
                  </View>
                }

                <View style={styles.productRow}>
                  <View style={{ height: 3, backgroundColor: "#000000", top: 0, left: 0, right: 0, borderBottomRightRadius: 0 }} />
                </View>

                <Text style={styles.tituloMetodo}>Metodo de pago </Text>

                <Text style={styles.tituloMetodo}> Efectivo </Text>

                <View style={styles.productRow}>
                  <Button
                    //disabled={true}
                    buttonStyle={{ backgroundColor: '#f9aa34' }}
                    icon={
                      <Icon2
                        name="md-checkmark-circle"
                        size={25}
                        color="white"

                      //style={{marginStart:20}}
                      />
                    }
                    title="  Finalizar"
                    disabled={this.state.botonactivo ? true : false}
                    onPress={this.metodotienda}
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
                {this.state.datos_vacio ?
                  <View>
                    <Text style={styles.description}>No encontramos tu datos para </Text>
                    <Text style={styles.description}>poder enviarle al vendedor</Text>
                    <Text style={styles.info} onPress={() => this.props.navigation.navigate('EditPerfil')} >Ingresalo aquí</Text>
                  </View>
                  :
                  <View>
                    <Text style={styles.description}>
                      Se te enviará en la siguiente dirección:</Text>

                    <Text style={styles.description}>A nombre de: {this.state.nombre}</Text>
                    <Text style={styles.description}>Dirección: {this.state.direccion}  </Text>
                    <Text style={styles.description}>Cruzamientos: {this.state.cruzamientos}  </Text>
                    <Text style={styles.description}>Referencias: {this.state.referencias}  </Text>
                    <Text style={styles.description}>Colonia: {this.state.colonia}  </Text>
                    <Text style={styles.description}>Teléfono: {this.state.telefono}  </Text>

                    <Text style={styles.info} onPress={() => this.props.navigation.navigate('EditPerfil')}>Modificar datos</Text>
                  </View>
                }

                <View style={styles.productRow}>
                  <View style={{ height: 3, backgroundColor: "#000000", top: 0, left: 0, right: 0, borderBottomRightRadius: 0 }} />
                </View>

                <Text style={styles.tituloMetodo}> Metodo de pago </Text>

                <Text style={styles.tituloMetodo}> Efectivo </Text>

                <View style={styles.productRow}>
                  <Button
                    buttonStyle={{ backgroundColor: '#f9aa34' }}
                    icon={
                      <Icon2
                        name="md-checkmark-circle"
                        size={25}
                        color="white"

                      //style={{marginStart:20}}
                      />
                    }
                    title="  Finalizar"
                    disabled={this.state.botonactivo ? true : false}
                    loading={this.state.cargando ? true : false}
                    onPress={this.metododomicio}
                   //onPress={this.guardarPedido.bind(this)}
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
    backgroundColor: "gray",
  },
  info: {
    textAlign: 'center',
    fontSize: 20,
    color: "blue",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },

  productRow: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,

  },
  tituloMetodo: {
    textAlign: "center",
    fontSize: 22,
    color: "black",
    fontWeight: "bold",
    marginTop: 5,
  },
  lottie: {
    width: 220,
    height: 220,
    aspectRatio: 4
  }
});
