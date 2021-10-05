import React, {useState, useEffect} from 'react';
import {globalstyle} from '../style/globals.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {globalcolor} from '../style/globalcolor';
import {ConfigFile} from '../service/ConfigFile';
//import {WebService} from '../service/WebService.js';

import WebService from '../service/WebService';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image
} from 'react-native';
import { Button } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

const StoreListScreen = (props) => {
  
  //console.log(props.route.params.Catvalue);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isListEnd, setIsListEnd] = useState(false);
 // setLoading(false);
 // setIsListEnd(true);
  useEffect(() => getData(), []);
  const  getData = () => {
    //console.log(offset);
    if (!loading && !isListEnd) {
        setLoading(true);
      console.log('getData');
      WebService.GetData('search/business?category='+props.route.params.Catvalue+'&lat=25.5940947&lng=85.1375645&formattedAddress=Patna%2C%20Bihar%2C%20India&city=Patna&state=BR&limit=20&skip='+offset)
     .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          console.log('length='+responseJson.length)
          if (responseJson.length > 0) {
            setOffset(offset + 1);
            setDataSource([...dataSource, ...responseJson]);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator 
            size="large"
            color={globalcolor.PrimaryColor}
            style={{margin: 15}} />
        ) : null}
      </View>
    );
  };

  const ItemView = ({item}) => {
    //console.log(globalcolor.ImageBaseUrl+item.photos[0].path);
    let status='Close';
    item.isOpen? status='Open':'Close';
    return (
      <View style={styles.ProductListrow}>
        <View style={styles.ProductlistFirstItem}>
              <Image
              source={{uri:ConfigFile.ImageBaseUrl+item.photos[0].path}} //Change your icon image here
              style={[styles.ProductImage]}
              />
        </View>
        <View style={styles.ListBody}>
              <Text style={globalstyle.ListPrimaryText}>{item.name}</Text>
              <Text style={styles.SlugListText}>{item.slug}</Text>
              <Text style={styles.Productdesc}>{item.description.substring(0, 65)}</Text>
              <Text  style={item.isOpen?{ color:globalcolor.Successcolor}:{ color:globalcolor.Errorcolor}} > {status} </Text>
              
        </View>
        <View style={styles.ListSecondIcon}>
           <Text style={globalstyle.Ratingbutton}>{item.rating}</Text>
        </View>
    </View>
      
    );
  };
  
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <SafeAreaView style={{flex: 1,marginTop:40}}>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ProductlistFirstItem:{
  width:'30%'
},
ListBody:{
  marginLeft:10,
 // margin:10,
  width:'60%',
  padding:10
  
,
},
ListSecondIcon:{
  width:'20%',
},
ProductListrow:{
  marginLeft:10,
  marginRight:40,
  flexDirection:'row',
  //marginTop:20,
  marginVertical: 10,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  
  elevation: 5,
 
  //borderColor:globalcolor.Separator,
  //borderWidth:1,
},
ProductImage:{
  height: 100,
  width:  100,
  borderRadius:10
},
SlugListText:{
  fontFamily:globalcolor.Font,
  color:globalcolor.SeconderFontColor,
  marginTop:2,
  fontWeight:'bold'
},
Productdesc:{
  fontFamily:globalcolor.Font,
  color:globalcolor.SeconderFontColor
}

});

export default StoreListScreen;