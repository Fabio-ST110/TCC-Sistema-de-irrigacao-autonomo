import React, { useState }  from 'react';
import { StyleSheet, Button, Text, View, Switch, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt'; //Biblioteca para conexão mqtt

export default function Main() {

/*const pressHandler = () => {
  client.publish('ISystem/TCC', '1');
  setTimeout( () => {
    client.publish('ISystem/TCC', '0');
  }, 2000);
}
*/

const [umidade, setUmidade] = useState(null)
const [temperatura, setTemperatura] = useState(null)

  init({ 
    size: 10000,
    storageBackend: AsyncStorage, 
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    reconnect: true,
    sync : {}
  });
  
  // conecta o React Native com os topicos do MQTT, cada topico deve ser declarado separadamente
  function onConnect() { 
    console.log("onConnect");
    client.subscribe('ISystem/umidade');
    client.subscribe('ISystem/temperatura'); 
    client.subscribe('ISystem/TCC')
  }
  
  //Mensagem de erro caso a conexão seja perdida
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }
  
  //Nesta função o React importa os dados que estão armazenados na nuvem
  function onMessageArrived(message) {
    var dht = "\nTopic : "+message.topic+"\nMessage : "+message.payloadString;
     
    //console.log(message.payloadString)
    if(message.topic == 'ISystem/temperatura') {
      setTemperatura(message.payloadString)
    }
    if(message.topic == 'ISystem/umidade') {
      setUmidade(message.payloadString)
    }
  } 
  
  //criação do cliente para conexão
  const client = new Paho.MQTT.Client(
    "broker.hivemq.com",                                      //url para conexão
    8000,                                                     //porta de saída dos dados
    "clientID-" + parseInt(Math.random() * 100)               //cria um ID aleatório para o cliente
  );
  client.onMessageArrived = onMessageArrived;
  client.connect({ onSuccess:onConnect, useSSL: false });
  client.onConnectionLost = onConnectionLost;

  const [isEnabled, setIsEnabled] = useState(false);
  const alternarSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if(isEnabled == false){
      client.publish('ISystem/TCC', '1');
    }
    if(isEnabled == true){
      client.publish('ISystem/TCC', '0');
    }
    console.log(isEnabled);
  }

  const clickHandler = () => {
      alert('O Isys Irrigation funciona de forma autonoma, ative o sistema manualmente apenas em caso de necessidade.');
  }

  return (
    <View style={styles.containerPrincipal}>

      <View style={styles.containerUser}>
        <Text style={styles.textUser}> Olá </Text>
      </View>

      <View style={styles.containerUmidade}>
        <View style={styles.containerText}>
          <Text style={styles.textDados}>Umidade do ar </Text>
        </View>
        <View style={styles.containerDados}>
          <Text style={styles.exibirDados}>{umidade}%</Text>
        </View>
      </View>
          
      <View style={styles.containerTemperatura}>
        <View style={styles.containerText}>
          <Text style={styles.textDados}>Temperatura do ar</Text>
        </View>
        <View style={styles.containerDados}>
          <Text style={styles.exibirDados}>{temperatura}°</Text>
        </View>
      </View>
      
      <View style={styles.containerLigar}>
        <Text style={styles.textDados}> Ativar o sistema manualmente </Text>
        <TouchableOpacity style={styles.iconeLigar}>
          <Icon name="exclamation-circle" size={20} color="#8BCD60" onPress={clickHandler}/>
        </TouchableOpacity>
      </View>

        <Switch
          style={[styles.containerSwitch, { transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }] }]}
          trackColor={{false: "F4F4F4", true: "#55803B"}}
          thumbColor={!isEnabled ? "545454" : "#8BCD60"}
          onValueChange={alternarSwitch}
          value={isEnabled}
        />
      
      <View style={styles.containerHorario}>
        <Text style={styles.textHorario}></Text>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  containerPrincipal: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: 16, 
    fontWeight: 'bold',
    backgroundColor: "#F4F4F4",
  },
  containerUser: {
    backgroundColor: "#8BCD60",
    height: '10%',
    width: '100%',
    justifyContent: "center",
    alignItems: "center"
  },
  textUser: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: "#F4F4F4"
  },
  containerUmidade: {
    height: "30%",
    flexDirection: 'row',
    padding: 20
  },
  containerTemperatura: {
    height: "30%",
      flexDirection: 'row',
      padding: 20
  },
  containerText: {
    height: 100,
    width: 200,
    justifyContent: "center",
    borderRadius: 10
  },
  textDados: {
    color: "#55803B",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20
  },
  containerDados: {
    height: 100,
    width: 150,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#8BCD60"
  },
  exibirDados: {
    color: "#F4F4F4",
    fontSize: 40,
  },
  containerLigar: {
    flexDirection: 'row',
    height: "10%"
  },
  iconeLigar: {
    paddingTop: 20
  },
  containerSwitch: {
    height: "10%"
  },
  containerHorario: {
    backgroundColor: "#8BCD60",
    height: '10%',
    width: '100%',
    justifyContent: "center",
    alignItems: "center"
  },
  textHorario: {
    fontSize: 16, 
    fontWeight: 'bold',
    color: "#545454"
  }
});
