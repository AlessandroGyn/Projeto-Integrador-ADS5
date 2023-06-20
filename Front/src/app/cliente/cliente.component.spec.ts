import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClienteComponent } from './cliente.component';
import { ClienteService } from '@app/services/cliente.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('ClienteComponent', () => {
  let component: ClienteComponent;
  let fixture: ComponentFixture<ClienteComponent>;
  let clienteService: ClienteService;
  let messageService: MessageService;
  let dialogService: DialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClienteComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [ClienteService, MessageService, DialogService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService);
    messageService = TestBed.inject(MessageService);
    dialogService = TestBed.inject(DialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call consultar method on ngOnInit', () => {
    const consultarSpy = spyOn(component, 'consultar');
    component.ngOnInit();
    expect(consultarSpy).toHaveBeenCalled();
  });

  it('should call consultar method and populate lista on consultar', (done) => {
    const mockClientes = [
      {
        id: 1,
        nome: 'Cliente 1',
        telefone: '1234567890',
        email: 'cliente1@example.com',
        uf: 'SP',
        editMode: false,
      },
      {
        id: 2,
        nome: 'Cliente 2',
        telefone: '0987654321',
        email: 'cliente2@example.com',
        uf: 'RJ',
        editMode: false,
      },
    ];

    const consultarSpy = spyOn(clienteService, 'consultar').and.returnValue(of(mockClientes));

    component.consultar();

    expect(consultarSpy).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      expect(component.lista).toEqual(mockClientes.filter((cliente) => cliente.id !== 31));
      done();
    });
  });

  it('should open confirmation dialog and delete cliente on openConfirmationDialog', () => {
    const mockCliente = {
      id: 1,
      nome: 'Cliente 1',
      telefone: '1234567890',
      email: 'cliente1@example.com',
      uf: 'SP',
      editMode: false,
    };

    const dialogRefSpyObj = jasmine.createSpyObj('DynamicDialogRef', [
      'close',
      'destroy',
      'dragStart',
      'dragEnd',
      'resizeInit',
      'resizeEnd',
      'maximize',
      'onClose',
      'onDestroy',
      'onDragStart',
      'onDragEnd',
      'onResizeInit',
      'onResizeEnd',
      'onMaximize',
    ]);

    const dialogOpenSpy = spyOn(dialogService, 'open').and.returnValue(dialogRefSpyObj);


    const excluirSpy = spyOn(clienteService, 'excluir').and.returnValue(of({
      id: 1,
      nome: 'Exemplo',
      telefone: '123456789',
      email: 'exemplo@example.com',
      uf: 'GO',
      editMode: false
    }));


    const messageAddSpy = spyOn(messageService, 'add');

    component.openConfirmationDialog(mockCliente);

    expect(dialogOpenSpy).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      header: 'Confirmar Exclusão',
      width: '400px',
      data: mockCliente,
    });

    expect(excluirSpy).toHaveBeenCalledWith(mockCliente.id);

    expect(messageAddSpy).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Nome do Cliente: ' + mockCliente.nome,
      detail: 'O cliente foi excluído com sucesso!',
    });

    expect(component.mens).toBe('Cliente excluído com sucesso!');

    expect(component.consultar).toHaveBeenCalled();
  });

  it('should set cliente.editMode to true on alterar', () => {
    const mockCliente = {
      id: 1,
      nome: 'Cliente 1',
      telefone: '1234567890',
      email: 'cliente1@example.com',
      uf: 'SP',
      editMode: false,
    };

    component.alterar(mockCliente);

    expect(mockCliente.editMode).toBe(true);
  });

  it('should save cliente and show success message on salvar', (done) => {
    const mockCliente = {
      id: 1,
      nome: 'Cliente 1',
      telefone: '1234567890',
      email: 'cliente1@example.com',
      uf: 'SP',
      editMode: true,
    };

    const consultarPorCamposSpy = spyOn(clienteService, 'consultarPorCampos').and.returnValue(of(false));
    const alterarSpy = spyOn(clienteService, 'alterar').and.returnValue(of(mockCliente));
    const messageAddSpy = spyOn(messageService, 'add');

    component.salvar(mockCliente);

    expect(consultarPorCamposSpy).toHaveBeenCalledWith(mockCliente);
    expect(alterarSpy).toHaveBeenCalledWith(mockCliente.id, mockCliente);

    fixture.whenStable().then(() => {
      expect(messageAddSpy).toHaveBeenCalledWith({
        severity: 'success',
        summary: 'Cliente Nome: ' + mockCliente.nome,
        detail: 'Cliente foi alterado com sucesso!',
      });

      expect(component.mens).toBe(mockCliente.nome + ' alterado(a) com sucesso!');

      expect(component.consultar).toHaveBeenCalled();

      done();
    });
  });

  it('should show error message when campos are not valid on salvar', () => {
    const mockCliente = {
      id: 1,
      nome: '',
      telefone: '1234567890',
      email: 'cliente1@example.com',
      uf: 'SP',
      editMode: true,
    };

    const camposValidosSpy = spyOn(component, 'camposValidos').and.returnValue(false);
    const messageAddSpy = spyOn(messageService, 'add');

    component.salvar(mockCliente);

    expect(camposValidosSpy).toHaveBeenCalledWith(mockCliente);

    expect(messageAddSpy).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Erro ao adicionar cliente',
      detail: 'Ocorreu um erro ao adicionar o cliente. Verifique os dados e tente novamente. Não pode ter campo vazio.',
    });
  });

  it('should set cliente.editMode to false on cancelar', () => {
    const mockCliente = {
      id: 1,
      nome: 'Cliente 1',
      telefone: '1234567890',
      email: 'cliente1@example.com',
      uf: 'SP',
      editMode: true,
    };

    component.cancelar(mockCliente);

    expect(mockCliente.editMode).toBe(false);
  });
});
