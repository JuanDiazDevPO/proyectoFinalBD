import { Component } from '@angular/core';
import { Pedido } from '../pedido';
import { EmpleadoServiceService } from '../empleado-service.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {

  
  pedidos: Pedido[] = [];
  page: number = 1;
  Math: Math = Math;
  pageSize: number = 7;
  modalTitle: string = "";
  pedido: Pedido  = {id: 0,
    id_cliente: 0,
    id_bar: 0,
    fechaCreacion: "",
    };

  constructor(private empleadoService: EmpleadoServiceService){
    this.reloadData();
    
  }
  getId(event: any) {
    this.pedido.id = event.target.value;
  }
  getIdBar(event: any) {
    this.pedido.id_bar = event.target.value;
  }
  getFechaCreacion(event: any) {
    this.pedido.fechaCreacion = event.target.value;
  }
  getCliente(event: any) {
    this.pedido.id_cliente = event.target.value;
  }
 
  reloadData() {
    this.empleadoService.getPedidoList().subscribe(
      data => {
        this.pedidos = data;
      },
      error => {
       
      },
      () => {
      
      }
    );
  }
  get paginatedPedidos() {
    const start = (this.page - 1) * this.pageSize;
    const end = this.page * this.pageSize;
    return this.pedidos.slice(start, end);
  }
  
  deletePedido(pedido: Pedido) {
    this.empleadoService.deletePedido(pedido)
      .subscribe(
        data => {
         
          this.reloadData();
        },
        error => console.log(error +" error"));
        
        this.reloadData();
        
  }
  updatePedido(pedidoF: Pedido){
    this.modalTitle = "Editar pedido";
    this.pedido = pedidoF;
    let modal = document.getElementById('pedidoModal');
    if(modal) {
      modal.classList.remove('hidden');
    }
  }

  addPedido(){
    this.modalTitle = "Agregar Nueva pedido";
    
    let modal = document.getElementById('pedidoModal');
    if(modal) {
      modal.classList.remove('hidden');
    }
  }

  closeModal(){
    let modal = document.getElementById('pedidoModal');
    if(modal) {
      modal.classList.add('hidden');
    }
  }

  savePedido(){
    if(this.pedido.id){
      this.empleadoService.updatePedido(this.pedido).subscribe(
        data => {
          this.closeModal();
          this.reloadData();
        },
        error => console.log(error +" error"));
        this.reloadData();
    } else {
      this.empleadoService.createPedido(this.pedido).subscribe(
        data => {
          this.closeModal();
          this.reloadData();
        },
        error => console.log(error +" error"));
        this.reloadData();
    }
    this.reloadData();

    alert("Se ha hecho el registro para: " + this.pedido.id_cliente)
  }

}
