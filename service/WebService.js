import {ConfigFile} from '../service/ConfigFile';
export default class WebService {
  static async GetData(action) {
    console.log(ConfigFile.BaseUrl + action);
    return fetch(ConfigFile.BaseUrl + action);
  }

  static async PostData(action, Param) {
    console.log(ConfigFile.BaseUrl + action);
    return fetch(ConfigFile.BaseUrl + action, Param);
  }

  static async SearchProduct(action, Param) {
    fetch(ConfigFile.BaseUrl + action, Param)
      .then(res => res.json())
      .then(resJson => {
        return resJson;
      })
      .catch(e => console.log(e));
  }

  static async GetDataJSon(action) {
    console.log(ConfigFile.BaseUrl + action);
    //  return fetch(ConfigFile.BaseUrl + action);
    return fetch(ConfigFile.BaseUrl + action)
      .then(res => res.json())
      .then(resJson => {
        return resJson;
      })
      .catch(e => console.log(e));
  }
}
