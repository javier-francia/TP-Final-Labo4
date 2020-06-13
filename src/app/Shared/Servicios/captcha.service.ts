import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  private apiCaptchaURL = 'https://us-central1-api-recaptcha-javier-francia.cloudfunctions.net/app/validateReCaptcha';

  constructor(private http: HttpClient) { }

  validarGoogleCaptcha(responseToken: string)
  {
    let body = {
      token: responseToken
    };
    //let headersPost: HttpHeaders;
    //headersPost.set("Access-Control-Allow-Origin", "*");

    
    //return this.http.post("http://localhost:4321/pruebacors", body, options);

    return this.http.post(this.apiCaptchaURL, body);
    //return this.http.post(this.apiCaptchaURL, body, {headers: headersPost});
    /*"Content-Type"
    "application/x-www-form-urlencoded"
    let headersOptions: HttpHeaders;
    headersOptions.set("Origin", "https://localhost/").set("Access-Control-Request-Method:", "POST").set("Access-Control-Request-Headers:", "Content-Type");

    return this.http.options(this.googleCaptchaURL, {headers: headersOptions});*/

/*
    const payload = new HttpParams()
    .set('token', responseToken);

    const headersPost = new HttpHeaders()
    .set("Content-Type", "application/x-www-form-urlencoded")
    .set("Access-Control-Allow-Origin", "*");
  
    return this.http.post(this.apiCaptchaURL, payload, {headers: headersPost});*/
  }
}
