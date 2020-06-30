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
import { View, Image} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
// import Layouts
import Tienda from './src/detalle_tienda/tienda'
import Carrito from './src/detalle_tienda/carrito'
import Checkout from './src/detalle_tienda/checkout'
import Detalle_item from './src/detalle_tienda/detalle_item'
import Finalizar from './src/finalizar/finalizar'
import Datos_tienda from './src/detalle_tienda/datos_tienda'
//import index_tienda from './src/detalle_tienda'


//import de inicio
import Inicio from './src/inicio/inicio'
import Perfil from './src/inicio/perfil'
import EditPerfil from './src/inicio/editarperfil'
// unable console yellow
//console.disableYellowBox = true;

//import de layout de  acerc
import Contactanos from './src/acerca/contactanos'
import  Info from './src/acerca/info'
import  Terminos from './src/acerca/terminos'

//import de layout mis pedidos

import Mispedidos from './src/mispedidos/mispedidos'
import Detallepedidos from './src/mispedidos/detallePedidos'

// import icons
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome'



class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./image/MarkettuxB.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}



const TabIconInicio = (props) => (
  <Icon name="md-home" size={30} color={props.focused ? 'white' : 'darkgrey'} />
  
)
const TabIconPerfil = (props) => (
  <Icon name="md-person" size={30} color={props.focused ? 'white' : 'darkgrey'} />
  
)

const TabIconMispedidos = (props) => (
  <Icon2 name="shopping-bag" size={30} color={props.focused ? 'white' : 'darkgrey'}/>
  
)



const HomeNavigator = createStackNavigator({
  'Home':{
    screen: Inicio,
    navigationOptions:{
          //title:() => <LogoTitle />,
          
          headerTitleAlign:'center',
          /* headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTintColor:"white", */
        headerBackground:<View>
        <View style={{height:60, backgroundColor:"#000000", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
        <View style={{height:55, backgroundColor:"#f2682a", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
      </View>,

      
        
        
    },

  },
    'Tienda':{
    screen: Tienda,
    navigationOptions:{
         // title:"M@rkettux",
          
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
           
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:60, backgroundColor:"#000000", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
        <View style={{height:55, backgroundColor:"#f2682a", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
      </View>,
      
    },
    
  },
  'Detalle':{
    screen: Detalle_item,
    navigationOptions:{
         // title:"Pedido exitoso",
          
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
           
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:60, backgroundColor:"#000000", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
        <View style={{height:55, backgroundColor:"#f2682a", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
      </View>,
      
    },
    
  },
  'Datos_tienda':{
    screen: Datos_tienda,
    navigationOptions:{
         // title:"Pedido exitoso",
          
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
           
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:60, backgroundColor:"#000000", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
        <View style={{height:55, backgroundColor:"#f2682a", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
      </View>,
      
    },
    
  },

  'Carrito':{
    screen: Carrito,
    navigationOptions:{
          title:"",
          
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
           
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:60, backgroundColor:"#000000", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
        <View style={{height:55, backgroundColor:"#f2682a", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
      </View>,
      
    },
    
  },
  'Checkout':{
    screen: Checkout,
    navigationOptions:{
          title:"Confirmar compra",
          
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
           
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:60, backgroundColor:"#000000", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
        <View style={{height:55, backgroundColor:"#f2682a", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
      </View>,
      
    },
    
  },
  'Finalizar':{
    screen: Finalizar,
    navigationOptions:{
          title:"Pedido exitoso",
          
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
           
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:60, backgroundColor:"#000000", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
        <View style={{height:55, backgroundColor:"#f2682a", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
      </View>,
      
    },
    
  },
  'Contactanos':{
    screen:Contactanos,
    navigationOptions:{
          title:"Contáctanos",
          
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
           
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:60, backgroundColor:"#000000", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
        <View style={{height:55, backgroundColor:"#f2682a", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
      </View>,
      
    },
    
    
  },

  'Info':{
    screen:Info,
    navigationOptions:{
          header:null,
          //tabBarVisible: false,
          
          
      
    },

   
          },
    'Terminos':{
        screen:Terminos,
        navigationOptions:{
              title:"Politicas de privacidad",
              
              headerTitleAlign:'center',
              headerTitleStyle: {
                fontWeight: 'bold',
                
            },
            headerTintColor:"white",
            headerBackground:<View>
            <View style={{height:60, backgroundColor:"#000000", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
            <View style={{height:55, backgroundColor:"#f2682a", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
          </View>,
          
        },
        
        
      },
  
  
});


HomeNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};

  if (routeName === 'Info') {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};





const PerfilNavigator = createStackNavigator({
  Perfil:{
    screen: Perfil,
    navigationOptions:{
          title:"Perfil",
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:60, backgroundColor:"#000000", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
        <View style={{height:55, backgroundColor:"#f2682a", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
      </View>,

      
        
        
    },
  },
  EditPerfil:{
    screen: EditPerfil,
    navigationOptions:{
          title:"Editar Perfil",
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:60, backgroundColor:"#000000", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
        <View style={{height:55, backgroundColor:"#f2682a", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
      </View>,

      
        
        
    },
  },
  
  
});
const MispedidosNavigator = createStackNavigator({
  'Mispedidos':{
    screen: Mispedidos,
    navigationOptions:{
          title:"Mis pedidos",
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:60, backgroundColor:"#000000", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
        <View style={{height:55, backgroundColor:"#f2682a", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
      </View>,

      
        
        
    },
  },
  "Detallepedido":{
    screen: Detallepedidos,
    navigationOptions:{
          title:"",
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:60, backgroundColor:"#000000", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
        <View style={{height:55, backgroundColor:"#f2682a", position:'absolute', top:0, left:0, right:0, borderBottomRightRadius:0}}/>
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
  Pedidos:{
    screen: MispedidosNavigator,
    navigationOptions:{
      title:'Mis pedidos',
      tabBarIcon: TabIconMispedidos,
      
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
  inactiveTintColor:'#ff9958',
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: '#f2682a',
  },
}
}

)
//color primary  #f2682a
// color accent  #ff9958
//color dark #b83700
export default  createAppContainer(BottonNavegation)





/** 
 
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





***************************************************************

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

export default createAppContainer(AppNavigator);


 */