import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";

import {
  useFonts,
  WorkSans_400Regular,
} from "@expo-google-fonts/work-sans";

import { Nunito_700Bold } from "@expo-google-fonts/nunito";

type UserDataType = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  image: string;
};

const UserData = () => {
  const [fontsLoaded] = useFonts({
    WorkSans_400Regular,
    Nunito_700Bold,
  });

  // Hooks MUST come before the fontsLoaded return
  const [isLoaded, setIsLoaded] = useState(true);
  const [myData, setMyData] = useState<UserDataType[]>([]);

  const getUserData = async () => {
    try {
      const response = await fetch(
        "https://thapatechnical.github.io/userapi/users.json"
      );

      const realData: UserDataType[] = await response.json();

      setMyData(realData);
      setIsLoaded(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const showUserData = ({ item }: { item: UserDataType }) => {
    return (
      <View style={styles.card}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.imgStyle}
            source={{ uri: item.image }}
          />
        </View>

        <View>
          <View style={styles.bioDataContainer}>
            <Text style={styles.bioData}>Bio-Data</Text>

            <Text style={styles.idNumber}>
              {item.id < 10 ? `#0${item.id}` : `#${item.id}`}
            </Text>
          </View>

          <View style={styles.mainContain}>
            <Text style={styles.myName}>
              Name: {item.name}
            </Text>

            <Text style={styles.myName}>
              email: {item.email}
            </Text>

            <Text style={styles.myName}>
              mobile: {item.mobile}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.mainHeader}>
        List of Students
      </Text>

      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={myData}
        renderItem={showUserData}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    fontSize: 25,
    textAlign: "center",
    color: "#344055",
    fontFamily: "Nunito_700Bold",
    marginVertical: 20,
  },

  card: {
    width: 300,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 8,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },

  imgContainer: {
    alignItems: "center",
  },

  imgStyle: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },

  bioDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  bioData: {
    fontSize: 20,
    fontFamily: "Nunito_700Bold",
  },

  idNumber: {
    fontSize: 18,
    fontFamily: "WorkSans_400Regular",
  },

  mainContain: {
    marginTop: 15,
  },

  myName: {
    fontSize: 16,
    marginVertical: 5,
    fontFamily: "WorkSans_400Regular",
  },
});

export default UserData;