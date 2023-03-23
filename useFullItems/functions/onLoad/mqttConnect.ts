import { constants } from "../../constants/constants";
import { getLocalStorageData } from "../../localStorage";
import { mqttFunction } from "../../mqtt";
import { Alert } from "react-native";
import Paho from "paho-mqtt";

export const mqttConnect = async (restaurantId: string) => {
  const selfDetail = await getLocalStorageData("selfDetail");

  const client = new Paho.Client(
    "mqtt.eatrofoods.com",
    8883,
    selfDetail?.id || Math.round(Math.random() * 10000000000)
  );

  client.onMessageArrived = function (message) {
    try {
      mqttFunction(JSON.parse(message.payloadString));
    } catch (error) {
      console.log("mqttFunction error", error);
    }
  };
  client.connect({
    useSSL: true,
    onSuccess: function () {
      if (constants.IS_DEVELOPMENT) console.log("mqtt connected");
      const topicSelected = constants.mqttSubsribeTopic(restaurantId);
      client.subscribe(topicSelected);
    },
    onFailure: (cause) => {
      if (constants.IS_DEVELOPMENT) console.log("mqtt not connected", cause);
      Alert.alert("Some issues please restart app");
    },
  });

  // let reconnectAttempt = 5;
  /*   client.onConnectionLost = (error: Paho.MQTTError) => {
    if (constants.IS_DEVELOPMENT) console.log("connection lost", error);
    if (reconnectAttempt > 0) {
      if (client.isConnected() === false) {
        console.log("is mqtt connected", client.isConnected());
        client.connect({
          useSSL: true,
          onSuccess: function () {
            if (constants.IS_DEVELOPMENT) console.log("mqtt re-connected");
            reconnectAttempt -= 1;
            const topicSelected = constants.mqttSubsribeTopic(restaurantId);
            client.subscribe(topicSelected);
          },
          onFailure: (cause) => {
            if (constants.IS_DEVELOPMENT)
              console.log("mqtt not connected", cause);
          },
        });
      }
    } else {
      Alert.alert("Some issues please restart app");
    }
  }; */
};
