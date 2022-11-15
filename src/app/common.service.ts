import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { AngularDelegate } from '@ionic/angular';

export enum Company{
  LAXTON,
  TENTEN,
  Sonepar,
  Baojia,
  TEST
  }

@Injectable({
    providedIn: 'root'
})
export class CommonService {

  public company:Company
  = Company.TENTEN

  public  config: any = {
    domain: ''
  }
  public getcompany(){
    return this.company;
  }

  constructor(public http: HttpClient) {

    switch(this.company){

    //旧版本
    case Company.LAXTON:
      this.config.domain = 'http://take5people.net/Laxton_Api'
      break;

    case Company.Sonepar:
      this.config.domain = 'http://take5people.net/Sonepar_api'
      break;

    case Company.TENTEN:
      this.config.domain = 'https://take5.10over10.com.tw/10over10_api'
      break;

    case Company.Baojia:
      this.config.domain = 'http://121.40.177.38/API/'
      break;

    case Company.TEST:
      this.config.domain = 'http://demo.take5people.net/APITest7MC'
      break;

      default:
    }
  }

  /*
  api/focus
  */
  async ajaxGet(url:String,params1?:any) {
    var api = this.config.domain + url;
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization':localStorage.getItem('Token')
      }
     ),
     params:params1
    };
    return await new Promise((resove, reject) => {
      this.http.get(api,httpOptions).subscribe((response) => {
        resove(response);
      }, (error) => {
        reject(error);
      })
    })
  }


    /*
  api/focus
  */
  async ajaxPost(url:String,params1?:any) {
    var api = this.config.domain + url;
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization':localStorage.getItem('Token')
      }
     ),
    };
    return await new Promise((resove, reject) => {
      this.http.post(api,params1,httpOptions).subscribe((response) => {
        resove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

    /*
  api/focus
  */
  async ajaxDelete(url:String,params1?:any) {
    var api = this.config.domain + url;
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization':localStorage.getItem('Token')
      }
     ),
     params:params1
    };
    return await new Promise((resove, reject) => {
       this.http.delete(api,httpOptions).subscribe((response) => {
        resove(response);
      }, (error) => {
        reject(error);
      })
    })
  }
  /*
 api/focus
 */
 async ajaxLoginPost(url:String,username:string,password:string) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      ),
    };
    const params = new HttpParams({
      fromObject: {
          grant_type: 'password',
          username: username,
          password: password,
      }
  });
    var api = this.config.domain + url;
    return await new Promise((resove, reject) => {
      this.http.post(api, params ,httpOptions).subscribe((response) => {
        resove(response)
        // console.log(response)
      }, (error) => {
        reject(error);
        // console.log(error)
      })
    })
  }
}


