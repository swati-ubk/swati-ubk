import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {ConfigFile} from '../../service/ConfigFile';
import {globalcolor} from '../../style/globalcolor';
import WebService from '../../service/WebService';
import {useTheme} from '@react-navigation/native';
export default Categories = data => {
  //  console.log('Category Components..', data);
  const [loading, setLoading] = useState(false);
  const [dataSource1, setDataSource1] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);

  //const [offset, setOffset] = useState(0);
  const [isListEnd, setIsListEnd] = useState(false);
  useEffect(() => getCategories(), []);
  const theme = useTheme();
  const getCategories = () => {
    WebService.GetData('category')
      .then(response => response.json())
      .then(responseJson => {
        console.log('categoryData...', JSON.stringify(responseJson));
        // console.log('length='+responseJson.length)
        if (responseJson.length > 0) {

          WebService.myProductArray=[];

         
          for (var i = 0; i < responseJson.length; i++) {

            let object2 = {};
            //responseJson.map(item => {
              (object2['id'] = responseJson[i].value),
              (object2['name'] = responseJson[i].name),
              //object2['id']=responseJson[i].value;
             // object2['name']=responseJson[i].name;
             // object2[`${responseJson[i].value}`] = responseJson[i].name
              //object2[`${responseJson[i].value}`] = responseJson[i].name
           // });
            console.log('====99===>', object2);

            WebService.myProductArray.push(object2)
         //   var obj={`responseJson[i].name`:responseJson[i].name};
              //console.log("===44==",obj);
          }

          var FirstCategory = [];
          for (var i = 0; i < 4; i++) {
            FirstCategory.push(responseJson[i]);
          }
          setDataSource1([...dataSource1, ...FirstCategory]);
         
          var SecondCategory = [];
          for (var i = 4; i < 7; i++) {
            console.log("dfsvefsdfedfs------",responseJson[i])
            SecondCategory.push(responseJson[i]);
          }
          var object3={} 
         
          object3['name'] = 'More';
        
          SecondCategory.push(object3)
          setDataSource2([...dataSource2, ...SecondCategory]);
        } else {
          setIsListEnd(true);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View>
      <View style={styles.categoryContainer}>
        {dataSource1.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryBtn}
            onPress={() => {
              data.data.props.navigation.navigate('StoreListScreen', {
                Catvalue: value.value,
                catNamee: value.name,
                location: data.data.location,
                formatted_address: data.data.formatted_address,
              });
            }}>
            <View style={styles.categoryIcon}>
               <Image 
                 source={{uri: ConfigFile.ImageBaseUrl + value.photos[0].path}} 
                 style={styles.ImageStyle}
               />
            </View>
            {/* <Text style={styles.categoryBtnTxt}>{globalcolor.ImageBaseUrl+value.photos[0].path}</Text>  */}
            <Text style={styles.categoryBtnTxt}>
              {value.name.substring(0, 10)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.categoryContainer}>
        {dataSource2.map((value, index) => (


                value.name ==='More' ?
                 <TouchableOpacity
                  style={styles.categoryBtn}
                  onPress={() => {
                  data.data.props.navigation.navigate('AllCategories');
                     }}>
                   <View style={styles.categoryIcon}>
                   <Image
                    source={require('../../assets/img/more-3.png')} 
                    style={styles.ImageStyle}
                    />
              </View>
              <Text style={styles.categoryBtnTxt}>More</Text>
             </TouchableOpacity> 
              : 
               <TouchableOpacity
                  key={index}
                  style={styles.categoryBtn}
                  onPress={() =>
                 data.data.props.navigation.navigate('StoreListScreen', {
                  Catvalue: value.value,
                 catNamee: value.name,
                   location: data.data.location,
                })
             }>
     <View style={styles.categoryIcon}>
    
       <Image
         source={{uri: ConfigFile.ImageBaseUrl + value.photos[0].path}} 
         style={styles.ImageStyle}
       /> 
     </View>
     <Text style={styles.categoryBtnTxt}>
       {value.name.substring(0, 10)}
    </Text>
  </TouchableOpacity>
                  
       
  
  
  
  
  
  
  
  
  
  
  
  
  

         ) )}
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
    //  width: 60,
    // height: 60,
    backgroundColor: globalcolor.Textcolor /* '#FF6347' */,
    // borderRadius: 10,
    //  borderWidth:1,
    borderColor: globalcolor.SeconderColor,
  },
  ImageStyle: {
    padding: 8,
    margin: 5,
    height: 70,
    width: 70,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  categoryBtnTxt: {
    fontFamily: globalcolor.Font,
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
