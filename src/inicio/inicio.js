/**
 * Sample React Native App
 * https://github.c m/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, } from 'react';
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  StatusBar,
  ActivityIndicator,
  RefreshControl,

  Alert,
  
} from 'react-native';
var { height, width } = Dimensions.get('window');
// import AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';
// import icons
import Icon from 'react-native-vector-icons/Ionicons';
//swiper


import SafeAreaView from 'react-native-safe-area-view';



//swiper
import Swiper from 'react-native-swiper'

import SwiperFlatList from 'react-native-swiper-flatlist';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

//imagen fast 
import FastImage from 'react-native-fast-image'
import { isEmptyArray } from 'formik';


export default class app extends Component {



  constructor(props) {
    super(props);
    this.page = 1;
    //this.onEndReachedCalledDuringMomentum= true;
    this.state = {
      isLoading: true,
      loading: false,// cargar lista de paginacion
      dataBanner: [],
      dataCategories: [],
      dataFood: [],
      selectCatg: 0,
      visible: false,
      refreshing: true,
      icon: null,
      hasScrolled: false,
      dataaux: []
    }
    this.GetData1(this.page);
  }

  _menu = null;

  setMenuRef = ref => {

    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
    this.props.navigation.navigate("Contactanos")


  };
  terminos = () => {

    this._menu.hide();
    this.props.navigation.navigate("Terminos")
  }

  info = () => {
    this._menu.hide();
    this.props.navigation.navigate("Info")
  }
  showMenu = () => {
    //return(<acerca></acerca>)
    this._menu.show();

  };


  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle:()=>( <Image
        source={require('./../../image/MarkettuxB.png')}
        style={{ width: 180, height: 40 }}
      />),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity underlayColor="black" onPress={params.showMenu} style={{
            height: 25,
            width: 25, marginRight: 10, borderRadius: 25
          }} ><View>
              <Menu
                ref={params.setMenuRef}
                button={<Icon name="md-more" size={30} color='white' />}
              >
                <MenuItem onPress={params.hideMenu}>Contáctanos</MenuItem>
                <MenuItem onPress={params.terminos}>Politicas de privacidad</MenuItem>
                <MenuItem onPress={params.info} >
                  Info de la aplicación
      </MenuItem>
                <MenuDivider />

              </Menu>
            </View></TouchableOpacity>
        </View>
      )
      ,
      //headerRight:(<Button onPress={() => setCount(c => c + 1)} title="Update count" />)


    }

  }



  _qmenu = () => {




  }
  onRef = icon => {
    //calback with icon component as reference

    if (!this.state.icon) {
      this.setState({ icon })
    }
  }


  GetData = () => {
    // AsyncStorage.removeItem('cart');
    //Service to get the data from the server to render
    const url = "http://markettux.sattlink.com/api/recursos?page=1";
    // this.setState({ loading: true })
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        // console.log(responseJson);
        this.setState({
          // isLoading: true,
          dataBanner: responseJson.data.bannerP,
          dataCategories: responseJson.data.giro,
          dataFood: responseJson.data.tiendas,
          refreshing: false,
          loading: false,
        });

      })
      .catch((error) => {
        Alert.alert("","Ocurrio un problema con el servidor intentalo más tarde")
        this.setState({
          refreshing: false,
          loading: false,
        }) 
      });

  };
  GetData1 = (page) => {
    // AsyncStorage.removeItem('cart');
    //Service to get the data from the server to render

    const url = `http://markettux.sattlink.com/api/recursos?page=${page}`;
    //const url =`http://markettux.sattlink.com/api/recursos?page=21`;
     console.log(page)
     //console.log(this.state.dataFood)
    this.setState({ loading: true })
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        var listData = this.state.dataFood;
        var data = listData.concat(responseJson.data.tiendas);
       var dataaux = responseJson.data.tiendas;
        // console.log(listData);
        this.setState({
          // isLoading: true,
          dataBanner: responseJson.data.bannerP,
          dataCategories: responseJson.data.giro,
          dataFood: data,
          refreshing: false,
          loading: false,
          dataaux: dataaux

        });

      })
      .catch((error) => {
        //console.error(error);
        Alert.alert("","Ocurrio un problema con el servidor intentalo más tarde")
      });

  };

  componentWillMount() {
    this.props.navigation.setParams({
      showMenu: this.showMenu, setMenuRef: this.setMenuRef, hideMenu: this.hideMenu,
      terminos: this.terminos, info: this.info
    });

    AsyncStorage.removeItem('cart');
    AsyncStorage.removeItem('datostienda');
   // this.GetData();//carga los banners;
    //const url = "http://tutofox.com/foodapp/api.json"


  }

  onRefresh() {
    //Clear old data of the list
    this.setState({
      dataBanner: [],
      dataCategories: [],
      dataFood: [],
      selectCatg: 0
    });
    
    this.page = 1;
    //Call the Service to get the latest data
    this.GetData1(this.page)
    //this.GetData();
   

  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0,
          width: '100%',
          backgroundColor: '#CED0CE'
        }}
      />
    );
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.loading) return null;
    return (
      <ActivityIndicator
        size="small" color="#f2682a"
      />
    );
  };
  handleLoadMore = () => {
    // console.log("en el handle")
    //  if(!this.state.hasScrolled){ return null; }
    if (!this.state.loading) {
      this.page = this.page + 1; // increase page by 1

      this.GetData1(this.page); // method for API call 
      //this.setState({hasScrolled:false})
    }
  };

  onScroll = () => {
    //console.log("entro a onscroll")
    this.setState({ hasScrolled: true })
    this.handleLoadMore()
    //console.log("dentro de"+this.state.hasScrolled)
  }

  render() {
    const dhis = this
    let catg = this.state.selectCatg
    let dataaux = this.state.dataaux;
    console.log(dataaux)
    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        //loading view while data is loading
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#f2682a" />

        </View>
      );
    }
    return (

      <ScrollView refreshControl={
        <RefreshControl
          //refresh control used for the Pull to Refresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
          colors={['#f2682a', '#00ff00', '#0000ff']}

        />}
        //onScroll={console.log("scr")}
        //onMomentumScrollBegin={()=>{this.onScroll()}}!isEmptyArray(dataaux)? this.handleLoadMore.bind(this): null
        onMomentumScrollEnd={() => {if (catg == 0 ) {this.onScroll();}else{null} }} //descomentar esto
      //removeClippedSubviews={false}
      >

        <StatusBar barStyle="light-content" backgroundColor="#f4511e" />

        <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
          
          <View style={{ width: width, alignItems: 'center' }} >
            <Text style={styles.titleCatg}></Text>

            <Swiper style={{ height: width / 2 }} key={this.state.dataBanner.length} showsButtons={false} autoplay={true} autoplayTimeout={4}>
              {
                this.state.dataBanner.map((itembann) => {
                  return (
                    <Image style={styles.imageBanner} resizeMode="contain" source={{ uri: itembann.img_url }} />
                  )
                })
              }
            </Swiper>
            <View style={{ height: 20 }} />
          </View>
          <View style={{ width: width, borderRadius: 20, paddingVertical: 20, backgroundColor: 'white' }}>

            <Text style={styles.titleCatg}>Categorias</Text>

            <FlatList
              horizontal={true}
              data={this.state.dataCategories}
              renderItem={({ item }) => this._renderItem(item)}
              keyExtractor={(item, index) => index.toString()}

            />
            <FlatList
              //horizontal={true}
              data={catg== 0 ? this.state.dataFood: this.state.dataFood.filter((item) => {
                return item.id_giro.toLowerCase().match(catg)
              })}// busca el filtro de categorias si encuentra renderiza el flatlist
              numColumns={2}
              renderItem={({ item }) => this._renderItemFood(item)}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter.bind(this)}
              onEndReachedThreshold={0.5}
              onEndReached={catg !=0  && !isEmptyArray(dataaux)? this.handleLoadMore.bind(this): null}
            //onScroll={console.log("termino")}
            />

            <View style={{ height: 20 }} />


          </View>




        </SafeAreaView >
      </ScrollView>

    );


  }

  _renderItem(item) {

    return (
      <TouchableOpacity style={[styles.divCategorie, { backgroundColor: item.color }]}
        onPress={() => this.setState({ selectCatg: item.id })}>
        <Image
          style={{ width: 100, height: 80 }}
          resizeMode="contain"
          source={{ uri: item.img_url }} />
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{item.nombre}</Text>
      </TouchableOpacity>
    )
  }

  _renderItemFood(item) {
    // console.log(this.state.selectCatg);
    let catg = this.state.selectCatg
    //if (catg ) {
    //if (catg == 0 || catg == item.id_giro) {
      return (
        <TouchableOpacity style={styles.divFood} onPress={() => {
          AsyncStorage.removeItem('cart'); this.props.navigation.navigate('Tienda', {
            productos: item.productos, categorias: item.categorias, bannert: item.bannert,
            direccion: item.direccion, descripcion: item.descripcion,
            telefonoT: item.telefono, nombretienda: item.nombre,
            fotoTienda: item.foto_url, id_tienda: item.id,
            lat: item.lat,
            long: item.long
          })
        }}>

          <FastImage
            key={item.id}
            style={styles.imageFood}
            resizeMode={FastImage.resizeMode.contain}
            source={{
              uri: item.foto_url,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
            }}
          // defaultSource={{uri:item.foto_url}}
          />
          <View style={{ height: ((width / 2) - 20) - 90, backgroundColor: 'transparent', width: ((width / 2) - 20) - 10 }} />
          <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
            {item.nombre}
          </Text>
          <Text style={{ fontSize: 16, color: "black", textAlign: "center" }}>{item.descripcion.substr(0, 100)}...</Text>


        </TouchableOpacity>

      )
    //}
  }


  onClickAddCart(data) {

    const itemcart = {

      food: data,
      quantity: 1,
      price: data.price
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
            console.log(arr.push(object[i].food.name));
            console.log(object[i].food.name);
          }
          return arr.indexOf(nombre) > -1;
        }
        var x = encontrar(cart, data.name);
        if (x === true) {
          alert("Ya lo agregaste al carrito")
          console.log("encontrado");
        } else {
          cart.push(itemcart)
          console.log("no encontrado");
          alert("Se agrego al carrito")
        }
        AsyncStorage.setItem('cart', JSON.stringify(cart));
      }
      else {
        const cart = []
        cart.push(itemcart)
        AsyncStorage.setItem('cart', JSON.stringify(cart));
        alert("Se agrego al carrito")
      }

    })
      .catch((err) => {
        alert(err)
      })
  }
}




const styles = StyleSheet.create({
  imageBanner: {
    height: 180,
    width: width - 30,
    borderRadius: 10,
    // marginHorizontal: 20,
    marginLeft: 10,
    marginRight: 10,
    resizeMode: 'contain'

  },
  divCategorie: {
    backgroundColor: 'red',
    margin: 5, alignItems: 'center',
    borderRadius: 10,
    padding: 10
  },
  titleCatg: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  imageFood: {
    width: ((width / 2) - 20) - 10,
    height: ((width / 2) - 20) - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45
  },
  divFood: {
    width: (width / 2) - 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

/*

<Swiper style={{height:width/2}}  showsButtons={false} autoplay={true} autoplayTimeout={2}>
                {
                  this.state.dataBanner.map((itembann ,index)=>{
                    return(

                      <Image  key={index} style={styles.imageBanner} resizeMode="contain" source={{uri:itembann.img_url}}/>

                    )
                  })
                }
              </Swiper>



              <SwiperFlatList
               	autoplay
                 autoplayDelay={2}
                 autoplayLoop
                 index={0}
                 horizontal
                 removeClippedSubviews={false}
                //autoplayLoop
                data={this.state.dataBanner}
                renderItem={({ item }) => // Standard Image

                  <Image
                    source={{ uri: item.img_url }}
                    style={styles.imageBanner}
                  />


                }
                showPagination
                />
*/