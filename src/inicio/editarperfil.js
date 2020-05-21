import React, {Component} from 'react';
import {Platform,ScrollView, StyleSheet, Text, TextInput, View,
        Dimensions,TouchableOpacity,TouchableHighlight,Button,Alert,Image,
        ImageBackground,StatusBar, TouchableHighlightBase} from 'react-native';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';

//toast
import Toast from 'react-native-simple-toast';


  import AsyncStorage from '@react-native-community/async-storage';

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
      cruzamientos:'',
      colonia:'',
      status: '',
      wholeResult: '',
      isFocused:false,
      text:''
    }
  }


  componentWillMount() {
    this._setDataFB()
    //const { params } = this.props.navigation.state;
   
    
  }
  componentDidMount(){
    this.retrieveData();
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  save = async name => {
    try {

      

      await AsyncStorage.setItem("perfil", JSON.stringify(name))
      alert('Data successfully saved!')
     // this.setState({ nombre: name })
    } catch (e) {
      alert('Failed to save name.')
    }
  }

  retrieveData = async () => {
    try {
      const name = await AsyncStorage.getItem("perfil")

      if (name !== null) {
        const e = JSON.parse(name)
        console.log(e)
        this.setState({ 
          nombre:e.nombre, 
          correo:e.correo,
          direccion:e.direccion,
          cruzamientos:e.cruzamientos,
          referencias:e.referencias,
          colonia:e.colonia,
          telefono:e.telefono

        })
      }
    } catch (e) {
      alert('Failed to load name.')
    }
  }
  onChangeText = text => this.setState({ text })

  onSubmitEditing = () => {
      const onSave = this.save
      const { nombre,correo,direccion,cruzamientos,colonia,referencias,telefono } = this.state

      //if (!nombre && !correo) return
      let perfil ={
        nombre:nombre,
        correo:correo,
        direccion:direccion,
        cruzamientos:cruzamientos,
        colonia:colonia,
        referencias:referencias,
        telefono:telefono
        
      }
      onSave(perfil)
     
      
      //this.setState({ nombre: '' })
  }

  handleSubmit = () => {

    if(this.state.nombre && this.state.correo && this.state.colonia && this.state.direccion && this.state.referencias &&this.state.telefono ){
    //  if(!this.validateEmail(this.state.correo)){
      
        if(this.validateEmail(this.state.correo)){

         // Alert.alert("siguiente if")
          
         Toast.showWithGravity('Guardando...', Toast.LONG, Toast.CENTER);
        }else{
          Toast.showWithGravity('No es un correo valido', Toast.LONG, Toast.CENTER);
         
        }

      }else{
        //Toast.showWithGravity('Llene todo los campos', Toast.LONG, Toast.CENTER);
       
        //Alert.alert('correo valido')
        Toast.showWithGravity('Llena todos los campos.', Toast.LONG, Toast.CENTER);

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

  guardar(){
    var that = this;
    //var url = that.state.baseUrl + 'register.php';
     //console.log("url:"+url);

     AsyncStorage.getItem('i').then((dataPerfil)=>{
      if (dataPerfil !== null) {
        if(this.state.id_facebook){
          let perfil = {
            id_face:this.state.id_facebook,
            nombre_face:this.state.name,
            nombre: this.state.nombre,
            email: this.state.correo,
            direccion: this.state.direccion,
            referencias: this.state.referencias,
            colonia:this.state.colonia,
            telefono:this.state.colonia,
            };

            AsyncStorage.setItem('i',perfil);
        }else{ 
            let perfil = {
              nombre: this.state.nombre,
              email: this.state.correo,
              direccion: this.state.direccion,
              referencias: this.state.referencias,
              colonia:this.state.colonia,
              telefono:this.state.colonia,
              };
              AsyncStorage.setItem('ii',perfil);
        }
      
      }else{

        if(this.state.isLoggedin){
          let perfil = {
            id_face:this.state.id_facebook,
            nombre_face:this.state.name,
            nombre: this.state.nombre,
            email: this.state.correo,
            direccion: this.state.direccion,
            referencias: this.state.referencias,
            colonia:this.state.colonia,
            telefono:this.state.colonia,
            };

            AsyncStorage.setItem('pl',perfil);
        }else{ 
            let perfil = {
              nombre: this.state.nombre,
              email: this.state.correo,
              direccion: this.state.direccion,
              referencias: this.state.referencias,
              colonia:this.state.colonia,
              telefono:this.state.colonia,
              };
              AsyncStorage.setItem('l',perfil);
        }
      }



     })
  
    
  }


  guardarapi(){
    var that = this;
    fetch(url,{
      method: 'POST',
      body: JSON.stringify({"name": this.state.Usrname, "email": this.state.email,"password": this.state.password})
      }).then(function (response) {
        return response.json();
      }).then(function (result) { 
        // console.log(result);
        if(!result.error){
         that.setState({ status: result.error,
                         wholeResult: result,
                      });
         Alert.alert("User register successfully \n userId: "+that.state.wholeResult.user.uid);
         console.log(that.state.wholeResult.user.uid);
     }else{
      Alert.alert(result.error_msg);
      console.log(result);
}
}).catch(function (error) {
console.log("-------- error ------- "+error);
alert("result:"+error)
});
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
    const { text, nombre, correo, direccion,referencias,cruzamientos,telefono,colonia } = this.state;

     
      //  console.log('es null')
        return (
          <ScrollView>
          <View style={styles.container}>
          <View style={styles.productRow}>
         
          
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
                value={nombre}
                
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
               
                value={correo}
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
                numberOfLines={1}
                underlineColorAndroid={
                  isFocused ? "orange" : "#f9aa34"
                }
                onFocus ={this.handleFocus}
                onOrange={this.handleOrange}
                onChangeText={(direccion) => this.setState({direccion})}
                defaultValue={direccion}/>
          </View>
          <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}
                fontSize={20}
                multiline={ true}
                placeholder="Cruzamientos"
                keyboardType="default"
                underlineColorAndroid='transparent'
                selectionColor={"orange"}
                underlineColorAndroid={
                  isFocused ? "orange" : "#f9aa34"
                }
                onFocus ={this.handleFocus}
                onOrange={this.handleOrange}
                onChangeText={(cruzamientos) => this.setState({cruzamientos})}
                defaultValue={cruzamientos}
                />
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
                defaultValue={referencias}
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
                onChangeText={(colonia) => this.setState({colonia})}
                defaultValue={colonia}
                />
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
                onChangeText={(telefono) => this.setState({telefono})}
                defaultValue={telefono}
                />
          </View>

         

        <TouchableHighlight style={styles.button} onPress={this.onSubmitEditing} underlayColor='#ffa500'>
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