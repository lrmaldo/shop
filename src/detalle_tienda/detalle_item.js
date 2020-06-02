import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  OverflowMenu,
  defaultOnOverflowMenuPress,
  OverflowMenuProvide
} from 'react-navigation-header-buttons';


const IoniconsHeaderButton = passMeFurther => (
  // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
  // and it is important to pass those props to `HeaderButton`
  // then you may add some information like icon size or color (if you use icons)
  <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={32} color="white" />
);



export default class ProductDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
        foto: this.props.navigation.getParam('fotoitem'),
        descripcion: this.props.navigation.getParam('descripcion'),
        precio: this.props.navigation.getParam('precio'),
        titulo: this.props.navigation.getParam('titulo')

    }
    
  }


  static navigationOptions = ({navigation}) => {
    that =this;
   const { params = {} } = navigation.state;
   return{
    
    title: params.titulo,
    headerRight: () => (
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity underlayColor="white">
          <View>
       <Icon2 underlayColor='white' name="shopping-store" size={20} style={{marginRight:30}} color= 'white'  />
       </View>
       </TouchableOpacity>
      <TouchableOpacity underlayColor="white" ><View>
       <Icon name="md-cart" size={28} style={{marginRight:10}} color= 'white'  />
       </View></TouchableOpacity>
      </View>
    ),
   }
  }
  clickEventListener() {
    Alert.alert("Success", "Product has beed added to cart")
  
  }

  componentDidMount()
  {
    this.props.navigation.setParams({titulo: this.state.titulo  });
  }



  

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{alignItems:'center', marginHorizontal:30}}>
            <Image style={styles.productImg} source={{uri:this.state.foto}}/>
            <Text style={styles.name}>{this.state.titulo}</Text>
            <Text style={styles.price}>$ {this.state.precio}</Text>
            <Text style={styles.description}>
              {this.state.descripcion}
            </Text>
          </View>
          <View style={styles.starContainer}>
            
          </View>
          <View style={styles.contentSize}>
            <TouchableOpacity><Text>cantidad</Text></TouchableOpacity> 
            
          </View>
          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={()=> this.clickEventListener()}>
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
  container:{
    flex:1,
    marginTop:20,
  },
  productImg:{
    width:300,
    height:250,
    resizeMode:'contain'
  },
  name:{
    fontSize:30,
    color:"#696969",
    fontWeight:'bold'
  },
  price:{
    marginTop:10,
    fontSize:25,
    color:"orange",
    fontWeight:'bold'
  },
  description:{
    fontSize:18,
    textAlign:'center',
    marginTop:10,
    color:"#696969",
  },
  star:{
    width:40,
    height:40,
  },
  btnColor: {
    height:30,
    width:30,
    borderRadius:30,
    marginHorizontal:3
  },
  btnSize: {
    height:40,
    width:40,
    borderRadius:40,
    borderColor:'#778899',
    borderWidth:1,
    marginHorizontal:3,
    backgroundColor:'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer:{
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentColors:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentSize:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  separator:{
    height:2,
    backgroundColor:"#eeeeee",
    marginTop:20,
    marginHorizontal:30
  },
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "orange",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  addToCarContainer:{
    marginHorizontal:30
  }
});     