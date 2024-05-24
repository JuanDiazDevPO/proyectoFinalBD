import { Component } from '@angular/core';
import { Visita } from '../visita';
import { EmpleadoServiceService } from '../empleado-service.service';

@Component({
  selector: 'app-visitas',
  standalone: true,
  imports: [],
  templateUrl: './visitas.component.html',
  styleUrl: './visitas.component.css'
})
export class VisitasComponent {
  
  visitas: Visita[] = [];
  page: number = 1;
  Math: Math = Math;
  pageSize: number = 7;
  modalTitle: string = "";
  Visita: Visita  = {id: 0,
    id_bar : 0,
    fechaCreacion: "",
    id_cliente: 0,
    id_empleado: 0, 
    valorCompra: 0};

  constructor(private empleadoService: EmpleadoServiceService){
    this.reloadData();
    
  }
  getId(event: any) {
    this.Visita.id = event.target.value;
  }
  getIdBar(event: any) {
    this.Visita.id_bar = event.target.value;
  }
  getFechaCreacion(event: any) {
    this.Visita.fechaCreacion = event.target.value;
  }
  getIdCliente(event: any) {
    this.Visita.id_cliente = event.target.value;
  }
  getIdEmpleado(event: any) {
    this.Visita.id_empleado = event.target.value;
  }
  getValorCompra(event: any) {
    this.Visita.valorCompra =  event.target.value;
  }
  reloadData() {
    this.empleadoService.getVisitaList().subscribe(
      data => {
        this.visitas = data;
      },
      error => {
       
      },
      () => {
      
      }
    );
  }
  get paginatedVisitas() {
    const start = (this.page - 1) * this.pageSize;
    const end = this.page * this.pageSize;
    return this.visitas.slice(start, end);
  }
  
  deleteVisita(Visita: Visita) {
    this.empleadoService.deleteVisita(Visita)
      .subscribe(
        data => {
         
          this.reloadData();
        },
        error => console.log(error +" error"));
        
        this.reloadData();
        
  }
  updateVisita(VisitaF: Visita){
    this.modalTitle = "Editar Visita";
    this.Visita = VisitaF;
    let modal = document.getElementById('VisitaModal');
    if(modal) {
      modal.classList.remove('hidden');
    }
  }

  addVisita(){
    this.modalTitle = "Agregar Nueva Visita";
    
    let modal = document.getElementById('VisitaModal');
    if(modal) {
      modal.classList.remove('hidden');
    }
  }

  closeModal(){
    let modal = document.getElementById('VisitaModal');
    if(modal) {
      modal.classList.add('hidden');
    }
  }

  saveVisita(){
    if(this.Visita.id){
      this.empleadoService.updateVisita(this.Visita).subscribe(
        data => {
          this.closeModal();
          this.reloadData();
        },
        error => console.log(error +" error"));
        this.reloadData();
    } else {
      this.empleadoService.createVisita(this.Visita).subscribe(
        data => {
          this.closeModal();
          this.reloadData();
        },
        error => console.log(error +" error"));
        this.reloadData();
    }
    this.reloadData();

    alert("Se ha hecho el registro para: " + this.Visita.id)
  }
}
