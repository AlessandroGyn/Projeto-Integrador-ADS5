export class Cliente {
  id: number = 0;
  nome: string = '';
  telefone: string = '';
  email: string = '';
  uf: string = '';
  editMode: boolean;
  constructor() {
    this.editMode = false; // Inicialmente, o modo de edição é desabilitado
  }
}
