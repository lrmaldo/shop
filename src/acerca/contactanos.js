import React, { Component } from "react";
import { Container, Content, Textarea, Form } from "native-base";
import Icon2 from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements'
import { StyleSheet, Alert } from 'react-native'
   




export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      message: "",

    }
  }


  enviar = async () => {
    // console.log(this.state.message)

    this.setState({ visible: !this.state.visible });
    var that = this;
    //array del mensaje que ira en el body
    let mensaje = {
      mensaje: this.state.message,
    }

    console.log(JSON.stringify(mensaje));
    //cambiar el url 
    var url = "http://markettux.sattlink.com/api/recursos/cuentame";
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mensaje)
    }).then(function (response) {
      return response.json();
    }).then(function (result) {
      //console.log(result);
      if (!result.error) {

        that.setState({ visible: false });
        Alert.alert(result.message);
        that.setState({ message: "" })
        //that.props.navigation.navigate('Finalizar');
        //Toast.showWithGravity(result.message, Toast.LONG, Toast.CENTER);
      } else {
        // Alert.alert(result.error_msg);
        console.log(result);
      }
    }).catch(function (error) {
      console.log("-------- error ------- " + error);
      that.setState({ visible: false });
      //Toast.showWithGravity("Ocurrio un problema", Toast.LONG, Toast.CENTER);

    });
  }


  componentDidMount() {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
  }


  render() {


    return (
      <Container>

        <Content padder>

          <Form>
            <Textarea rowSpan={5} bordered placeholder="Cuentanos tu problema..."
              onChangeText={message => this.setState({ message: message })}
              value={this.state.message} />
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
              loading={this.state.visible ? true : false}
              onPress={this.enviar}
            />
          </Form>
        </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 25,
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