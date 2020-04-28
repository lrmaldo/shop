/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * author  Ing Leonardo Maldonado
 * Abril 2020  tiempos de Covid19
 */







import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
// import Components
import Tienda from './src/detalle_tienda/tienda'
//import Carrito from './src/detalle_tienda/carrito'
//import Checkout from './src/detalle_tienda/checkout'
//import Datos_tienda from './src/detalle_tienda/datos_tienda'

//import index_tienda from './src/detalle_tienda/'


//import de inicio
import Inicio from './src/inicio/inicio'
import Perfil from './src/inicio/perfil'

// unable console yellow
console.disableYellowBox = true;


// import icons
import Icon from 'react-native-vector-icons/Ionicons';





const TabIconInicio = (props) => (
  <Icon name="md-home" size={30} color={props.focused ? 'white' : 'darkgrey'} />
  
)
const TabIconPerfil = (props) => (
  <Icon name="md-person" size={30} color={props.focused ? 'white' : 'darkgrey'} />
  
)

const HomeNavigator = createStackNavigator({
  Tienda:{
    screen: Tienda,
    navigationOptions:{
          title:"Marketux",
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:60, backgroundColor:"#007bff", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
        <View style={{height:55, backgroundColor:"#c51d34", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
      </View>,

      
        
        
    },

  },
    
  
  
});

const BottonNavegation = createBottomTabNavigator({
  
  Home:{
    screen:HomeNavigator,
    navigationOptions:{
      title:'Inicio',
      tabBarIcon: TabIconInicio,
     // tabBarIcon: ({activeTintColor}) => <FontAwesome name="home" color={"white"}></FontAwesome>
    },
    
       
  },
  Perfil:{
    screen: PerfilNavigator,
    navigationOptions:{
      title:'Perfil',
      tabBarIcon: TabIconPerfil,
     // tabBarIcon: ({activeTintColor}) => <FontAwesome name="home" color={"white"}></FontAwesome>
    },
  },
  
  /**Notificacion: {
    screen:NotificacionNavigator,
    navigationOptions:{
      title:'Notificacion',
      tabBarIcon: TabIconNotificaciones,
    },
   
  },
  */
 


  
  
  
 

 
 /* screen:AgendaNavigator,
  screen:NotificacionNavigator,
  screen: GeoMapsNavigator,
  screen: PerfilNavigator,
  #007bff
*/
}
,

{tabBarOptions: {
  activeTintColor: 'white',
  //inactiveTintColor:'#6c757d',
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: '#c51d34',
  },
}
}

)


export default  createAppContainer(BottonNavegation)



