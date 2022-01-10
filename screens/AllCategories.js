import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { globalstyle } from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ConfigFile } from '../service/ConfigFile';
import { globalcolor } from '../style/globalcolor';
import { Avatar } from 'react-native-paper';
import WebService from '../service/WebService';
const AllCategories = (probs) => {
  //console.log("==========All category==========");
  // console.log(probs.navigation.navigate);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([]);
  useEffect(() => getCategories(), []);

  const getCategories = () => {
    setLoading(true);
    WebService.GetData('category')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.length > 0) {
          setLoading(false);
          console.log('all category');
          console.log(responseJson);
          setData(responseJson);
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }
  const ActivityIndicatorShow = () => {
    return (
      <View >
        {loading ? (
          <ActivityIndicator
            size="large"
            color={globalcolor.PrimaryColor}
            style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center' }}

          />
        ) : null}
      </View>
    )
  }

  return (
    data.length > 0 ?

      <ScrollView style={styles.container}>

        <SafeAreaView>
          {data.map((value, index) => (
            <TouchableOpacity key={index}

              onPress={() => { probs.navigation.navigate('StoreListScreen', { Catvalue: value.value }) }}
            >
              <View style={globalstyle.ListCategoryrow}

              >
                <View style={globalstyle.ListFirstCategoryIcon}>
                  <Image
                    source={{ uri: ConfigFile.ImageBaseUrl + value.photos[0].path }} //Change your icon image here
                    style={[globalstyle.ListCategoryImage]}
                  />
                </View>
                <View style={globalstyle.ListBodyCategory}>
                  <Text style={globalstyle.ListText}>{value.name}</Text>
                </View>
                <View style={globalstyle.ListSecondIcon}>
                  <FontAwesome name="chevron-right" color={globalcolor.SeconderFontColor} size={20} />
                </View>
              </View>
            </TouchableOpacity>
          ))}


        </SafeAreaView>

      </ScrollView>
      :
      <View style={globalstyle.ActivityContainer}>
        {ActivityIndicatorShow()}
        <Text style={globalstyle.ActivityIndicator}>Loading please wait....</Text>
      </View>
  );
};

export default AllCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,

  },
  profile: {
    flex: 1,
    alignItems: 'center',
    textAlignVertical: 'center',
    marginBottom: 10
  },
});
