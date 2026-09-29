import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import Checkbox from "expo-checkbox";

import {
  useFonts,
  WorkSans_400Regular,
} from "@expo-google-fonts/work-sans";

import { Nunito_700Bold } from "@expo-google-fonts/nunito";

type ContactProps = {
  navigation: any;
};

const Contact = ({ navigation }: ContactProps) => {
  const [fontsLoaded] = useFonts({
    WorkSans_400Regular,
    Nunito_700Bold,
  });

  // Hooks must come before the fontsLoaded check
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);

  const submit = () => {
    if (!name && !email && !phone && !message) {
      Alert.alert("Plzz fill all the fields");
    } else {
      Alert.alert(`Thank You ${name}`);
      navigation.navigate("Home");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeader}>
        Level up your knowledge
      </Text>

      <Text style={styles.description}>
        You can reach us anytime via thapa@vinod.com
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Enter your name</Text>

        <TextInput
          style={styles.inputStyle}
          placeholder="vinod thapa"
          value={name}
          onChangeText={(userdata) => setName(userdata)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Enter your Email</Text>

        <TextInput
          style={styles.inputStyle}
          placeholder="demo@thapa.com"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Enter your mobile</Text>

        <TextInput
          style={styles.inputStyle}
          placeholder="vinod thapa"
          value={phone}
          onChangeText={(phone) => setPhone(phone)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}>
          How can we help you?
        </Text>

        <TextInput
          style={[
            styles.inputStyle,
            styles.multilineStyle,
          ]}
          placeholder="Tell us about your self"
          value={message}
          onChangeText={(msg) => setMessage(msg)}
          numberOfLines={5}
          multiline={true}
        />
      </View>

      <View style={styles.wrapper}>
        <Checkbox
          value={agree}
          onValueChange={() => setAgree(!agree)}
          color={agree ? "#4630EB" : undefined}
        />

        <Text style={styles.wrapperText}>
          I have read and agreed with the TC
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.buttonStyle,
          {
            backgroundColor: agree
              ? "#4630EB"
              : "grey",
          },
        ]}
        disabled={!agree}
        onPress={submit}
      >
        <Text style={styles.buttonText}>
          Contact Us
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  mainHeader: {
    fontSize: 25,
    color: "#344055",
    textAlign: "center",
    fontFamily: "Nunito_700Bold",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: "#7d7d7d",
    textAlign: "center",
    fontFamily: "WorkSans_400Regular",
    marginBottom: 20,
  },

  inputContainer: {
    marginBottom: 15,
  },

  labels: {
    fontSize: 16,
    marginBottom: 5,
    color: "#344055",
    fontFamily: "Nunito_700Bold",
  },

  inputStyle: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: "WorkSans_400Regular",
  },

  multilineStyle: {
    height: 120,
    textAlignVertical: "top",
  },

  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },

  wrapperText: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: "WorkSans_400Regular",
  },

  buttonStyle: {
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#eee",
    fontSize: 18,
    fontFamily: "WorkSans_400Regular",
  },
});

export default Contact;