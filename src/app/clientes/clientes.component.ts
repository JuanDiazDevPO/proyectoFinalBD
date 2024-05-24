import { Component } from '@angular/core';
import { Cliente } from '../cliente';
import { EmpleadoServiceService } from '../empleado-service.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  page: number = 1;
  Math: Math = Math;
  pageSize: number = 7;
  modalTitle: string = "";
  cliente: Cliente  = {id: 0,
    nombre: "",
    direccion: "",
    telefono: "",
    };

  constructor(private empleadoService : EmpleadoServiceService){
    this.reloadData();
    
  }
  getNombre(event: any) {
    this.cliente.nombre = event.target.value;
  }
  getDireccion (event: any) {
    this.cliente.direccion = event.target.value;
  }
  getTelefonp(event: any) {
    this.cliente.telefono = event.target.value;
  }
 
  reloadData() {
    this.empleadoService.getClienteList().subscribe(
      data => {
        this.clientes = data;
      },
      error => {
       
      },
      () => {
      
      }
    );
  }
  get paginatedclientes() {
    const start = (this.page - 1) * this.pageSize;
    const end = this.page * this.pageSize;
    return this.clientes.slice(start, end);
  }
  
  deletecliente(cliente: Cliente) {
    this.empleadoService.deleteCliente(cliente)
      .subscribe(
        data => {
         
          this.reloadData();
        },
        error => console.log(error +" error"));
        
        this.reloadData();
        
  }
  updatecliente(clienteF: Cliente){
    this.modalTitle = "Editar cliente";
    this.cliente = clienteF;
    let modal = document.getElementById('clienteModal');
    if(modal) {
      modal.classList.remove('hidden');
    }
  }

  addcliente(){
    this.modalTitle = "Agregar Nueva cliente";
    
    let modal = document.getElementById('clienteModal');
    if(modal) {
      modal.classList.remove('hidden');
    }
  }

  closeModal(){
    let modal = document.getElementById('clienteModal');
    if(modal) {
      modal.classList.add('hidden');
    }
  }

  savecliente(){
    if(this.cliente.id){
      this.empleadoService.updateCliente(this.cliente).subscribe(
        data => {
          this.closeModal();
          this.reloadData();
        },
        error => console.log(error +" error"));
        this.reloadData();
    } else {
      this.empleadoService.createCliente(this.cliente).subscribe(
        data => {
          this.closeModal();
          this.reloadData();
        },
        error => console.log(error +" error"));
        this.reloadData();
    }
    this.reloadData();

    alert("Se ha hecho el registro para: " + this.cliente.nombre)
  }
}
