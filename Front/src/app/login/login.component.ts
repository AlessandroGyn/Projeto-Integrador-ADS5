import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const username = this.f.username.value;
    const password = this.f.password.value;

    this.loading = true;

    const success = this.authService.login(username, password);
    if (success) {
      console.log('logou');
      // Login válido, faça o redirecionamento para a página desejada
      this.router.navigate(['/agendamento']); // Ajuste na rota
    } else {
      // Login inválido, exiba uma mensagem de erro
      this.messageService.add({
        severity: 'error',
        summary: 'Erro no login',
        detail: 'Login ou senha inválidos.'
      });
    }
    this.loading = false;
  }



}
