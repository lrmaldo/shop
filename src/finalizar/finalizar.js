
import React, {Component} from 'react';

import {Text,
     View,
    StyleSheet,
     ScrollView,
     TouchableOpacity} from 'react-native';

import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import icons
import Icon from 'react-native-vector-icons/Ionicons';

export default  class App extends Component{

    componentDidMount() {
        this.props.navigation.setParams({ regresar: this._regresar.bind(this) });
        this.animation.play();
        // Or set a specific startFrame and endFrame with:
        this.animation.play(0,900);
      }

      static navigationOptions = ({navigation}) => {
        that =this;
       const { params = {} } = navigation.state;
      //const {direccionTienda} =this.state
       //console.log(direccionTienda)
       return{
      // title:params.titulo,
      
         
       headerLeft: (       
          <View style={{flexDirection:"row"}}> 
       
           <TouchableOpacity underlayColor="white"  onPress={() => params.regresar()} ><View>
           <Icon
           name="md-arrow-back"
           size={20}
           color="white"
           style ={{margin:20}}
           />
            </View></TouchableOpacity>
           </View>
           
           
           )
         
         }
       
       }
   
       _regresar = () => {
        // alert('funciones');
        AsyncStorage.removeItem('cart');
        this.props.navigation.navigate('Home'); 
       
       }

    render(){
        return(
            <View style={{ borderRadius:20, paddingVertical:30, backgroundColor:'white'}}>
                 <ScrollView>
          <View style={{alignItems:'center', marginHorizontal:30}}>
           
          <LottieView  style={{ position: 'relative', alignSelf: 'center', bottom: 10, width:300, height: 300 }}
                          source={require('../../res/15648-successful-check.json')} ref={animation => {
                            this.animation = animation;
                          }} />

            <Text style={styles.name}>Envio exitoso</Text>
            
            <Text style={styles.description}>
            Tu orden de pedido lo ha recibido el vendedor
            </Text>
          </View>
          <View style={styles.starContainer}>
            
          </View>
          <View style={styles.contentSize}>
         
            
          </View>
          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity style={styles.shareButton} >
              <Text style={styles.shareButtonText} onPress={this._regresar}>Regresar</Text>  
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
