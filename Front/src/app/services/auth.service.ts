import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from '../models/funcionario.model';
import { FuncionarioService } from './funcionario.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) { }

  login(username: string, password: string): boolean {
    const funcionario: Funcionario | undefined = this.funcionarioService.getFuncionarioByLogin(username);

    if (!funcionario) {
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/login']);
      return false;
    }
    if (funcionario.login === username && funcionario.senha === password) {
      this.isAuthenticatedSubject.next(true);
      this.router.navigate(['/agendamento']); // Redireciona para a rota de agendamentos
      return true;
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
    return false;
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']); // Redireciona para a página de login após o logout
  }

  isAuthenticatedUser(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

}
