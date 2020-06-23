import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
 ScrollView,
 } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Fontisto';

import AsyncStorage from '@react-native-community/async-storage';




export default class ProductDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foto: this.props.navigation.getParam('fotoitem'),
      descripcion: this.props.navigation.getParam('descripcion'),
      precio: this.props.navigation.getParam('precio'),
      titulo: this.props.navigation.getParam('titulo'),
      datos: this.props.navigation.getParam('datos'),
      cantidad: 1,

    }

  }


  /*static navigationOptions = ({navigation}) => {
    that =this;
   const { params = {} } = navigation.state;
   return{
    
    title: params.titulo,
    headerRight: () => (
      <View style={{flexDirection:"row"}}>
        
      <TouchableOpacity underlayColor="white" onPress={() => navigation.navigate('Carrito')} ><View>
       <Icon name="md-cart" size={30} style={{marginRight:20}} color= 'white'  />
       </View></TouchableOpacity>
      </View>
    ),
   }
  }*/
  clickEventListener() {
    //Alert.alert("Success", "Product has beed added to cart")
    this.onClickAddCart(this.state.datos)
  }

  componentDidMount() {
    this.props.navigation.setParams({ titulo: this.state.titulo });
  }


  onClickAddCart(data) {

    const itemcart = {

      food: data,
      quantity: this.state.cantidad,
      precio: data.precio
    }

    //console.log(data)
    AsyncStorage.getItem('cart').then((datacart) => {
      if (datacart !== null) {

        // We have data!!
        const cart = JSON.parse(datacart)


        // cart.push(itemcart)
        //console.log (JSON.stringify(cart))
        /* cart.map((info,i) => {
           return console.log(info)
          })
          */

        function encontrar(object, nombre) {
          var arr = [];
          for (var i in object) {
            console.log(arr.push(object[i].food.titulo));
            console.log(object[i].food.titulo);
          }
          return arr.indexOf(nombre) > -1;
        }
        var x = encontrar(cart, data.titulo);
        if (x === true) {
          Alert.alert("Ya lo agregaste al carrito")
          console.log("encontrado");
        } else {
          cart.push(itemcart)
          console.log("no encontrado");
          Alert.alert("Se agrego al carrito")
        }
        AsyncStorage.setItem('cart', JSON.stringify(cart));
      }
      else {
        const cart = []
        cart.push(itemcart)
        AsyncStorage.setItem('cart', JSON.stringify(cart));
        Alert.alert("Se agrego al carrito")
      }

    })
      .catch((err) => {
        alert(err)
      })
  }


  onChangeQual = async (i, type) => {
    //const dataCar = this.state.cantidad
    let cantd = this.state.cantidad

    if (type) {
      cantd = cantd + 1

      this.setState({ cantidad: cantd })
      console.log(" mas dos items");
      //AsyncStorage.setItem('cart',JSON.stringify(dataCar));
    }
    else if (type == false && cantd >= 2) {
      cantd = cantd - 1
      //dataCar[i].quantity = cantd
      this.setState({ cantidad: cantd })
      console.log("dos items");
      //AsyncStorage.setItem('cart',JSON.stringify(dataCar));
    }
    else if (type == false && cantd == 1) {
      //dataCar.splice(i,1)
      this.setState({ cantidad: 1 })


      //console.log(dataCar);
      //AsyncStorage.setItem('cart',JSON.stringify(dataCar));
    }


  }



  render() {
    //this.onChangeQual()
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
            <Image style={styles.productImg} source={{ uri: this.state.foto }} />
            <Text style={styles.name}>{this.state.titulo}</Text>
            <Text style={styles.price}>$ {this.state.precio}</Text>
            <Text style={styles.description}>
              {this.state.descripcion}
            </Text>
          </View>
          <View style={styles.starContainer}>

          </View>
          <View style={styles.contentSize}>


          </View>
          <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.onChangeQual(this.state.cantidad, false)}>
                <Icon name="ios-remove-circle" size={35} color={"#f9aa34"} />
              </TouchableOpacity>
              <Text style={{ paddingHorizontal: 8, fontWeight: 'bold', fontSize: 18 }}>{this.state.cantidad}</Text>
              <TouchableOpacity onPress={() => this.onChangeQual(this.state.cantidad, true)} >
                <Icon name="ios-add-circle" size={35} color={"#f9aa34"} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={() => this.clickEventListener()}>
              <Text style={styles.shareButtonText}>Agregar al carrito</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator}></View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productImg: {
    width: 300,
    height: 250,
    resizeMode: 'contain'
  },
  name: {
    fontSize: 30,
    color: "#696969",
    fontWeight: 'bold'
  },
  price: {
    marginTop: 10,
    fontSize: 25,
    color: "orange",
    fontWeight: 'bold'
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: "#696969",
  },
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
  },
  contentSize: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginHorizontal: 30
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "orange",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30
  }
});     