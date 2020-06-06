import React,{ Component } from "react";
import { ImageBackground, StyleSheet, Text, View,
Image,
TouchableHighlight,
Linking
} from "react-native";




export default class App extends Component{

    
        
        
    render(){
        return( <View style={styles.container}>
           <ImageBackground
                        key={new Date()}
                        style={styles.headerBackgroundImage}
                        blurRadius={10}
                        source={require('./../../image/fondo.jpg')}
                       
                      > 
                  
                            <View style={styles.trans}>
                                
                            <Image
                              key={new Date()}
                              style={styles.userImage}
                              source={{uri:'http://markettux.sattlink.com/imagenes/tiendas/2/perfil/imagen1589059888.jpg'}}
                              defaultSource={{uri:'http://markettux.sattlink.com/imagenes/tiendas/2/perfil/imagen1589059888.jpg'}}
                            />
                            <Text style={styles.text}>Markettux </Text>
                            <Text style={styles.text1}>Versión 1.0 </Text>                        
                            <Text style={styles.text1}>Miappshop by sattlink® </Text>
                            <TouchableHighlight>
                            <Text  onPress={() => Linking.openURL(`https://wa.me/529851050030`).catch(err => console.log('Error:', err))}></Text>
                            </TouchableHighlight>
                          </View>
                     </ImageBackground>
          </View>)
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
     
      
    },
    trans: {
        
        backgroundColor: 'transparent',
        justifyContent:'center',
        ...Platform.select({
          ios: {
            alignItems: 'center',
            elevation: 1,
            marginTop: -1,
          },
          android: {
            alignItems: 'center',
          },
        }),
      },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      
    },
    text: {
      color: "white",
      fontFamily:'sans-serif',
      fontSize: 30,
      fontWeight: "bold",
     
    },
    text1: {
        color: "white",
        fontFamily:'sans-serif',
        fontSize: 20,
        //fontWeight: "bold",
       
      },
    headerBackgroundImage: {
       
        flex:1,
        paddingBottom: 20,
        paddingTop: 35,
      },
      userImage: {
          alignItems:"center",
        borderColor: 'white',
        borderRadius: 135,
        borderWidth: 3,
        height: 250,
        marginBottom: 15,
        width: 250,
      },
  });