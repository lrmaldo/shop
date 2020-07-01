import React, { Component } from 'react';
import {    Image,
  ImageBackground,
  StatusBar,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,} from 'react-native';

import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native';

import AsyncStorage from '@react-native-community/async-storage';
export default class Perfil extends Component {

   
  constructor(props) {
     super(props);
     this.state = {
      id_facebook:null,
      picture:null,
      name:null,
      name1:null,
      email:null,
      accessToken: null,
      isLoggedin:false,

      nombre:"", 
      correo:"",
      direccion:"",
      cruzamientos:"",
      referencias:"",
      colonia:"",
      telefono:"",
      datos_vacio:true
    };
  }
  
  componentDidMount() {
    
    this._setDataFB()
    const { params } = this.props.navigation.state;

   
  }


  retrieveData = async () => {
    try {
      const name = await AsyncStorage.getItem("perfil")

      if (name !== null) {
        const e = JSON.parse(name)
        
       //console.log("hola")
        this.setState({ 
          nombre:e.nombre, 
         // correo:e.correo,
          direccion:e.direccion,
          cruzamientos:e.cruzamientos,
          referencias:e.referencias,
          colonia:e.colonia,
          telefono:e.telefono,
          datos_vacio:false
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
  

  


  render() {
    const dhis = this
    this.retrieveData();
  
    
    return (
     
      <ScrollView style={{flex:1}}>
         <StatusBar barStyle="light-content" backgroundColor="#f4511e" />

        <View style={{flex:.1}}>
                  <View style={styles.headerContainer}>
                    
                      <ImageBackground
                        key={new Date()}
                        style={styles.headerBackgroundImage}
                        blurRadius={10}
                        source={{uri: this.state.isLoggedin? this.state.picture.data.url :'http://markettux.sattlink.com/img/logo.jpg'}}
                        defaultSource={{uri:'http://markettux.sattlink.com/img/logo.jpg'}}
                      > 
                  
                            <View style={styles.headerColumn}>
                            <Image
                              key={new Date()}
                              style={styles.userImage}
                              source={{uri: this.state.isLoggedin? this.state.picture.data.url :'http://markettux.sattlink.com/img/logo.jpg'}}
                              defaultSource={{uri:'http://markettux.sattlink.com/img/logo.jpg'}}
                            />
                            <Text style={styles.userNameText}>Hola {this.state.name}</Text>
                        
                        
                          </View>
                     </ImageBackground>
                        
                    

                          
                         
                           
                          { this.state.datos_vacio ?
                          <View>
                            <View style={styles.productRow}></View>
                          <LottieView  style={{ position: 'relative', alignSelf: 'center', bottom: 10, width: 100, height: 100 }}
                          source={require('../../res/1869-file-error.json')} autoPlay loop />

                          <Text style={styles.descriptionText}> No encontramos tus datos   </Text>
                          </View>
                          :
                          <View>  
                           
                             
                              <Text style={styles.descriptionText}>  
                              <Icon
                                name="md-pin"
                               
                                size={25}
                                color="oracle"
                              
                              /> Tus Datos</Text>
                           
                          <Text style={styles.info}>Nombre: {this.state.nombre}</Text>
                          <Text style={styles.description}>Dirección: {this.state.direccion}  </Text>
                          <Text style={styles.description}>Cruzamientos: {this.state.cruzamientos}  </Text>
                          <Text style={styles.description}>Referencias: {this.state.referencias}  </Text>
                          <Text style={styles.description}>Colonia: {this.state.colonia}  </Text>
                          <Text style={styles.description}>Teléfono: {this.state.telefono}  </Text>
                          </View>

                          }
                        <View style={styles.productRow}>
                                <Button
                                  buttonStyle={{ backgroundColor:'#f9aa34'}}
                                    icon={
                                      <Icon
                                      name="md-create"
                                      size={25}
                                      color="white"
                                      //style={{marginStart:20}}
                                      />
                                          }
                                title="   Editar perfil"
                                onPress={() => this.props.navigation.navigate('EditPerfil') }
                                />
                             <View style={styles.productRow1}>
                       
                          
                       </View>
                       <View style={{alignItems:"center"}}>
                          <LoginButton  
                                          visible={false}
                                          onLoginFinished={
                                            (error, result) => {
                                              if (error) {
                                                console.log("login has error: " + result.error);
                                              } else if (result.isCancelled) {
                                                console.log("login is cancelled.");
                                              } else {
                                                console.log("presiono")
                                                
                                                dhis._setDataFB()
                                              }
                                            }
                                          }
                                          onLogoutFinished={() =>{{ this.setState({isLoggedin:false,name:null,email:null} ); console.log("salio")  }}}
                                          />
          
                         </View>
                        </View>
                  </View>
        
        </View>
          
          
          
          
          
         
      

   



   </ScrollView>
    );
  }

  logout = () => {
    
    this.setState({ id_facebook:null,
      picture:null,
      name:null,
      email:null,
      accessToken: null,
      isLoggedin:false});
  }

  _authFB()
  {
    console.log(presiono)
    const dhis = this
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
              result.grantedPermissions.toString()
          );
          dhis._setDataFB()
         
          
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  async _setDataFB()
  {
    // get token from facebook
    const tokenData = await AccessToken.getCurrentAccessToken().then(
      (data) => {
        return  data.accessToken.toString()
      }
    )
    // get data about profile from api graph
    const datajson = await this.apiGraphFace(tokenData)

    if (datajson.success) {
        console.log(datajson.data);
       // variable para enviar post
        const data_fb =  {
          id_facebook: datajson.data.id,
          email : datajson.data.email,
          name  : datajson.data.name,
          //name1 :datajson.data.firstname,
          picture: datajson.data.picture
        }
        
        this.setState(data_fb);
        this.setState({isLoggedin:true});
        
        
    }
    else {
      console.log("Error get data");
    }
  }

  async apiGraphFace (token)  {

    const resface = await fetch('https://graph.facebook.com/v2.10/me?fields=id,name,email,picture.width(500)&access_token='+token)
   .then((response) => response.json())
   .then((json) => {
     const data = {
       data: json,
       success: true
     }
     
     return data ;
   })
   .catch((error) => {
     const data = {
       message: error,
       success: false
     }
     return data;
   })

   return resface;
 }
}
const styles = StyleSheet.create({
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
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
  placeIcon: {
    color: 'orange',
    fontSize:43,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: 'orange',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize:21,
    color: "orange",
    marginTop:1,
    textAlign: 'center'
  },
  priceText: {
    marginBottom: 5,
    letterSpacing: 1,

    color: "black",
    fontSize: 36,
    fontWeight: '400',
  },
  productRow: {
    margin: 35,
  },
  productRow1: {
    position:"relative",
    alignContent:'center',
    margin: 10,
  },
  detailText: {
    marginBottom: 4,
    color:'black',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  subDetailText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '100',
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  info:{
    textAlign:'center',
    fontSize:16,
    color: "#696969",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  lottie: {
    width: 220,
    height: 220,
    aspectRatio:4
  }
})


/*
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Profile extends Component {

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.info}>UX Designer / Mobile developer</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Opcion 1</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Opcion 2</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
 









   {
        this.state.isLoggedin?
        <View style={{flex:.1}}> 
        <View style={styles.headerContainer}>
        <ImageBackground
          key={new Date()}
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{uri: this.state.picture.data.url}}
          defaultSource={{uri:'http://markettux.sattlink.com/imagenes/tiendas/2/perfil/imagen1589059888.jpg'}}
        > 
        
          <View style={styles.headerColumn}>
            <Image
              key={new Date()}
              style={styles.userImage}
              source={{uri: this.state.picture.data.url}}
              defaultSource={{uri:'http://markettux.sattlink.com/imagenes/tiendas/2/perfil/imagen1589059888.jpg'}}
            />
            <Text style={styles.userNameText}>{this.state.name}</Text>
        
         
          </View>
        </ImageBackground>
        <View style={styles.productRow}>
         <LoginButton  onLogoutFinished={() =>{ this.logout()}}/>
          
           </View>
           

                  <Text style={styles.info}>{this.state.nombre}</Text>
              <Text style={styles.description}>Dirección</Text>
              
              <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="md-place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                 
                />
              </View>
              
            </View>
            <View style={styles.productRow}>

           <Button
            style={{size:10,aspectRatio:30}}
              icon={
                <Icon
                name="md-arrow-back"
                size={25}
                color="white"
                //style={{marginStart:20}}
                />
                    }
          title="   editar perfil"
          onPress={() => this.props.navigation.navigate('EditPerfil') }
/>
           </View>
        </View>
        
        </View>
     
          
        
        :
        <View style={{flex:1}}>

        <View style={styles.headerContainer}>
                <ImageBackground
                  key={new Date()}
                  style={styles.headerBackgroundImage}
                  blurRadius={10}
                  source={{uri: 'http://markettux.sattlink.com/imagenes/tiendas/2/perfil/imagen1589059888.jpg'}}
                  defaultSource={{uri:'http://markettux.sattlink.com/imagenes/tiendas/2/perfil/imagen1589059888.jpg'}}
                > 
                
                  <View style={styles.headerColumn}>
                    <Image
                      key={new Date()}
                      style={styles.userImage}
                      source={{uri: 'http://markettux.sattlink.com/imagenes/tiendas/2/perfil/imagen1589059888.jpg'}}
                      defaultSource={{uri:'http://markettux.sattlink.com/imagenes/tiendas/2/perfil/imagen1589059888.jpg'}}
                    />
                    <Text style={styles.userNameText}>{this.state.name}</Text>
                
                  </View>
                </ImageBackground>

                <View style={styles.productRow}> 
                        <LoginButton  
                          
                          onLoginFinished={
                            (error, result) => {
                              if (error) {
                                console.log("login has error: " + result.error);
                              } else if (result.isCancelled) {
                                console.log("login is cancelled.");
                              } else {
                                console.log("presiono")
                                
                                dhis._setDataFB()
                              }
                            }
                          }
                          onLogoutFinished={() =>{{ this.setState({isLoggedin:false,name:null,email:null} ); console.log("salio")  }}}
                          />
               </View>
          
            
              {
                this.state.datos_vacio?
                <View>  <Text> no hay datos, </Text></View>

                :
                <Text style={styles.info}>Nombre: {this.state.nombre}</Text>
              <Text style={styles.description}>Dirección: {this.state.direccion}  </Text>
              <Text style={styles.description}>Cruzamientos: {this.state.cruzamientos}  </Text>
              <Text style={styles.description}>Referencias: {this.state.referencias}  </Text>
              <Text style={styles.description}>Colonia: {this.state.colonia}  </Text>
              <Text style={styles.description}>Teléfono: {this.state.telefono}  </Text>
            


           
              
                }
                            
              
         </View>
        
        </View>
     

      }
















*/