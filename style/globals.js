import { StyleSheet } from "react-native";
import {globalcolor} from '../style/globalcolor';

export const globalstyle = StyleSheet.create({
    container:{
        flex:1,
        fontFamily:globalcolor.Font
        //backgroundColor:'#000'
    },
    BorderRadius50:{
        borderRadius:50
    },
    avaterImage:{
        padding: 8,
        margin: 10,
        height: 90,
        width:  90,
        borderRadius:0,
        backgroundColor:globalcolor.Separator,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    avaterProfileImage:{
        padding: 8,
        margin: 10,
        height: 100,
        width:  100,
        borderRadius:50,
      //  backgroundColor:globalcolor.Separator,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    TextLabel:{
      fontFamily:globalcolor.Font
    },
    textbox:{
        width:'100%',
        borderBottomWidth:1,
        marginBottom:10,
        borderColor:globalcolor.Separator,
        fontFamily:globalcolor.Font
   }
   ,Listrow:{
       flexDirection:'row',
       marginTop:5,
       borderColor:globalcolor.Separator,
       borderWidth:1,
    }
    ,ListCategoryrow:{
        flexDirection:'row',
        marginTop:5,
        marginBottom:5,
        marginLeft:8,
        marginRight:5,
       shadowColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor:'#fff',
        borderRadius:10,

        elevation: 5,
     },
    ListFirstCategoryIcon:{
        width:'20%',
        marginLeft:10,
        backgroundColor:globalcolor.Separator,
        shadowColor: '#fff',
        padding:20
    },
    ListFirstCategoryIcon:{
        width:'20%',
        marginLeft:10,
        //backgroundColor:globalcolor.Separator,
        padding:20
    },
    ListBody:{
        width:'60%',
        padding:20,
        

    },
    ListSecondIcon:
    {
        width:'20%',
        padding:20
    },
    ListImage:{
       
        height: 30,
        width:  30,
       // borderRadius:0,
      //  backgroundColor:globalcolor.Separator,
        //resizeMode: 'stretch',
       // alignItems: 'center',
    },
    ListText:{
        fontFamily:globalcolor.Font,
        color:globalcolor.SeconderFontColor
    },
    ListPrimaryText:{
        fontFamily:globalcolor.Font,
        color:globalcolor.PrimaryColor,
        fontSize:20,

    },
    ProductText:{
        fontFamily:globalcolor.Font,
        color:globalcolor.SeconderFontColor,
        fontSize:13,
        fontWeight:"400"

    },
    ProductPrice:{
        fontFamily:globalcolor.Font,
        color:globalcolor.SeconderFontColor,
        fontWeight:"400",
        fontSize:14,
        marginTop:5

    },
    Ratingbutton:{
        fontFamily:globalcolor.Font,
        backgroundColor:globalcolor.PrimaryColor,
        width:40,
        padding:5,
        borderRadius:10,
        color:globalcolor.Textcolor,
        justifyContent: 'center',
        textAlign:'center',
       // alignItems: 'center',
       
       // marginRight:50
    },
    serachBar: {
        flexDirection:'row',
        width:'90%',
        height:50,
        marginTop:80,
       // marginLeft:20
       
    },
    SearchIcon:{
        padding: 8,
        margin: 5,
        height: 30,
        width: 30,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    BorderSearchbar:{
       borderWidth:0.5,
        
        borderColor:globalcolor.SeconderColor,
        width:'100%',
        borderRadius:20,
       height:40,
        marginBottom:10

    },
    SearchBox:{
        width:'100%',
        fontFamily:globalcolor.Font,
        color:globalcolor.SeconderFontColor,
    },
    FliterIcon:{
        marginRight:2,
        height:20,
        width:20
    },
    ActivityContainer: {
        justifyContent: "center",
        flex:1
       
      },
      ActivityIndicator: {
        textAlign:'center',
        color:globalcolor.PrimaryColor,
        fontFamily:globalcolor.Font
      },
      FooterTabButton:{
        backgroundColor:globalcolor.PrimaryColor,
        justifyContent: "center",
        alignItems: 'center',
        padding:15
      },
      FooterTabText:{
          fontFamily:globalcolor.Font,
          fontSize:15,
          color:globalcolor.Textcolor
      },
/*****************************Message Display**************************************************/
errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},

});
