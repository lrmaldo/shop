import React, { Component } from "react"

import {View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'

// import icons
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from "react-native-gesture-handler";
export default class App extends Component{



   
    render(){
        return(<ScrollView>
                <View style={{flex:1, alignItems:"center",justifyContent:"center", marginTop:30}}>
                    <Text style={styles.titulo}>Politicas de privacidad</Text>
                    <View style={{marginTop:10}}></View>
                    <Text style={styles.parrafo}>El presente Política de Privacidad establece los términos en que Markettux by Sattlink usa y 
                        protege la información que es proporcionada por sus usuarios al momento de utilizar la Aplicación. 
                        Esta compañía está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos 
                        revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.</Text>
                
                    <View style={{marginTop:10}}></View>
                    <Text style={styles.titulo}>Información que es recogida</Text>
                    <View style={{marginTop:10}}></View>
                    <Text style={styles.parrafo}>Nuestra Aplicación podrá recoger información personal por ejemplo: Nombre, 
                     información de contacto como  su dirección de correo electrónica e información demográfica. 
                     Así mismo cuando sea necesario podrá ser requerida información específica para procesar algún pedido o realizar una entrega o facturación.</Text>
                    
                     <Text style={styles.titulo}>Uso de la información recogida </Text>
                    
                     <Text style={styles.parrafo}>Nuestra Aplicación emplea la información con el fin de proporcionar el mejor 
                     servicio posible, particularmente para mantener un registro de usuarios, de pedidos en caso que aplique,
                    y mejorar nuestros productos y servicios.  Es posible que sean enviados correos electrónicos periódicamente a través de nuestro sitio con ofertas especiales, nuevos productos y otra información publicitaria que consideremos relevante para usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la dirección que usted proporcione y podrán ser cancelados en cualquier momento.
                    Markettux by Sattlink está altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.</Text>
                    
                    <Text style={styles.titulo}>Enlaces a Terceros</Text>
                    
                    <Text style={styles.parrafo}>
                    Este sitio web pudiera contener en laces a otros sitios que pudieran ser de su interés. 
                    Una vez que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control
                     sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o
                      privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios 
                      están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los 
                      consulte para confirmar que usted está de acuerdo con estas.
                    </Text>

                    <Text style={styles.titulo}>Control de su información personal </Text>
                    
                    <Text style={styles.parrafo}>
                    En cualquier momento usted puede restringir la recopilación o el uso de la información personal que
                    es proporcionada a nuestro sitio web.  Cada vez que se le solicite rellenar un formulario, como el de alta de usuario, puede marcar o desmarcar la opción de recibir información por correo electrónico.  En caso de que haya marcado la opción de recibir nuestro boletín o publicidad usted puede cancelarla en cualquier momento.
                    Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento,
                    salvo que sea requerido por un juez con un orden judicial.

                    Markettux by Sattlink Se reserva el derecho de cambiar los términos de la presente 
                    Política de Privacidad en cualquier momento.
                    </Text>
                    <View style={{marginBottom:20}}></View>
                </View>
        </ScrollView>)
    }
}

const styles = StyleSheet.create({
    titulo:{
        textAlign:"justify", 
        fontSize:20, 
        fontWeight:"bold", 
        fontStyle:"normal",
        marginTop:10,
        marginBottom:10,
    },
    parrafo:{
        fontStyle:"normal",
        textAlign:"justify", 
        marginLeft:25, 
        marginRight:25, 
        fontSize:15,
    }
})