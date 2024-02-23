import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  login() {
    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.authenticate(loginData);
  }
}
