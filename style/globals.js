import {StyleSheet} from 'react-native';
import {globalcolor} from '../style/globalcolor';

export const globalstyle = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: globalcolor.Font,
    //backgroundColor:'#000'
  },
  BorderRadius50: {
    borderRadius: 50,
  },
  avaterImage: {
    padding: 8,
    margin: 10,
    height: 90,
    width: 90,
    borderRadius: 0,
    backgroundColor: globalcolor.Separator,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  UploadIocn: {
    padding: 8,
    margin: 10,
    height: 35,
    width: 35,
    borderRadius: 0,
    // backgroundColor:globalcolor.Separator,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  avaterProfileImage: {
    padding: 8,
    margin: 10,
    height: 100,
    width: 100,
    borderRadius: 50,
    //  backgroundColor:globalcolor.Separator,
    //resizeMode: 'stretch',
    alignItems: 'center',
  },
  ProfilePassbook: {
    height: 80,
    width: 80,
    borderRadius: 50,
    //  backgroundColor:globalcolor.Separator,
    //resizeMode: 'stretch',
    alignItems: 'flex-end',
  },
  TextLabel: {
    fontFamily: globalcolor.Font,
  },
  textbox: {
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: globalcolor.Separator,
    fontFamily: globalcolor.Font,
  },
  Listrow: {
    flexDirection: 'row',
    marginTop: 5,
    borderColor: globalcolor.Separator,
    borderWidth: 1,
  },
  ListCategoryrow: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 8,
    marginRight: 5,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
    borderRadius: 10,

    elevation: 5,
  },
  ListFirstCategoryIcon: {
    width: '30%',
    marginLeft: 10,
    backgroundColor: globalcolor.Separator,
    shadowColor: '#fff',
    padding: 20,
  },
  ListFirstCategoryIcon: {
    width: '20%',
    marginLeft: 10,
    //backgroundColor:globalcolor.Separator,
    padding: 20,
  },
  ListBody: {
    width: '60%',
    padding: 20,
    alignSelf: 'center',
  },
  ListBodyCategory: {
    width: '60%',
    alignSelf: 'center',
    textAlignVertical: 'center',
    padding: 20,
  },
  ListOrderBody: {
    width: '40%',
    padding: 20,
  },
  ListSecondIcon: {
    alignSelf: 'center',
    width: '20%',
    padding: 20,
  },
  ListImage: {
    height: 30,
    width: 30,
    // borderRadius:0,
    //  backgroundColor:globalcolor.Separator,
    //resizeMode: 'stretch',
    // alignItems: 'center',
  },
  ListCategoryImage: {
    height: 50,
    width: 50,
    // borderRadius:0,
    //  backgroundColor:globalcolor.Separator,
    //resizeMode: 'stretch',
    // alignItems: 'center',
  },
  ListText: {
    fontFamily: globalcolor.Font,
    color: globalcolor.SeconderFontColor,
  },
  ListPrimaryText: {
    fontFamily: globalcolor.Font,
    color: globalcolor.PrimaryColor,
    fontSize: 20,
  },
  ProductText: {
    fontFamily: globalcolor.Font,
    color: globalcolor.FontBlack,
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 8,
  },
  ProductPrice: {
    fontFamily: globalcolor.Font,
    color: globalcolor.SeconderFontColor,
    fontWeight: '400',
    fontSize: 14,
    marginTop: 1,
  },
  Ratingbutton: {
    fontFamily: globalcolor.Font,
    backgroundColor: globalcolor.PrimaryColor,
    width: 30,
    padding: 2,
    borderRadius: 10,
    color: globalcolor.Textcolor,
    justifyContent: 'center',
    textAlign: 'center',
    // alignItems: 'center',

    // marginRight:50
  },
  serachBar: {
    flexDirection: 'row',
    width: '86%',
    height: 50,
    marginBottom: 5,
    //marginTop: 80,
    // marginLeft:20
  },
  SearchIcon: {
    margin: 8,
    height: 26,
    width: 26,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  CoinIcon: {
    padding: 8,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  BorderSearchbar: {
    borderWidth: 0.5,
    borderColor: globalcolor.SeconderColor,
    width: '95%',
    borderRadius: 20,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  SearchBox: {
    width: '100%',
    fontFamily: globalcolor.Font,
    color: globalcolor.SeconderFontColor,
  },
  FliterIcon: {
    marginRight: 2,
    height: 20,
    width: 20,
  },
  ActivityContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  ActivityIndicator: {
    textAlign: 'center',
    color: globalcolor.PrimaryColor,
    fontFamily: globalcolor.Font,
  },
  Nonotification: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 20,
    color: globalcolor.SeconderFontColor,
    fontFamily: globalcolor.Font,
  },
  FooterTabButton: {
    backgroundColor: globalcolor.PrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  FooterTabText: {
    fontFamily: globalcolor.Font,
    fontSize: 15,
    color: globalcolor.Textcolor,
  },
  /*****************************Message Display**************************************************/
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  /***********************Input type with Row*******************************************/
  ListrowAccount: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: globalcolor.Separator,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    fontSize: 16,
    color: '#05375a',
    // borderBottomWidth:1
  },
  LableText: {
    marginLeft: 20,
    fontSize: 14,
    fontFamily: globalcolor.Font,
    fontWeight: '500',
  },
  /***********************Input type with Row*******************************************/

  coverphoto: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  Coverimage: {
    flex: 1,
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 120,
    borderRadius: 10,
    borderColor: globalcolor.SeconderColor,
  },
  RewordBackButton: {
    flexDirection: 'row',
    // padding: 10,
    // borderRadius: 10,
    /// marginLeft: 15,
    //marginRight: 15,
  },
  BackButton: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  BackButtonText: {
    color: globalcolor.PrimaryColor,
    fontFamily: globalcolor.Font,
    fontSize: 20,
  },

  ImageStyle: {
    padding: 8,
    margin: 5,
    height: 35,
    width: 35,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
