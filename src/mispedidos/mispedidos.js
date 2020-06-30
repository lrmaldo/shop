import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    FlatList
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image'
import 'moment/min/moment-with-locales'


import Moment from 'moment'
import   'moment/locale/es';
var { height, width } = Dimensions.get('window');
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mispedidos: [],
            exitedatos: false
        }

    }

    cargardatos = async () => {
        // AsyncStorage.removeItem('mispedidos')

        const pedidos = await AsyncStorage.getItem('mispedidos');
        if (pedidos != null) {
            const mispedidos = JSON.parse(pedidos)
            // console.log("se encontro pedidos")
            this.setState({
                mispedidos: mispedidos,
                exitedatos: true
            })
        } else {
            // console.log("no se encontro pedidos") 
            this.setState({
                exitedatos: false
            })
        }



    }
    async UNSAFE_componentWillMount() {
        this.cargardatos()
    }

    render() {
        Moment.locale('es')
        //console.log(Moment.locale('es')) 

        this.cargardatos()
        return (<View style={styles.containerPrincipal}>
            {!this.state.exitedatos ? <View style={styles.container1}>
                <Image
                    style={{ width: 300, height: 200, alignSelf: 'center' }}
                    source={require('./../../image/10415-data-mango.gif')} />
                <Text style={styles.textpedidovacio}>Aún no tienes pedidos</Text>

            </View> :
                <View style={styles.container}>
                    <FlatList
                        // horizontal={false}
                        data={this.state.mispedidos.reverse()}
                        // numColumns={2} 
                        renderItem={({ item }) => this.listaPedidos(item)}
                        keyExtractor={(item, index) => index.toString()}

                    />
                </View>}
        </View>)

        /*  if (!this.state.exitedatos) {
             return (
                 <View style={styles.container1}>
 
                     <Image
                         style={{ width: 300, height: 200, alignSelf: 'center' }}
                         source={require('./../../image/10415-data-mango.gif')} />
                     <Text style={styles.textpedidovacio}>Aún no tienes pedidos</Text>
                 </View>
             );
         }
         return (<View style={styles.container}>
               <FlatList
               // horizontal={false}
               data={this.state.mispedidos.reverse()}
              // numColumns={2} 
               renderItem={({ item }) => this.listaPedidos(item)}
               keyExtractor={(item, index) => index.toString()}
 
             />
             
                 </View>); */
    }


    listaPedidos(item) {/// renderiza el flatlist  de los pedidos
        //console.log(item)


        var d = new Date(item.fecha)
        return (<TouchableOpacity style={styles.divFood} onPress={() => {
            this.props.navigation.navigate('Detallepedido', { mipedido: item, fotourl: item.datostienda.fotourl })
        }}>

            <FastImage
                key={item.fecha}
                style={styles.imageFood}
                resizeMode={FastImage.resizeMode.contain}
                source={{
                    uri: item.datostienda.fotourl,
                    headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.normal,
                }}
            // defaultSource={{uri:item.foto_url}}
            />
            {/* <Image
            style={styles.imageFood}

            source={require('./../../image/10415-data-mango.gif')} /> */}


            <View style={{ height: ((width / 2) - 20) - 90, backgroundColor: 'transparent', width: ((width / 2) - 20) - 10 }} />

            <View style={{ flexDirection: 'row', marginTop:10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: "#696969" }}>
                    Tienda:
         </Text>
                <Text style={{ fontSize: 20, textAlign: 'center', color: "#696969" }}> {item.datostienda.nombretienda}</Text>

            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', color: "#696969" }}>
                    Tipo de servicio:
         </Text>
                <Text style={{ fontSize: 16, textAlign: 'center', color: "#696969" }} > {item.tipo}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, color: "#696969", textAlign: "center" }}>Fecha de pedido:</Text>
                <Text style={{ fontSize: 16, color: "black", textAlign: "center", color: "#696969" }}> {Moment(d,'YYYYMMDD').fromNow()}</Text>
            </View>




        </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: width,
        borderRadius: 20,
        paddingVertical: 20,
        //backgroundColor: 'white'
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: width,
        borderRadius: 20,
        paddingVertical: 20,
        backgroundColor: 'white'



    },
    containerPrincipal: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: width,
        borderRadius: 20,
        paddingVertical: 20,
        //backgroundColor: 'white'



    },
    textpedidovacio: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: "bold",
        color: "#f9aa34"

    },
    imageFood: {
        width: ((width / 2) - 20) - 10,
        height: ((width / 2) - 20) - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    divFood: {
        width: (width / 4) * 3.78,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        elevation: 8,
        shadowOpacity: 0.3,
        shadowRadius: 50,
        backgroundColor: 'white',
    },
})