import React, {useState} from 'react';
import { Image, StyleSheet, Button, Text, View, TextInput, TouchableOpacity} from 'react-native'; // Componentes nativos do React Native
import Icon from 'react-native-vector-icons/AntDesign'; //Biblioteca de icones
//import { createStore } from 'redux';
//import { Provider } from 'react-redux';

export default function Login({navigation}) {

/*  const countReducer = function (state = 0, action) {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      default:
        return state;
    }
  };

  let store = createStore(countReducer); */

const [user, setUser] = useState('');

  //função para navegar para a segunda tela
  const pressHandler = () => {
    navigation.navigate('Menu');
  }

  return (
  <View style={styles.containerPrincipal}>
    <Text style={styles.title}>Isys Irrigation</Text>
    <Image source={require('../Image/Logo_3.0.png')} style={styles.logo}/>
    <View style={styles.alinhamentoHorizontal}>
      <Icon style={styles.icone} name="user" size={20} color="#55803B"/>
      <TextInput style={styles.input} onChangeText={ text => this.state.user = text} placeholder="   Usuário" />
      </View>
    <View style={styles.alinhamentoHorizontal}>
      <Icon style={styles.icone} name="key" size={20} color="#55803B"/>
      <TextInput style={styles.input} secureTextEntry={true} placeholder="   Senha"/>
    </View>
    <View style={styles.alinhamentoHorizontal}>
      <Icon style={styles.icone} name="login" size={20} color="#55803B"/>
      <TouchableOpacity style={styles.Touchable}>
        <Button title='Avançar' color="#8BCD60" onPress={pressHandler}/>
      </TouchableOpacity>
    </View>
  </View> 
    )

}

//Estilização dos componentes
const styles = StyleSheet.create({

  /* Paleta de cores

#DEFFB2   Verde claro
#8BCD60   Verde neutro
#55803B   Verde escuro
#545454   Cinza
#F4F4F4   Azure

  */

  containerPrincipal: {
    flex: 1,
    backgroundColor: "#DEFFB2",
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'rgb(85, 128, 59)',
    padding: 20,

    fontSize: 30
  },
  logo: {
    height: 300,
    width: 300,
  },
  icone: {
    paddingTop: 5,
    paddingRight: 10
  },
  input: {
    height: 30,
    width: 300,
    color: "#55803B",
    backgroundColor: "#F4F4F4" ,
    fontSize: 15,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  alinhamentoHorizontal: {
    flexDirection: 'row',
    marginTop: 5
  },
  Touchable: {
    height: 35,
    width: 300
  }
});