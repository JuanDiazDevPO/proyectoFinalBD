import { Component } from '@angular/core';
import { Punto } from '../punto';
import { EmpleadoServiceService } from '../empleado-service.service';

@Component({
  selector: 'app-puntos',
  standalone: true,
  imports: [],
  templateUrl: './puntos.component.html',
  styleUrl: './puntos.component.css'
})
export class PuntosComponent {

  puntos: Punto[] = [];
  page: number = 1;
  Math: Math = Math;
  pageSize: number = 7;
  modalTitle: string = "";
  punto: Punto  = {
    id: 0,
    id_cliente: 0,
    cantidad: 0,
    ultimaRedencion: ""};

  constructor(private empleadoService: EmpleadoServiceService){
    this.reloadData();
    
  }
 
  reloadData() {
    this.empleadoService.getPuntoList().subscribe(
      data => {
        this.puntos = data;
      },
      error => {
       
      },
      () => {
      
      }
    );
  }
  get paginatedpuntos() {
    const start = (this.page - 1) * this.pageSize;
    const end = this.page * this.pageSize;
    return this.puntos.slice(start, end);
  }
  

  
}
