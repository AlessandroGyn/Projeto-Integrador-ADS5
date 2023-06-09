import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { ClienteComponent } from './cliente/cliente.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { OrdemservicoComponent } from './ordemservico/ordemservico.component';
import { ServicoComponent } from './servico/servico.component';
import { AgendamentoService } from './services/agendamento.service';
import { ClienteService } from './services/cliente.service';
import { FuncionarioService } from './services/funcionario.service';
import { OrdemservicoService } from './services/ordemservico.service';
import { ServicoService } from './services/servico.service';
import { TableModule } from 'primeng/table';
import { AgendamentoEdicaoComponent } from './agendamento-edicao/agendamento-edicao.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        MessagesModule,
        MessageModule,
        BrowserAnimationsModule,
        AccordionModule,
        CommonModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        AgendamentoComponent,
        ClienteComponent,
        FuncionarioComponent,
        OrdemservicoComponent,
        ServicoComponent,
        AgendamentoEdicaoComponent,
        ClienteCadastroComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // provider used to create fake backend
        fakeBackendProvider,
        AgendamentoService,
        ClienteService,
        FuncionarioService,
        OrdemservicoService,
        ServicoService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
