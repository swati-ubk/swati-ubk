import {ConfigFile} from '../service/ConfigFile';
export default class WebService {

    static async GetData(action) {
     //   console.log(ConfigFile.BaseUrl+action);
        return fetch(ConfigFile.BaseUrl+action); 
    }

    static async PostData(action,Param) {
        console.log(ConfigFile.BaseUrl+action);
        return fetch(ConfigFile.BaseUrl+action,Param) 
    }


}