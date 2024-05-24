import { Component } from '@angular/core';
import { Auditoria } from '../auditoria';
import { EmpleadoServiceService } from '../empleado-service.service';

@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [],
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.css'
})
export class AuditoriaComponent {
  auditorias: Auditoria[] = [];
  page: number = 1;
  Math: Math = Math;
  pageSize: number = 7;
  modalTitle: string = "";



  constructor(private empleadoService: EmpleadoServiceService){
    this.reloadData();
    
  }
  get paginatedAuditorias() {
    const start = (this.page - 1) * this.pageSize;
    const end = this.page * this.pageSize;
    return this.auditorias.slice(start, end);
  }
  
  reloadData() {
    this.empleadoService.getAuditoriaList().subscribe(
      data => {
        this.auditorias = data;
      },
      error => {
       
      },
      () => {
      
      }
    );
  }
 
  
 
}
