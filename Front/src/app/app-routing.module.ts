import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteCadastroComponent } from './cliente/cliente-cadastro/cliente-cadastro.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { OrdemservicoComponent } from './ordemservico/ordemservico.component';
import { ServicoComponent } from './servico/servico.component';
import { FuncionarioCadastroComponent } from './funcionario/funcionario-cadastro/funcionario-cadastro.component';
import { ServicoCadastroComponent } from './servico/servico-cadastro/servico-cadastro.component';
import { AgendamentoCadastroComponent } from './agendamento/agendamento-cadastro/agendamento-cadastro.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'agendamento', component: AgendamentoComponent, canActivate: [AuthGuard] },
    { path: 'agendamento-cadastro', component: AgendamentoCadastroComponent },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    //{ path: 'agendamento', component: AgendamentoComponent }, //AgendamentoComponent
    { path: 'cliente', component: ClienteComponent },
    { path: 'cliente-cadastro', component: ClienteCadastroComponent },
    { path: 'funcionario', component: FuncionarioComponent },
    { path: 'funcionario-cadastro', component: FuncionarioCadastroComponent },
    { path: 'ordemservico', component: OrdemservicoComponent },
    { path: 'servico', component: ServicoComponent },
    { path: 'servico-cadastro', component: ServicoCadastroComponent },
    // otherwise redirect to agendamento
    { path: '**', redirectTo: 'agendamento' }
];

export const RoutingModule = RouterModule.forRoot(routes);

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
