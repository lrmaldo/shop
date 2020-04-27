import React, { Component } from 'react';
import {  Dimensions,  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,} from 'react-native';
var { width } = Dimensions.get("window")
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { Card, Icon } from 'react-native-elements'


export default class Perfil extends Component {

   
  constructor(props) {
     super(props);
     this.state = {
      id_facebook:null,
      picture:null,
      name:null,
      email:null,
      accessToken: null
    };
  }
  
  componentDidMount() {
    this._setDataFB()
  }

  

  render() {
    const dhis = this
    return (
      <View style={{flex:1}}>


      

      {
        this.state.id_facebook?
        <View style={{flex:.2}}>
        <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{uri: this.state.picture.data.url}}
        > 
        
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{uri: this.state.picture.data.url}}
            />
            <Text style={styles.userNameText}>{this.state.name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                 
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  San Juan Tuxtepec, Oaxaca
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
         <LoginButton  onLogoutFinished={() => console.log("logout.")}/>
          
           </View>
       
        </View>
        
        </View>
     
          
        
        :
        <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>


        
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                
                
                dhis._setDataFB()
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
const styles = StyleSheet.create({
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
    color: 'white',
    fontSize: 26,
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
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FF3B30',
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
})