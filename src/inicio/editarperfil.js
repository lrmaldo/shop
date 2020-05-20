import React, {Component} from 'react';
import {Platform,ScrollView, StyleSheet, Text, TextInput, View,
        Dimensions,TouchableOpacity,TouchableHighlight,Button,Alert,Image,
        ImageBackground,StatusBar, TouchableHighlightBase} from 'react-native';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';

//toast
import Toast from 'react-native-simple-toast';

export default class app extends Component {

  constructor(props)
  {
    super(props);
   // const { params } = this.props.navigation.state;

    this.state = {
      id_facebook:null,
      picture:null,
      name:null,
      email:null,
      accessToken: null,
      isLoggedin:false,
      value:{},
      
      nombre: '',
      correo : '',
      direccion: '',
      referencias:'',
      telefono:'',
      colonia:'',
      status: '',
      wholeResult: '',
      isFocused:false
    }
  }


  componentWillMount() {
    this._setDataFB()
    //const { params } = this.props.navigation.state;
   
    
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  handleSubmit = () => {

    if(this.state.nombre && this.state.correo && this.state.colonia && this.state.direccion && this.state.referencias &&this.state.telefono ){
    //  if(!this.validateEmail(this.state.correo)){
      
        if(this.validateEmail(this.state.correo)){

         // Alert.alert("siguiente if")
          Toast.showWithGravity('This is a long toast at the top.', Toast.LONG, Toast.TOP);
        }else{
          
          Toast.showWithGravity('This is a long toast at the top.', Toast.LONG, Toast.TOP);
        }

      }else{
        //Toast.showWithGravity('Llene todo los campos', Toast.LONG, Toast.CENTER);
       
        //Alert.alert('correo valido')

      }
    // use that ref to get the form value
    //console.log('value: ', value.nombre);
   /**  if(this.state.nombre || this.state.nombre != " "){
      if(!this.validateEmail(this.state.correo)){
       if(this.state.direccion){
           this.registerCall();
        }else{
       Alert.alert("acomplete el campo de ");
      }
      }else{
     Alert.alert("correo invalido");
     }
   }else{
 Alert.alert("Please enter username");
}*/
    //this.props.navigation.navigate('Perfil')
  }

handleFocus = event => {
  this.setState({isFocused:true});

  if(this.props.onFocus){
    this.props.onFocus(event);
  }
}
handleOrange = event => {
  this.setState({isFocused:false});

  if(this.props.onOrange){
    this.props.onOrange(event);
  }
}
handleValidation(value) {
  const { pattern } = this.props;
  if (!pattern) return true;

  // string pattern, one validation rule
  if (typeof pattern === 'string') {
    const condition = new RegExp(pattern, 'g');
    return condition.test(value);
  }

  // array patterns, multiple validation rules
  if (typeof pattern === 'object') {
    const conditions = pattern.map(rule => new RegExp(rule, 'g'));
    return conditions.map(condition => condition.test(value));
  }
}
  

    render(){
      const dhis = this
    const {isFocused} = this.state.isFocused;
    const {isLoggedin} = this.state.isLoggedin;
    const {onFocus,onOrange, ...otherProps} = this.props;
     

     
      //  console.log('es null')
        return (
          <ScrollView>
          <View style={styles.container}>
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
           
           <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}
                
                placeholder="Nombre"
                fontSize={20}
                keyboardType="name-phone-pad"
                underlineColorAndroid='transparent'
                selectionColor={"orange"}
                underlineColorAndroid={
                  isFocused ? "orange" : "#f9aa34"
                }
                onFocus ={this.handleFocus}
                onOrange={this.handleOrange}
                onChangeText={(nombre) => this.setState({nombre})}
                defaultValue={
                  isLoggedin ? "" :this.state.name
                }
                
                
              />
          </View>
          <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}
                placeholder="Email"
                fontSize={20}
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                selectionColor={"orange"}
                underlineColorAndroid={
                  isFocused ? "orange" : "#f9aa34"
                }
                onFocus ={this.handleFocus}
                onOrange={this.handleOrange}
                onChangeText={(correo) => this.setState({correo})}
                defaultValue={
                  isLoggedin ? "" :this.state.email
                }
                />
                
          </View>
          <View style={styles.inputContainer}>
              <TextInput style={styles.inputsArea}
                fontSize={20}
                placeholder="Direccion"
                keyboardType="default"
                multiline={ true}
                underlineColorAndroid='transparent'
                selectionColor={"orange"}
                numberOfLines={2}
                underlineColorAndroid={
                  isFocused ? "orange" : "#f9aa34"
                }
                onFocus ={this.handleFocus}
                onOrange={this.handleOrange}
                onChangeText={(direccion) => this.setState({direccion})}/>
          </View>
          <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}
                fontSize={20}
                multiline={ true}
                placeholder="Referencias"
                keyboardType="default"
                underlineColorAndroid='transparent'
                selectionColor={"orange"}
                underlineColorAndroid={
                  isFocused ? "orange" : "#f9aa34"
                }
                onFocus ={this.handleFocus}
                onOrange={this.handleOrange}
                onChangeText={(referencias) => this.setState({referencias})}
                />
          </View>
          <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}
                fontSize={20}
                placeholder="Colonia"
                keyboardType="default"
                underlineColorAndroid='transparent'
                selectionColor={"orange"}
                underlineColorAndroid={
                  isFocused ? "orange" : "#f9aa34"
                }
                onFocus ={this.handleFocus}
                onOrange={this.handleOrange}
                onChangeText={(colonia) => this.setState({colonia})}/>
          </View>
          <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}
                fontSize={20}
                placeholder="Teléfono o Célular"
                keyboardType="phone-pad"
                underlineColorAndroid='transparent'
                selectionColor={"orange"}
                underlineColorAndroid={
                  isFocused ? "orange" : "#f9aa34"
                }
                onFocus ={this.handleFocus}
                onOrange={this.handleOrange}
                onChangeText={(telefono) => this.setState({telefono})}/>
          </View>

         

        <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#ffa500'>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableHighlight>
        </View>
        </ScrollView>
           ) 

       
    
    
    }


    
  _authFB()
  {
    //console.log(presiono)
    const dhis = this
    LoginManager.logInWithPermissions(["public_profile",'email']).then(
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
        console.warn("entro de nuevo");
        this.setState({isLoggedin:true, name:datajson.data.name});
       // variable para enviar post
        const data_fb =  {
          id_facebook: datajson.data.id,
          email : datajson.data.email,
          name  : datajson.data.name,
          picture: datajson.data.picture
        }
        
        this.setState(data_fb);
        this.setState({accessToken:tokenData});
        
        
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
  container: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 20,
    backgroundColor: '#ffffff',
  },
    buttonContainer: {
      margin: 25,
      
    },
    button:{
      margin:25,
      height: 36,
      backgroundColor: '#f9aa34',
      borderColor: '#f9aa34',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    productRow: {
      margin: 35,
      alignItems:'center'
    },
    inputs:{
      height:55,
      marginLeft:16,
      paddingLeft: 6,
      flex:1,
     },
     inputsArea:{
      lineHeight: 23,
      marginLeft:16,
      paddingLeft: 10,
      flex:2,
      textAlignVertical:"top"
     },
  })