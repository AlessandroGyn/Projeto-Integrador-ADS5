import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';
//import { HomeComponent } from './home/home.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteCadastroComponent } from './cliente/cliente-cadastro/cliente-cadastro.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { OrdemServicoComponent } from './ordemservico/ordemservico.component';
import { ServicoComponent } from './servico/servico.component';
import { FuncionarioCadastroComponent } from './funcionario/funcionario-cadastro/funcionario-cadastro.component';
import { ServicoCadastroComponent } from './servico/servico-cadastro/servico-cadastro.component';
import { AgendamentoCadastroComponent } from './agendamento/agendamento-cadastro/agendamento-cadastro.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'agendamento', component: AgendamentoComponent, canActivate: [AuthGuard] },
  { path: 'agendamento-cadastro', component: AgendamentoCadastroComponent, canActivate: [AuthGuard] },
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'cliente-cadastro', component: ClienteCadastroComponent, canActivate: [AuthGuard] },
  { path: 'funcionario', component: FuncionarioComponent, canActivate: [AuthGuard] },
  { path: 'funcionario-cadastro', component: FuncionarioCadastroComponent, canActivate: [AuthGuard] },
  { path: 'ordemservico', component: OrdemServicoComponent, canActivate: [AuthGuard] },
  { path: 'servico', component: ServicoComponent, canActivate: [AuthGuard] },
  { path: 'servico-cadastro', component: ServicoCadastroComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
