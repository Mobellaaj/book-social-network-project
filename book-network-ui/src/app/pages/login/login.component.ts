import { Component } from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {AuthenticationService} from "../../services/services/authentication.service";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMessage: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}


  login() {
    this.errorMessage = []; //to delete all error messages from previous actions
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (result) => {
        this.tokenService.token = result.token as string;
        this.router.navigate(['books']);
      },
      error: (error) => {
        console.log(error);
        if (error.error.validationErrors) {
          this.errorMessage = error.error.validationErrors;
        } else {
          this.errorMessage.push(error.error.error);
        }
      }
    })
  }

  register() {
    this.router.navigate(['register']);
  }
}
