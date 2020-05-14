/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import { Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  NativeModules, 
  RefreshControl
} from 'react-native';
var {height, width } = Dimensions.get('window');
// import AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';
// import icons
import Icon from 'react-native-vector-icons/Ionicons';
//swiper
import Swiper from 'react-native-swiper'

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

//animacion al cargar vista
import AnimatedLoader from "react-native-animated-loader";

const UIManager = NativeModules.UIManager;
export default class app extends Component {
  constructor(props)
  {
    super(props);
   // const { params } = this.props.navigation.state;

    this.state = {
      dataBanner: this.props.navigation.getParam('bannert'),
      dataCategories: this.props.navigation.getParam('categorias'),
      dataFood:this.props.navigation.getParam('productos'),
      selectCatg:0,
      refreshing: false,
      visible:true
    }
    
   // this.GetData();
  }
  GetData = () => {
    //Service to get the data from the server to render
   /**  const url = "http://tutofox.com/foodapp/api.json"
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      //   console.log(responseJson);
      this.setState({
        refreshing:false,
        isLoading: false,
        dataBanner: responseJson.banner,
        dataCategories: responseJson.categories,
        dataFood:responseJson.food
        
      });
      

    })
    .catch((error) =>{
      console.error(error);
    });
    */
   const { params } = this.props.navigation.state;

   this.setState({
    refreshing:false,
    
    dataBanner: this.props.navigation.getParam('bannert'),
    dataCategories: this.props.navigation.getParam('categorias'),
    dataFood:this.props.navigation.getParam('productos'),
   // visible: false
    
  });
  };
 
 
   static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;
    return{title: 'Carrito',
    headerRight:(<Icon name="md-cart" size={30} style={{margin:23}} color= 'white' onPress={() => navigation.navigate('Carrito')}/>),
      //headerRight:(<Button onPress={() => setCount(c => c + 1)} title="Update count" />)
    headerLeft: (
        <Icon
        name="md-arrow-back"
        size={30}
        color="white"
        style ={{margin:20}}
        onPress={() => params.regresar()}
        //onPress={()=> navigation.navigate('Home')}  AsyncStorage.removeItem('cart')
        
          //title="Info"
          //color="#fff"
        />)}
    
    }

    _regresar = () => {
     // alert('funciones');
     AsyncStorage.removeItem('cart');
     this.props.navigation.navigate('Home'); 
    
    }
  componentDidMount(){
    this.props.navigation.setParams({ regresar: this._regresar.bind(this)  });
    setInterval(() => {
      this.setState({
        visible: false
      });
    }, 1500);
  }
  onRefresh() {
    //Clear old data of the list
    this.setState({ dataBanner:[],
      dataCategories:[],
      dataFood:[],});
    //Call the Service to get the latest data
    this.GetData();
  }
  render() {
    //console.log(this.state.dataFood);
     
    return (
     
      <ScrollView  refreshControl={
        <RefreshControl
          //refresh control used for the Pull to Refresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
          //progressBackgroundColor='white'
         
          colors={['#f2682a', '#00ff00', '#0000ff']}
        />
      }>
         <AnimatedLoader 
        visible={this.state.visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../../res/lo-cart.json")}
        animationStyle={styles.lottie}
        speed={1}
        
      />
      <View style={{ flex: 1,backgroundColor:"#f2f2f2" }}>
        <View style={{width: width, alignItems:'center'}} >
        <Text style={styles.titleCatg}></Text>
           
              <Swiper style={{height:width/2}}  showsButtons={false} autoplay={true} autoplayTimeout={2}>
                {
                  this.state.dataBanner.map((itembann)=>{
                    return(
                      <Image style={styles.imageBanner} resizeMode="contain" source={{uri:itembann.img_url}}/>
                    )
                  })
                }
              </Swiper>
            <View style={{height:20}} />
        </View>

        <View style={{width:width, borderRadius:20, paddingVertical:20, backgroundColor:'white'}}>
          <Text style={styles.titleCatg}>Categorias {this.state.selectCatg}</Text>
          <FlatList
            horizontal={true}
            data={this.state.dataCategories}
            renderItem={({ item }) => this._renderItem(item)}
            keyExtractor = { (item,index) => index.toString() }
           
          />
           <FlatList
              //horizontal={true}
              data={this.state.dataFood}
              numColumns={2}
              renderItem={({ item }) => this._renderItemFood(item)}
              keyExtractor = { (item,index) => index.toString() }
              
            />
          
          <View style={{height:20}} />
         
            
        </View>
       

      </View>
    </ScrollView>
    );
    

    
//pegar aqui codigo que esta en el bloc de notas

  }



  _renderItem(item){
    return(
      <TouchableOpacity style={[styles.divCategorie,{backgroundColor:item.color}]}
      onPress={()=>this.setState({selectCatg:item.id})}>
        <Image
          style={{width:100,height:80}}
          resizeMode="contain"
          source={{uri : item.url_foto}} />
        <Text style={{fontWeight:'bold',fontSize:22}}>{item.titulo}</Text>
      </TouchableOpacity>
    )
  }
  
_renderItemFood(item){
  let catg = this.state.selectCatg 
  if(catg==0||catg==item.id_categoria)
  {
    return(
      <TouchableOpacity style={styles.divFood}>
        <Image
          style={styles.imageFood}
          resizeMode="contain"
          source={{uri:item.url_foto}} />
          <View style={{height:((width/2)-20)-90, backgroundColor:'transparent', width:((width/2)-20)-10}} />
          <Text style={{fontWeight:'bold',fontSize:22,textAlign:'center'}}>
            {item.titulo}
          </Text>
          <Text>{item.descripcion}</Text>
          <Text style={{fontSize:20,color:"green"}}>${item.precio}</Text>
          <TouchableOpacity
            onPress={()=>this.onClickAddCart(item)}
            style={{
              width:(width/2)-40,
              backgroundColor:'#33c37d',
              flexDirection:'row',
              alignItems:'center',
              justifyContent:"center",
              borderRadius:5,
              padding:4
            }}>
            <Text style={{fontSize:12, color:"white", fontWeight:"bold"}}>Agregar carrito</Text>
            <View style={{width:10}} />
            <Icon name="ios-add-circle" size={15} color={"white"} />
          </TouchableOpacity>
        </TouchableOpacity>
        
      )
  }
}




onClickAddCart(data){

  const itemcart = {
    
    food: data,
    quantity:  1,
    precio: data.precio
  }

//console.log(data)
  AsyncStorage.getItem('cart').then((datacart)=>{
      if (datacart !== null) {
        
        // We have data!!
        const cart = JSON.parse(datacart)
        

       // cart.push(itemcart)
        //console.log (JSON.stringify(cart))
       /* cart.map((info,i) => {
          return console.log(info)
         })
         */

         function encontrar(object, nombre){
           var arr = [];
           for (var i in object){
             console.log(arr.push(object[i].food.titulo));
            console.log(object[i].food.titulo);
           }
           return arr.indexOf(nombre) >-1;
         }
         var x  = encontrar(cart,data.titulo);
         if(x ===true){
          alert("Ya lo agregaste al carrito")
          console.log("encontrado");
         }else{
          cart.push(itemcart)
          console.log("no encontrado");
          alert("Se agrego al carrito")
         }
        AsyncStorage.setItem('cart',JSON.stringify(cart));
      }
      else{
        const cart  = []
        cart.push(itemcart)
        AsyncStorage.setItem('cart',JSON.stringify(cart));
        alert("Se agrego al carrito")
      }
    
    })
    .catch((err)=>{
      alert(err)
    })
}
}






const styles = StyleSheet.create({
  imageBanner: {
    height:width/2,
    width:width-40,
    borderRadius:10,
    marginHorizontal:20
  }, 
  divCategorie:{
    backgroundColor:'red',
    margin:5, alignItems:'center',
    borderRadius:10,
    padding:10
  },
  titleCatg:{
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:10
  },
  imageFood:{
    width:((width/2)-20)-10,
    height:((width/2)-20)-30,
    backgroundColor:'transparent',
    position:'absolute',
    top:-45
  },
  divFood:{
    width:(width/2)-20,
    padding:10,
    borderRadius:10,
    marginTop:55,
    marginBottom:5,
    marginLeft:10,
    alignItems:'center',
    elevation:8,
    shadowOpacity:0.3,
    shadowRadius:50,
    backgroundColor:'white',
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  horizontal1: {
    alignContent:'center',
    
    justifyContent: "center",
    padding: 10
  },
  lottie: {
    width: 220,
    height: 220,
    aspectRatio:4
  }

});

