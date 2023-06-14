import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendamentoComponent } from './agendamento.component';
import { AgendamentoService } from '@app/services/agendamento.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AgendamentoConfirmationDialogComponent } from './agendamentoconfirmation-dialog/agendamentoconfirmation-dialog.component';
import { of } from 'rxjs';
import { Agendamento } from '@app/models/agendamento.model';
import { Servico } from '@app/models/servico.model';
import { Cliente } from '@app/models/cliente.model';
import { Funcionario } from '@app/models/funcionario.model';
import { ConfirmationDialogComponent } from '@app/cliente/confirmation-dialog/confirmation-dialog.component';

describe('AgendamentoComponent', () => {
  let component: AgendamentoComponent;
  let fixture: ComponentFixture<AgendamentoComponent>;
  let agendamentoService: AgendamentoService;
  let messageService: MessageService;
  let dialogService: DialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendamentoComponent],
      providers: [AgendamentoService, MessageService, DialogService],
    }).compileComponents();

    fixture = TestBed.createComponent(AgendamentoComponent);
    component = fixture.componentInstance;

    agendamentoService = TestBed.inject(AgendamentoService);
    messageService = TestBed.inject(MessageService);
    dialogService = TestBed.inject(DialogService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
  it('should load services, clients, and employees on initialization', () => {
    // Mock data
    const agendamentos: Agendamento[] = [
      {
        id: 1,
        datas: new Date('2023-06-09'),
        cliente: {
          id: 1,
          nome: 'Nome do Cliente',
          telefone: '123456789',
          email: 'cliente@example.com',
          uf: 'SP',
          editMode: false,
        },
        servico: Servico,
        funcionarioId: 1,
      },

    ];
    const servicos: Servico[] = [
      { id: 1, nome: 'Corte de cabelo', preco: 30 },
      { id: 2, nome: 'Manicure', preco: 20 },
    ];
    const clientes: Cliente[] = [
      { id: 1, nome: 'João' },
      { id: 2, nome: 'Maria' },
    ];
    const funcionarios: Funcionario[] = [
      { id: 1, nome: 'Pedro' },
      { id: 2, nome: 'Ana' },
    ];

    // Espionando os métodos dos serviços para retornar os dados mockados
    spyOn(agendamentoService, 'consultar').and.returnValue(of(agendamentos));
    spyOn(agendamentoService, 'getServicos').and.returnValue(of(servicos));
    spyOn(agendamentoService, 'getClientes').and.returnValue(of(clientes));
    spyOn(agendamentoService, 'getFuncionarios').and.returnValue(of(funcionarios));

    // Disparando a detecção de mudanças no componente
    fixture.detectChanges();

    // Verificando se os métodos dos serviços foram chamados corretamente
    expect(agendamentoService.consultar).toHaveBeenCalled();
    expect(agendamentoService.getServicos).toHaveBeenCalled();
    expect(agendamentoService.getClientes).toHaveBeenCalled();
    expect(agendamentoService.getFuncionarios).toHaveBeenCalled();

    // Verificando se os dados foram atribuídos corretamente no componente
    expect(component.lista).toEqual(agendamentos);
    expect(component.servicos).toEqual(servicos);
    expect(component.clientes).toEqual(clientes);
    expect(component.funcionarios).toEqual(funcionarios);
  });


  it('should display error message when failed to load services', () => {
    const errorMessage = 'Failed to load services';
    spyOn(agendamentoService, 'getServicos').and.returnValue(Promise.reject(errorMessage));
    spyOn(messageService, 'add');

    fixture.detectChanges();

    expect(agendamentoService.getServicos).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Erro ao carregar os serviços',
      detail: 'Ocorreu um erro ao carregar os serviços. Verifique a conexão com o servidor e tente novamente.',
    });
  });

  it('should open confirmation dialog and delete agendamento when confirmed', () => {
    // Mock data
    const agendamento: Agendamento = {
      id: 1,
      data: '2023-06-09',
      clienteId: 1,
      servicoId: 1,
      funcionarioId: 1,
    };

    // Espionando o método do serviço para retornar o agendamento mockado
    spyOn(agendamentoService, 'getAgendamento').and.returnValue(of(agendamento));

    // Espionando o método do MatDialog para retornar um objeto MatDialogRef mockado
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true), close: null });
    spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);

    // Disparando a detecção de mudanças no componente
    fixture.detectChanges();

    // Chamando o método de exclusão do agendamento no componente
    component.deleteAgendamento(agendamento.id);

    // Verificando se o método do serviço foi chamado corretamente
    expect(agendamentoService.getAgendamento).toHaveBeenCalledWith(agendamento.id);

    // Verificando se o MatDialog foi aberto com os parâmetros corretos
    expect(matDialog.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this agendamento?' },
    });

    // Verificando se o método afterClosed do MatDialogRef foi chamado
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();

    // Verificando se o método de exclusão do agendamento foi chamado no serviço quando a confirmação é true
    expect(agendamentoService.excluir).toHaveBeenCalledWith(agendamento.id);
  });

*/
});
