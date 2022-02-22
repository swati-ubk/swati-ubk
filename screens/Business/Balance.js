import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    FlatList,
    Image,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
  } from 'react-native';
  import {globalcolor} from '../../style/globalcolor';
  import {globalstyle} from '../../style/globals';
  import FontAwesome from 'react-native-vector-icons/Ionicons';
  import { Button } from "react-native-paper";

  const List = [
    {
      name: 'SETNORB1neK',
      date: '08/04/2021',
      time: '03.30 pm',
      amount: '₹ 9.02 '
    },
    {
        name: 'SETNORB1neKP',
        date: '08/04/2021',
        time: '03.30 pm',
        amount: '₹ 9.02 '
    },
    {
        name: 'SETNORB1neKD',
        date: '08/04/2021',
        time: '03.30 pm',
        amount: '₹ 9.02 '
    },
    {
        name: 'SETNORB1neKX',
        date: '08/04/2021',
        time: '03.30 pm',
        amount: '₹ 9.02 '
    },
    {
        name: 'SETNORB1neKS',
        date: '08/04/2021',
        time: '03.30 pm',
        amount: '₹ 9.02 '
    },
    {
        name: 'SETNORB1neKA',
        date: '08/04/2021',
        time: '03.30 pm',
        amount: '₹ 9.02 '
    },
    {
        name: 'SETNORB1neKV',
        date: '08/04/2021',
        time: '03.30 pm',
        amount: '₹ 9.02 '
    },
    {
        name: 'SETNORB1neKQ',
        date: '08/04/2021',
        time: '03.30 pm',
        amount: '₹ 9.02 '
    },
    {
        name: 'SETNORB1neKT',
        date: '08/04/2021',
        time: '03.30 pm',
        amount: '₹ 9.02 '
    },
  ];

  

  const Balance=()=>{

    const renderItem = ({ item }) => {
      return(

        <View style={{elevation:1,minHeight:10,borderRadius:2}} >
                        <View style={{flexDirection:'row',position:'relative',justifyContent:'space-around',paddingVertical:10,}}>
                            <Text style={{color:globalcolor.PlaceHolderColor,}}>{item.name}</Text>
                                <View style={{flexDirection:'column',justifyContent:'center'}}>
                                <Text style={{color:globalcolor.PlaceHolderColor,}}>{item.date} </Text>
                                <Text style={{color:globalcolor.PlaceHolderColor,}}>{item.time} </Text>
                                </View>
                            <Text style={{color:globalcolor.PlaceHolderColor,}}>{item.amount}</Text>
                            
                        </View>
                    </View>
      );

    }
       
      
    

    return(
        <SafeAreaView style={styles.container}>
            
                <View>
                    <View style={styles.text_style}>
                        <Text style={styles.font} >Available Balance</Text>
                            <View style={styles.main_txt}>
                                <FontAwesome
                                    name="sync"
                                    size={20}
                                    color={globalcolor.PrimaryColor}/>
                            </View> 

                    </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.large_txt} >₹ 439.55</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Button 
                                            style={styles.Button}>
                                              <FontAwesome name="flash"size={20}
                                                color={globalcolor.Textcolor}/>  
                                            <Text style={styles.box_text}>Settle now</Text>
                                        </Button>
                                    </View>
                            </View>


                 {/* Available Balance List */}
                <View style={styles.list_position}>
                    <View style={styles.list_box} >
                        <View style={styles.list_style}>
                            <Text style={{color:globalcolor.PrimaryColor,}}>Reference ID</Text>
                                <Text style={{color:globalcolor.PrimaryColor,}}>Requested At</Text>
                                    <Text style={{color:globalcolor.PrimaryColor,}}>Settle Amount</Text>
                                        <FontAwesome name="arrow-forward"
                                            size={20}
                                            color={globalcolor.PrimaryColor}/>
                        </View>
                    </View>

                 <View>
                        <FlatList
                            data={List}
                            renderItem={renderItem}   
                        />
                 </View>

                </View>    
            </View>
       
    </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    
      // marginTop:80,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        color:'#000',
        fontSize:10,
      },
    text_style:{
        marginTop:80,
       marginHorizontal:20,
       flexDirection:'row'
        
    },
    Button:{
        backgroundColor:'#FD7729',
        color:'#fff',
        marginLeft:80,
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        
        
    },
    list_style:{
        flexDirection:'row',position:'relative',marginHorizontal:10,justifyContent:'space-between',paddingVertical:15
    },
    list_box:{
        elevation:1,minHeight:10,borderRadius:10
    },
    list_position:{
        flex:1,marginHorizontal:10,marginTop:20,marginBottom:20, borderRadius:10,minHeight:400
    },
    font:{
        fontSize:18,color:globalcolor.PlaceHolderColor
    },
    box_text:{
        color:'#fff',fontFamily:'Lato',fontSize:12, textTransform:'capitalize'
    },
    large_txt:{
        fontSize:25,marginHorizontal:20
    },
    main_txt:{
        position: 'absolute',zIndex: 1,marginLeft:150
    }
})

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  

  export default Balance