import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Linking,
    

} from 'react-native';

import { Icon } from 'react-native-elements'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/FontAwesome5'

import moment from 'moment/src/locale/es';
import Moment from 'moment';//formato de fechas

var { height, width } = Dimensions.get('window');
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mipedido: this.props.navigation.getParam('mipedido'),

            nombrecliente: "",
            direccioncliente: "",

            nombretienda: "",
            telefonotienda: "",
            direcciontienda: "",
            fototienda: this.props.navigation.getParam('fotourl'),
            lat: "",
            long: "",

            carritocomprado: "",
            tipo: "",
            fecha: "",
            total: ""
        }
        //this.cargardatos();
    }

    cargardatos() {
        var array = []
        array.push(this.state.mipedido)
        //console.log(array) 
        array.map((item, i) => {

            this.setState({
                nombrecliente: item.datoscliente.nombre,
                direccioncliente: item.datoscliente.direccion,

                nombretienda: item.datostienda.nombretienda,
                telefonotienda: item.datostienda.telefonot,
                direcciontienda: item.datostienda.direccionTienda,
               // fototienda: item.datostienda.fotourl,
                lat: item.datostienda.lat,
                long: item.datostienda.long,

                carritocomprado: item.pedido,
                tipo: item.tipo,
                total: item.total,
                fecha: item.fecha
            })
        })
    }

     componentDidMount() {
        this.cargardatos()
    }

    render() {
        var fecha = new Date(this.state.fecha)
       
        const url = Platform.select({
            ios: `maps://app?ll=${this.state.lat},${this.state.long}`,
            android: `google.navigation:q=${this.state.lat},${this.state.long}`,
        })
        return (
            <ScrollView>
                <View style={{ marginTop: 13 }} />
                <View style={styles.divFood}>
                    <Image
                        style={styles.imageFood}
                        key={new Date()}
                        source={{ uri: this.state.fototienda }}
                        defaultSource={require("./../../image/logo.jpg")}
                    />
                    {/* <Image
            style={styles.imageFood}

            source={require('./../../image/10415-data-mango.gif')} /> */}


                    <View style={{ marginTop: 15, height: ((width / 2) - 20) - 90, backgroundColor: 'transparent', width: ((width / 2) - 20) - 10 }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
                        {this.state.nombretienda}
                    </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>
                        Direccion:
                    
                    </Text>
                    <View style={{marginBottom:10}} />
                    <Text style={{  fontSize: 14, textAlign: 'center' }}>
                        {this.state.direcciontienda}
                    </Text>
                    <View style={{marginBottom:10}} />

                    <View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "center" }}>
                        <TouchableOpacity onPress={() => Linking.openURL(`tel://${this.state.telefonotienda}`).catch(err => console.log('Error:', err))}>
                            <Icon
                                name="call"
                                underlayColor="transparent"
                                iconStyle={styles.telIcon}

                            />
                        </TouchableOpacity>
                        <View style={{ paddingHorizontal: 20 }} />
                        <TouchableOpacity style={styles.smsRow} onPress={() => Linking.openURL(`https://wa.me/52${this.state.telefonotienda}`).catch(err => console.log('Error:', err))}>
                            <Icon2
                                name="logo-whatsapp"
                                underlayColor="transparent"
                                style={styles.smsIcon}

                            />
                        </TouchableOpacity>
                        <View style={{ paddingHorizontal: 20 }} />
                        <TouchableOpacity onPress={() => Linking.openURL(url)}>
                            <Icon3
                                name="directions"
                                underlayColor="transparent"
                                style={styles.telIcon}
                            //onPress={() => onPressEmail()}
                            />
                        </TouchableOpacity>

                    </View>
                    <Text style={{ fontSize: 16, color: "black", textAlign: "center" }}>Tu pedido fue:</Text>
                    {this.renderpedido()}
                    <View style={{marginBottom:10}} />
                    <Text style={{ fontWeight:"bold" ,fontSize: 20, color: "black", textAlign: "center" }}>Total:${this.state.total}</Text>
                    <View style={{marginBottom:10}} />
                    <Text style={{ fontWeight:"bold" ,fontSize: 16, color: "black", textAlign: "center" }}>Tipo de entrega:</Text>
                    <Text style={{  fontSize: 16, color: "black", textAlign: "center" }}>{this.state.tipo}</Text>
                    <View style={{marginBottom:10}} />
                {
                    this.state.tipo== "Servicio a domicilio" ?
                    <View>
                        <Text style={{fontSize:16, textAlign:"center", color:"black", fontWeight:"bold"}}>Recibe:</Text>
                        <Text style={{fontSize:16, textAlign:"center", color:"black"}}>{this.state.nombrecliente}</Text>
                        <Text style={{fontSize:16, textAlign:"center", color:"black", fontWeight:"bold"}}>A la direccion:</Text>
                        <Text style={{fontSize:16, textAlign:"center", color:"black"}}>{this.state.direccioncliente}</Text>
                    </View> :
                    <View>
                     <Text style={{fontSize:16, textAlign:"center", color:"black", fontWeight:"bold"}}>Retirar a nombre de:</Text>
                        <Text style={{fontSize:16, textAlign:"center", color:"black"}}>{this.state.nombrecliente}</Text>
                    </View>
                }
                <View style={{marginTop:10}} />
                
                <Text style={{fontSize:16, color:"black", fontWeight:'bold'}}>Fecha:</Text>
                <Text style={{fontSize:16, color:"black"}}>{Moment(fecha).format('dddd D [de] MMMM [de] YYYY, [a las] h:mm a')}</Text>
                <View style={{marginBottom:10}} />
            </View>
            </ScrollView>
        );

    }




    renderpedido = () => {
        var array = this.state.carritocomprado
        //array.push(this.state.carritocomprado)
        //console.log(Array.isArray(array))

        const arr = [...array].map((item, i) => {
            return (<View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ textAlign: "left", fontSize: 19 }}>{item.food.titulo}   </Text>
                <Text style={{ textAlign: "right", fontSize: 19 }}>${item.precio} x {item.quantity} unidad</Text>
            </View>)
        })
        return arr;

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

    telIcon: {
        color: 'orange',
        fontSize: 35,
    },
    smsIcon: {
        color: 'orange',
        fontSize: 35,
    },
})