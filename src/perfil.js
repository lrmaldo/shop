import React, { Component } from 'react';
import { Text, Dimensions,  View, TextInput, TouchableOpacity, Image } from 'react-native';
var { width } = Dimensions.get("window")
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';

export default class Perfil extends Component {

  constructor(props) {
     super(props);
     this.state = {
      id_facebook:null,
      picture:null,
      name:null,
      email:null,
      token:null
    };
  }

  render() {
    return (
      <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>

      {
        this.state.id_facebook?
        <View style={{justifyContent:'center'}}>
          <Image source={{uri: this.state.picture.data.url}} style={{width:200,height:200}} />
          <View style={{height:20}} />
          <Text style={{fontSize:20,fontWeight:"bold"}}>{this.state.name}</Text>
          <Text style={{fontSize:20}}>{this.state.email}</Text>
          <View style={{height:20}} />
          <Text >facebook ID</Text>
          <Text >{this.state.id_facebook}</Text>
          
        </View>
        :
       
<View>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    const data_fb =  {
                      id_facebook: data.id,
                      email : data.email,
                      name  : data.name,
                      picture: data.picture
                    }
                    this.setState(data_fb);

                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
      </View>

      }



   </View>
    );
  }


  

  _authFB()
  {
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
          picture: datajson.data.picture
        }
        this.setState(data_fb);
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