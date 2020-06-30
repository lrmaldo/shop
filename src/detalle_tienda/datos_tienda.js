import React, { Component } from 'react';
import { Card, Icon } from 'react-native-elements'
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/FontAwesome5'


export default class Perfil extends Component {


  constructor(props) {
    super(props);
    this.state = {
      nombre: this.props.navigation.getParam('nombre'),
      direccion: this.props.navigation.getParam('direccionT'),
      foto: this.props.navigation.getParam('fotot'),
      telefono: this.props.navigation.getParam('telefonot'),
      lat: this.props.navigation.getParam('lat'),
      long: this.props.navigation.getParam('long'),
      descripcion: this.props.navigation.getParam('descripcion'),

    };
  }

  componentDidMount() {
    //const data = JSON.stringify(this.props.navigation.getParam('Tienda'))

    this.props.navigation.setParams({ titulo: this.state.nombre })


  }

  static navigationOptions = ({ navigation }) => {
    that = this;
    const { params = {} } = navigation.state;
    //const {direccionTienda} =this.state
    //console.log(direccionTienda)
    return {
      title: "",
      //header:null
    }

  }


  renderHeader = () => {


    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: this.state.foto,
          }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: this.state.foto,
              }}
            />
            <Text style={styles.userNameText}></Text>
            <View style={styles.userAddressRow}>
              <View>

              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>

                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }


  renderTel = () => {

    return (

      <View>
        <View style={{ marginTop: 15 }}></View>
        <View style={{ marginTop: 5, marginBottom: 15, alignItems: 'center', marginLeft:10, marginRight:10, padding:5 }}>
          <Text style={styles.TextDescripcion}>{this.props.navigation.getParam('descripcion')} </Text>
        </View>
        <View style={[styles.containerTel,]}>

          <TouchableOpacity style={styles.iconRow} onPress={() => Linking.openURL(`tel://${this.state.telefono}`).catch(err => console.log('Error:', err))}>

            <Icon
              name="call"
              underlayColor="transparent"
              iconStyle={styles.telIcon}
              
            />

          </TouchableOpacity>
          <View style={styles.telRow}>
            <View style={styles.telNumberColumn}>
              <Text style={styles.telNumberText}>{this.state.telefono}</Text>
            </View>
            <View style={styles.telNameColumn}>

              <Text style={styles.telNameText}>{this.state.nombre}</Text>

            </View>
          </View>
          <TouchableOpacity style={styles.smsRow} onPress={() => Linking.openURL(`https://wa.me/52${this.state.telefono}`).catch(err => console.log('Error:', err))}>
            <Icon2
              name="logo-whatsapp"
              underlayColor="transparent"
              style={styles.smsIcon}
              
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }



  Separator = () => (
    <View style={styles.containerS}>
      <View style={styles.separatorOffset} />
      <View style={styles.separator} />
    </View>
  )

  Direccion = () => {
    /**const url = Platform.select({
      ios: `maps://app?daddr=${this.state.direccion}`,
      android: `google.navigation:q=${this.state.direccion}`,
    })**/
    const url = Platform.select({
      ios: `maps://app?ll=${this.state.lat},${this.state.long}`,
      android: `google.navigation:q=${this.state.lat},${this.state.long}`,
    })

    return (<TouchableOpacity onPress={() => Linking.openURL(url)}>

      <View style={[styles.containerD, styles.emailContainer]}>
        <View style={styles.direccionRow}>

          <Icon3
            name="directions"
            underlayColor="transparent"
            style={styles.telIcon}
          //onPress={() => onPressEmail()}
          />

        </View>
        <View style={styles.telRow}>
          <View style={styles.direccionNameColumn}>
            <Text style={styles.direccionNameText}>Direccion</Text>
          </View>
          <View style={styles.direccionColumn}>
            <Text style={styles.direccionText}>{this.state.direccion}</Text>
          </View>

        </View>
      </View>
    </TouchableOpacity>)
  }


  render() {
    const dhis = this

    /// hay que mapear el state para obtener los datos de la tienda  agregar los elementos en el render 
    //console.log()
    // console.log(this.state.foto)
    // console.log(this.state.nombre)
    // console.log(this.state.direccion)
    // console.log(this.state.long)
    // console.log(this.state.descripcion)


    return (

      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>

            {this.renderHeader()}

            {this.Separator()}

            {this.renderTel()}
            {this.Separator()}
            {this.Direccion()}

          </Card>
        </View>
      </ScrollView>)
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
    //backgroundColor: 'transparent',
  },
  userCityText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: "orange",
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
  containerTel: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  smsIcon: {
    color: 'orange',
    fontSize: 35,
  },
  smsRow: {
    marginTop: 5,
    flex: 2,
    justifyContent: 'flex-start',
  },
  telIcon: {
    color: 'orange',
    fontSize: 30,
  },
  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  telNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  telNumberColumn: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,

  },
  TextDescripcion: {
    fontSize: 16,
    textAlign:'center'
    
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  containerS: {
    flexDirection: 'row',
  },
  separatorOffset: {
    flex: 2,
    flexDirection: 'row',
  },
  separator: {
    flex: 8,
    flexDirection: 'row',
    borderColor: '#EDEDED',
    borderWidth: 0.8,
  },


  //style de direccion

  containerD: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  direccionColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  direccionIcon: {
    color: "orange",
    fontSize: 30,
  },
  direccionNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  direccionNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  direccionRow: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  direccionText: {
    fontSize: 16,
  },
  direccioniconRow: {
    flex: 2,
    justifyContent: 'center',
  },
})