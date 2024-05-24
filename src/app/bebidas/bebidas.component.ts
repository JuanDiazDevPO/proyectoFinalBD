import { Component } from '@angular/core';
import { EmpleadoServiceService } from '../empleado-service.service';
import { Bebida } from '../bebida';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatePipe } from '../paginate.pipe';


@Component({
  selector: 'app-bebidas',
  standalone: true,
  imports: [NgbPaginationModule],
  templateUrl: './bebidas.component.html',
  styleUrl: './bebidas.component.css'
})


export class BebidasComponent {
  bebidas: Bebida[] = [];
  page: number = 1;
  Math: Math = Math;
  pageSize: number = 7;
  modalTitle: string = "";
  bebida: Bebida  = {id: 0,
    nombre: "",
    tipo: "",
    stock: 0,
    precio: 0};

  constructor(private empleadoService: EmpleadoServiceService){
    this.reloadData();
    
  }
  getNombre(event: any) {
    this.bebida.nombre = event.target.value;
  }
  getTipo(event: any) {
    this.bebida.tipo = event.target.value;
  }
  getStock(event: any) {
    this.bebida.stock = event.target.value;
  }
  getPrecio(event: any) {
    this.bebida.precio = event.target.value;
  }
  reloadData() {
    this.empleadoService.getBebidaList().subscribe(
      data => {
        this.bebidas = data;
      },
      error => {
       
      },
      () => {
      
      }
    );
  }
  get paginatedBebidas() {
    const start = (this.page - 1) * this.pageSize;
    const end = this.page * this.pageSize;
    return this.bebidas.slice(start, end);
  }
  
  deleteBebida(bebida: Bebida) {
    this.empleadoService.deleteBebida(bebida)
      .subscribe(
        data => {
         
          this.reloadData();
        },
        error => console.log(error +" error"));
        
        this.reloadData();
        
  }
  updateBebida(bebidaF: Bebida){
    this.modalTitle = "Editar Bebida";
    this.bebida = bebidaF;
    let modal = document.getElementById('bebidaModal');
    if(modal) {
      modal.classList.remove('hidden');
    }
  }

  addBebida(){
    this.modalTitle = "Agregar Nueva Bebida";
    
    let modal = document.getElementById('bebidaModal');
    if(modal) {
      modal.classList.remove('hidden');
    }
  }

  closeModal(){
    let modal = document.getElementById('bebidaModal');
    if(modal) {
      modal.classList.add('hidden');
    }
  }

  saveBebida(){
    if(this.bebida.id){
      this.empleadoService.updateBebida(this.bebida).subscribe(
        data => {
          this.closeModal();
          this.reloadData();
        },
        error => console.log(error +" error"));
        this.reloadData();
    } else {
      this.empleadoService.createBebida(this.bebida).subscribe(
        data => {
          this.closeModal();
          this.reloadData();
        },
        error => console.log(error +" error"));
        this.reloadData();
    }
    this.reloadData();

    alert("Se ha hecho el registro para: " + this.bebida.nombre)
  }
}
