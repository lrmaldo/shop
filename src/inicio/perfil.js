import React, { Component } from 'react';
import {  Dimensions,  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,} from 'react-native';
var { width } = Dimensions.get("window")
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { Card, Icon } from 'react-native-elements'


export default class Perfil extends Component {

   url ="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1367133923474897&width=500&ext=1592067816&hash=AeRMb6U0xNeU_qWB"
  constructor(props) {
     super(props);
     this.state = {
      id_facebook:null,
      picture:null,
      name:null,
      email:null,
      accessToken: null,
      isLoggedin:false
    };
  }
  
  componentWillMount() {
    this._setDataFB()
  }

  

  renderDescription = () => {
    return (
      <View>
        <Text style={styles.priceText}>$1,175,000</Text>
        <Text style={styles.descriptionText}>1 Bed, 2 Bath, 1088 soft</Text>
        <Text style={styles.descriptionText}>Condo, 342 Days on Trulia</Text>
        <Text style={styles.descriptionText}>Est. Mortgage $52,604</Text>
      </View>
    )
  }


  render() {
    const dhis = this
    return (
      <View style={{flex:1}}>


      

      {
        this.state.isLoggedin?
        <View style={{flex:.1}}> 
        <View style={styles.headerContainer}>
        <ImageBackground
          key={new Date()}
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{uri: this.state.picture.data.url}}
        > 
        
          <View style={styles.headerColumn}>
            <Image
              key={new Date()}
              style={styles.userImage}
              source={{uri: this.state.picture.data.url}}
            />
            <Text style={styles.userNameText}>{this.state.name}</Text>
         
          </View>
        </ImageBackground>
        <View style={styles.productRow}>
         <LoginButton  onLogoutFinished={() =>{ console.log("logout."); this.setState({isLoggedin:false})}}/>
          
           </View>

           <Text style={styles.info}>UX Designer / Mobile developer</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
              
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
                this.setState({isLoggedin:true})
                dhis._setDataFB()
              }
            }
          }
          />
          
           </View>

           <Text style={styles.info}>UX Designer / Mobile developer</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
              
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
        
        
          </View>
     

      }



   </View>
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
          this.setState({isLoggedin:true});
          
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
    marginBottom: 4,
    color: "gray",
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
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
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
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
 
*/