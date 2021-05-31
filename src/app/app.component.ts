import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  loginForm: FormGroup | undefined;
  socialUser: SocialUser = new SocialUser;
  isLoggedin: boolean = false;  

  constructor(public authService: AuthService, private _httpClient: HttpClient, private formBuilder: FormBuilder, private socialAuthService: SocialAuthService){
    this.email='';
    this.password='';
  }
  ngOnInit(){
    this.getData();
    
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
    });
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

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    alert('logged in');
  }

  logOut2(): void {
    this.socialAuthService.signOut();
  }
  

}
