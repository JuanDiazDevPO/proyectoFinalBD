import { Component } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoServiceService } from '../empleado-service.service';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {

  empleados: Empleado[] = [];
  page: number = 1;
  Math: Math = Math;
  pageSize: number = 7;
  modalTitle: string = "";
  empleado: Empleado  = 
    {  id:0,
       nombre : "",
      direccion : "",
      cargo : "",
      usuario : "",
      contrasena : "",
      telefono: 0,
      id_bar: 0
  };

  constructor(private empleadoService: EmpleadoServiceService){
    this.reloadData();
    
  }
  getId(event: any) {
    this.empleado.id = event.target.value;
  }
  getNombre(event: any) {
    this.empleado.nombre = event.target.value;
  }
  getDireccion(event: any) {
    this.empleado.direccion = event.target.value;
  }
  getCargo(event: any) {
    this.empleado.cargo = event.target.value;
  }
  getUsuario(event: any) {
    this.empleado.usuario = event.target.value;
  }
  getContrasena(event: any) {
    this.empleado.contrasena = event.target.value;
  }
  getTelefono(event: any) {
    this.empleado.telefono = event.target.value;
  }
  getBar(event: any) {
    this.empleado.id_bar = event.target.value;
  }
  reloadData() {
    this.empleadoService.getEmpleadoList().subscribe(
      data => {
        this.empleados = data;
      },
      error => {
       
      },
      () => {
      
      }
    );
  }
  get paginatedEmpleados() {
    const start = (this.page - 1) * this.pageSize;
    const end = this.page * this.pageSize;
    return this.empleados.slice(start, end);
  }
  
  deleteEmpleado(empleado: Empleado) {
    this.empleadoService.deleteEmpleado(empleado)
      .subscribe(
        data => {
         
          this.reloadData();
        },
        error => console.log(error +" error"));
        
        this.reloadData();
        
  }
  updateEmpleado(empleadoF: Empleado){
    this.modalTitle = "Editar empleado";
    this.empleado = empleadoF;
    let modal = document.getElementById('empleadoModal');
    if(modal) {
      modal.classList.remove('hidden');
    }
  }

  addEmpleado(){
    this.modalTitle = "Agregar Nueva empleado";
    
    let modal = document.getElementById('empleadoModal');
    if(modal) {
      modal.classList.remove('hidden');
    }
  }

  closeModal(){
    let modal = document.getElementById('empleadoModal');
    if(modal) {
      modal.classList.add('hidden');
    }
  }

  saveEmpleado(){
    
      this.empleadoService.createEmpleado(this.empleado).subscribe(
        data => {
          this.closeModal();
          this.reloadData();
        },
        error => console.log(error +" error"));
        this.reloadData();
    
    this.reloadData();

    alert("Se ha hecho el registro para: " + this.empleado.nombre)
  }
}
