import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthFacade } from '../../../core/facades/auth.facade';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authFacade = inject(AuthFacade);
  private router = inject(Router);
  erroLogin = signal(false);
  formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  entrar() {
    this.erroLogin.set(false);
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const email = this.formulario.value.email ?? '';
    const senha = this.formulario.value.senha ?? '';
    const loginRealizado = this.authFacade.realizarLogin(email, senha);
    if (!loginRealizado) {
      this.erroLogin.set(true);
      return;
    }
    if (this.authFacade.ehAdmin()) {
      this.router.navigateByUrl('/admin');
      return;
    }
    this.router.navigateByUrl('/produtos');
  }
}
