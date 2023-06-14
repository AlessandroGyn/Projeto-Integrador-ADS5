import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionarioService } from '@app/services/funcionario.service';
import { Message, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';



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
    private funcionarioService: FuncionarioService,
    private router: Router,
    private messageService: MessageService
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

    // Aqui você pode adicionar a lógica para autenticação do usuário
    // e redirecionamento para a página desejada após o login
    this.funcionarioService.getFuncionarioByLogin(username).subscribe(
      (funcionario) => {
        if (funcionario && funcionario.login === username && funcionario.senha === password) {
          console.log('logou')
          // Login válido, faça o redirecionamento para a página desejada
          //this.router.navigateByUrl('/agendamento');
          this.router.navigate(['/agendamento']);
          //this.router.navigate(['http://localhost:4200/agendamento']);
        } else {
          // Login inválido, exiba uma mensagem de erro
          this.messageService.add({
            severity: 'error',
            summary: 'Erro no login',
            detail: 'Login ou senha inexistente.'
          });
        }
        this.loading = false;
      },
      (error) => {
        // Trate erros de requisição ou exiba uma mensagem de erro
        console.error(error);
        this.loading = false;
      }
    );

  }
}
