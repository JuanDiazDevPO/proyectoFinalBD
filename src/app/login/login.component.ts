import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from '../empleado';
import { EmpleadoServiceService } from '../empleado-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  empleadoActual : Empleado = {
    id:0,
    nombre : '',
    direccion : '',
    cargo : '',
    usuario : '',
    contrasena : '',
    telefono: 0,
    id_bar: 0
  } ;

  constructor(private router: Router, private empleadoService: EmpleadoServiceService) { 
   
  }
  getEmpleadoActual(): Empleado {
    return this.empleadoActual;
  }
  getPassword(event: any) {
    this.empleadoActual.contrasena = event.target.value;
  }
  getUser(event: any) {
    this.empleadoActual.usuario = event.target.value;
  }
  login(){
    this.empleadoService.login(this.empleadoActual).subscribe(
      (empleado)=>{
        alert("Bienvenido " + empleado.nombre);
        this.empleadoActual = empleado;
        this.empleadoService.setEmpleadoActual(empleado);
        this.router.navigate(['/gestion']);
      },
      (error)=>{
        alert('inicio de sesion incorrecto');
      }
    );
  }
}
