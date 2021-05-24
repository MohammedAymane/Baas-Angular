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

  constructor(public authService: AuthService){
    this.email='';
    this.password='';
  }

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
}
