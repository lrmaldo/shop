import  React, { Component } from "react";
import { Container, Content, Textarea, Form} from "native-base";
import Icon2 from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements'
import {StyleSheet} from 'react-native'


export default class App extends Component{

    constructor(props){
        super(props);
        this.state ={
            visible:false,
            message:""
        }
    }


    enviar =() =>{
        console.log(this.state.message)
    }

    render(){
        return(
            <Container>
        
        <Content padder>
            
          <Form>
            <Textarea rowSpan={5} bordered placeholder="Cuentanos tu problema..." onChangeText={message=> this.setState({message: message})} />
            <Button
                                  buttonStyle={styles.button}
                                    icon={
                                      <Icon2
                                      name="md-checkmark-circle"
                                      size={25}
                                      color="white"

                                      //style={{marginStart:20}}
                                      />
                                          }
                                title="  Enviar"
                                loading={this.state.visible? true:false}
                                onPress={this.enviar}
                                />
          </Form>
        </Content>
        
      </Container>
        );
    }
}

const styles = StyleSheet.create({
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
})