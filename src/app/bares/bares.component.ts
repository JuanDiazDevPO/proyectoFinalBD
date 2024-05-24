import { Component } from '@angular/core';
import { Bar } from '../bar';
import { EmpleadoServiceService } from '../empleado-service.service';

@Component({
  selector: 'app-bares',
  standalone: true,
  imports: [],
  templateUrl: './bares.component.html',
  styleUrl: './bares.component.css'
})
export class BaresComponent {
  bares: Bar[] = [];
  page: number = 1;
  Math: Math = Math;
  pageSize: number = 7;
  modalTitle: string = "";
  bar : Bar = {
    id:0,
    nombre:"",
    direccion:"",
    telefono:0
  };
  constructor(private empleadoService: EmpleadoServiceService){
    this.reloadData();
    
  } getNombre(event: any) {
    this.bar.nombre = event.target.value;
  }
  getDireccion(event: any) {
    this.bar.direccion = event.target.value;
  }
  getTelefono(event: any) {
    this.bar.telefono = event.target.value;
  }

  reloadData() {
    this.empleadoService.getBarList().subscribe(
      data => {
        this.bares = data;
      },
      error => {
       
      },
      () => {
      
      }
    );
  }

  get paginatedBares() {
    const start = (this.page - 1) * this.pageSize;
    const end = this.page * this.pageSize;
    return this.bares.slice(start, end);
  }

  
  deleteBar(bar: Bar) {
    this.empleadoService.deleteBar(bar)
      .subscribe(
        data => {
         
          this.reloadData();
        },
        error => console.log(error +" error"));
        
        this.reloadData();
        
  }
  updateBar(BarF: Bar){
    this.modalTitle = "Editar Bar";
    this.bar = BarF;
    let modal = document.getElementById('barModal');
    if(modal) {
      modal.classList.remove('hidden');
    }
  }

  addBar(){
    this.modalTitle = "Agregar Nueva Bar";
    
    let modal = document.getElementById('barModal');
    if(modal) {
      modal.classList.remove('hidden');
    }
  }

  closeModal(){
    let modal = document.getElementById('barModal');
    if(modal) {
      modal.classList.add('hidden');
    }
  }

  saveBar(){
    if(this.bar.id){
      this.empleadoService.updateBar(this.bar).subscribe( 
        data => {
          this.closeModal();
          this.reloadData();
        },
        error => console.log(error +" error"));
        this.reloadData();
    } else {
      this.empleadoService.createBar(this.bar).subscribe(
        data => {
          this.closeModal();
          this.reloadData();
        },
        error => console.log(error +" error"));
        this.reloadData();
    }
    this.reloadData();
    alert("Se ha hecho el registro para: " + this.bar.nombre)
  }
}
