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
    ActivityIndicator,
  } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {globalstyle} from '../../style/globals.js';
import { globalcolor } from '../../style/globalcolor';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import { Dimensions } from "react-native";
  import Svg, { Polygon } from 'react-native-svg';

const VendorHome=()=>{

  // const data = {
  //   labels: ["Test1", "Test2"],
  //   legend: ["L1", "L2", "L3"],
  //   data: [
  //     [60, 60, 60],
  //     [30, 30, 60]
  //   ],
  //   barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
  // };

  // const chartConfig={
  //   backgroundColor:"#e26a00",
  //   backgroundGradientFrom: "#fb8c00",
  //   backgroundGradientTo: "#ffa726",
  //   decimalPlaces: 2, // optional, defaults to 2dp
  //   color:(opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //   labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  // }

    const renderFooter = () => {
        return (
      // Footer View with Loader
      <View style={styles.footer}>
          <ActivityIndicator
            size="large"
            color={globalcolor.PrimaryColor}
            style={{margin: 15}}
          />
        
      </View>
    );
  };

    return(
        
        <SafeAreaView>

            {/* Header */}
            <View style={styles.header}>
                <Text>Header</Text>
            </View>

            <View>
                <View style={styles.text_header}>
                <Text>Todays order/earning</Text>
                </View>
            {/* Order Cart */}
            <View style={{flexDirection:'row',flex:1,marginBottom:40}}>
                <View style={styles.box}>
                    <View style={styles.font}>
                    <Text style={globalstyle.PrimaryText}>Total</Text>
                    <Text style={globalstyle.PriceText}>0($0.00)</Text>
                    </View>
                </View>
                <View style={styles.box_2}>
                    <View style={styles.font}>
                    <Text style={globalstyle.PrimaryText}>Total</Text>
                    <Text style={globalstyle.PriceText}>0($0.00)</Text>
                    </View>
                </View>
            </View>

            <View style={{flexDirection:'row',flex:1,marginTop:50 }}>
                <View style={styles.box_3}>
                <View style={styles.font}>
                    <Text style={globalstyle.PrimaryText}>Total</Text>
                    <Text style={globalstyle.PriceText}>0($0.00)</Text>
                    </View>  
                </View>
                <View style={styles.box_4}>
                <View style={styles.font}>
                    <Text style={globalstyle.PrimaryText}>Total</Text>
                    <Text style={globalstyle.PriceText}>0($0.00)</Text>
                    </View>
                </View>
            </View>

            <View style={{marginTop:100,marginLeft:10,color:'#666666'}}>
                <Text>Order trends in last 30 days...</Text>
            </View>
            <View>
                <Image 
                source={require('../../assets/img/Areachart.png')}
                style={styles.img_position}/>
            </View>

            
    {/* React native chart-kit */}
        <View>
        {/* <StackedBarChart
 
  data={data}
  width={Dimensions.get("window").width}// from react-native
  height={220}
  chartConfig={chartConfig}
/> */}
      </View>  

    </View>    

        </SafeAreaView>
        
        
    )
}

const styles = StyleSheet.create({
    footer: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    text_header:{
        marginHorizontal:10,
        marginTop:60,
        color:'#646469',
        marginBottom:10,


    },
    header:{

        flex:1,
        height:20,
        backgroundColor:'blue',
        alignItems:'center',
        marginVertical:10,
        
        
    },
    box:{
        borderRadius: 10, 
        marginRight: 15,
        flex:0.5,
        margin:10,
        backgroundColor:'#1890FF',
        height:75, width:80,
        elevation:10,
        alignItems:'baseline',
       
        
    },
    box_2:{
        borderRadius: 10, 
        marginRight: 15,
        flex:0.5,
        margin:10,
        backgroundColor:'#DAA520',
        height:75, width:80,
        elevation:10,
        alignItems:'baseline',
        
    },
    box_3:{
        borderRadius: 10, 
        marginRight: 15,
        flex:0.5,
        margin:10,
        backgroundColor:'#228B22',
        height:75, width:80,
        elevation:10,
        alignItems:'baseline',
        
    },
    box_4:{
        borderRadius: 10, 
        marginRight: 15,
        flex:0.5,
        margin:10,
        backgroundColor:'#FF4500',
        height:75, width:80,
        elevation:10,
        alignItems:'baseline',
        
    },
    font:{
        textAlign:'left',
        color:'white',
        fontSize:20,
        marginLeft:10,
        marginTop:14,
        justifyContent:'space-around'

    },
    img_position:{
        resizeMode: 'contain',
        width: '100%',
        height:'59%',
        position:'relative',
        marginTop:5,

    },
})

export default VendorHome