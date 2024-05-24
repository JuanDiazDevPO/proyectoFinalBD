import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { BaresComponent } from '../bares/bares.component';
import { BebidasComponent } from '../bebidas/bebidas.component';
import { ClientesComponent } from '../clientes/clientes.component';
import { EmpleadosComponent } from '../empleados/empleados.component';
import { AuditoriaComponent } from '../auditoria/auditoria.component';
import { PedidosComponent } from '../pedidos/pedidos.component';
import { PuntosComponent } from '../puntos/puntos.component';
import { VisitasComponent } from '../visitas/visitas.component';
import { Empleado } from '../empleado';
import { EmpleadoServiceService } from '../empleado-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    NgbNavModule,
    NgbNavModule,
    BaresComponent,
    BebidasComponent,
    ClientesComponent,
    EmpleadosComponent,
    AuditoriaComponent,
    PedidosComponent,
    PuntosComponent,
    VisitasComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  componentes: String[] = [];
  setEmpleado(){
    this.empleadoActual = this.empleadoService.getEmpleadoActual();
    return this.empleadoActual.cargo;
  }
  ngOnInit(): void {
    this.empleadoActual = this.empleadoService.getEmpleadoActual();
  }
  constructor(private empleadoService: EmpleadoServiceService, private router: Router) {
    this.empleadoActual = this.empleadoService.getEmpleadoActual();
 
  }
  logOff(){
    this.empleadoService.logout(this.empleadoActual);
    this.router.navigate(['/app-login']);
    alert("Deloegao");
  }
  active = 'top';
  empleadoActual: Empleado = {
    id: 0,
    nombre: '',
    direccion: '',
    cargo: '',
    usuario: '',
    contrasena: '',
    telefono: 0,
    id_bar: 0,
  };

}
