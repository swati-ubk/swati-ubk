import React, {useState, useEffect} from 'react';
import {View,Text,Image,TouchableOpacity,StyleSheet} from 'react-native';
import { globalcolor } from '../../style/globalcolor';
import WebService from '../../service/WebService';
import {useTheme} from '@react-navigation/native';
 export default Categories = (data) => {
    const [loading, setLoading] = useState(false);
    const [dataSource1, setDataSource1] = useState([]);
    const [dataSource2, setDataSource2] = useState([]);
    
    //const [offset, setOffset] = useState(0);
    const [isListEnd, setIsListEnd] = useState(false);
    useEffect(() => getCategories(), []);
    const theme = useTheme();
    const getCategories =  () => {
  
        WebService.GetData('category')
        .then((response) => response.json())
           .then((responseJson) => {
             //console.log(responseJson);
            // console.log('length='+responseJson.length)
             if (responseJson.length > 0) {
               var FirstCategory=[];
               for(var i=0;i<4;i++){
                FirstCategory.push(responseJson[i]);
               }
               setDataSource1([...dataSource1, ...FirstCategory]);
               var SecondCategory=[];
               for(var i=4;i<8;i++){
                SecondCategory.push(responseJson[i]);
               }
               setDataSource2([...dataSource2, ...SecondCategory]);

             } else {
               setIsListEnd(true);
               setLoading(false);
             }
           })
           .catch((error) => {
             console.error(error);
           });
       }
       
  return (
      <View>
         <View style={styles.categoryContainer}>
             {dataSource1.map((value, index) => (
                <TouchableOpacity key={index}
                      style={styles.categoryBtn}
                      onPress={() => {data.data.navigation.navigate('StoreListScreen',{Catvalue:value.value}) }}
                      >
                      <View style={styles.categoryIcon}>
                      <Image
                            source={require('../../assets/img/grocery-cart.png')} //Change your icon image here
                            style={styles.ImageStyle}
                        />
                      </View>
                        <Text style={styles.categoryBtnTxt}>{value.name.substring(0, 10)}</Text>
                  </TouchableOpacity>
                     ))}
           </View>
           <View style={styles.categoryContainer}>
             {dataSource2.map((value, index) => (
                <TouchableOpacity key={index}
                      style={styles.categoryBtn}
                      onPress={() =>
                        data.data.navigation.navigate('StoreListScreen',{Catvalue:value.value})
                      }>
                      <View style={styles.categoryIcon}>
                      <Image
                            source={require('../../assets/img/grocery-cart.png')} //Change your icon image here
                            style={styles.ImageStyle}
                        />
                      </View>
                        <Text style={styles.categoryBtnTxt}>{value.name.substring(0, 10)}</Text>
                  </TouchableOpacity>
                     ))}
           </View>
      </View>
    
           
           
  );
};




const styles = StyleSheet.create({
    categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 60,
        height: 60,
        backgroundColor:globalcolor.Textcolor /* '#FF6347' */,
        borderRadius: 10,
        borderWidth:1,
        borderColor:globalcolor.SeconderColor

      },
      ImageStyle: {
        padding: 8,
        margin: 5,
        height: 35,
        width: 35,
        resizeMode: 'stretch',
        alignItems: 'center',
        
    },
    categoryBtnTxt: {
        fontFamily:globalcolor.Font,
        alignSelf: 'center',
        marginTop: 5,
        color: globalcolor.SeconderColor,
      },
      categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
      },
      categoryBtn: {
        flex: 1,
        width: '20%',
        marginHorizontal: 0,
        alignSelf: 'center',
        
      },
});
