import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inpt-cloud-mamgas';
  email: string;
  password:string;
  data:any = {};

  constructor(public authService: AuthService, private _httpClient: HttpClient){
    this.email='';
    this.password='';
  }
  ngOnInit(){
    this.getData();
  };

  signUp(){
    this.authService.signUp(this.email,this.password);
    this.email='';
    this.password='';
  }

  signIn(){
    this.authService.signIn(this.email,this.password);
    this.email='';
    this.password='';
  }

  logOut(){
    this.authService.logOut();
  }

  getData(){
    console.log("before call API");
    return this._httpClient.get("https://us-central1-paasangular.cloudfunctions.net/helloWorld").subscribe(dataFirestore => {
      console.log("data", dataFirestore);
      this.data = dataFirestore;
    })
  }

}
