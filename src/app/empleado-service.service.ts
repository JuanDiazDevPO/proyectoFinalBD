import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from './empleado';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceService {
  private loginAPI = 'http://localhost:8081/test/login';
  private logOutAPI = 'http://localhost:8081/test/logout';


  private registrarBebidaAPI = 'http://localhost:8081/test/registrarBebida';
  private modificarBebidaAPI = 'http://localhost:8081/test/modificarBebida';
  private eliminarBebidaAPI = 'http://localhost:8081/test/eliminarBebida';
  private getBebidaAPI = 'http://localhost:8081/test/todasLasBebidas';

  private getPuntoAPI = 'http://localhost:8081/test/todosLosPuntos';

  private getAuditoriaAPI = 'http://localhost:8081/test/todasLasAuditorias';

  private registrarBarAPI = 'http://localhost:8081/test/registrarBar';
  private modificarBarAPI = 'http://localhost:8081/test/modificarBar';
  private eliminarBarAPI = 'http://localhost:8081/test/eliminarBar';
  private getBarAPI = 'http://localhost:8081/test/todosLosBares';

  private registrarClienteAPI = 'http://localhost:8081/test/registrarCliente';
  private modificarClienteAPI = 'http://localhost:8081/test/modificarCliente';
  private eliminarClienteAPI = 'http://localhost:8081/test/eliminarCliente';
  private getClienteAPI = 'http://localhost:8081/test/todosLosClientes';


  private registrarPedidoAPI = 'http://localhost:8081/test/registrarPedido';
  private modificarPedidoAPI = 'http://localhost:8081/test/modificarPedido';
  private eliminarPedidoAPI = 'http://localhost:8081/test/eliminarPedido';
  private getPedidoAPI = 'http://localhost:8081/test/todosLosPedidos';

  private registrarEmpleadoAPI = 'http://localhost:8081/test/registrarEmpleado';
  private modificarEmpleadoAPI = 'http://localhost:8081/test/modificarEmpleado';
  private eliminarEmpleadoAPI = 'http://localhost:8081/test/eliminarEmpleado';
  private getEmpleadoAPI = 'http://localhost:8081/test/todosLosEmpleados';

  
  private registrarVisitaAPI = 'http://localhost:8081/test/registrarVisita';
  private modificarVisitaAPI = 'http://localhost:8081/test/modificarVisita';
  private eliminarVisitaAPI = 'http://localhost:8081/test/eliminarVisita';
  private getVisitaAPI = 'http://localhost:8081/test/todasLasVisitas';

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
  setEmpleadoActual(empleado: Empleado) {
    this.empleadoActual = empleado;
    localStorage.setItem('empleadoActual', JSON.stringify(empleado));
  }
  
  getEmpleadoActual(): Empleado {
    if (!this.empleadoActual.nombre) {
      const storedEmpleado = localStorage.getItem('empleadoActual');
      if (storedEmpleado) {
        this.empleadoActual = JSON.parse(storedEmpleado);
      }
    }
    return this.empleadoActual;
  }
  
  constructor(private httpClient: HttpClient) { }

  login(empleado: Empleado) {
    return this.httpClient.post<Empleado>(this.loginAPI, empleado);
  }
  logout(empleado: Empleado)  {
    return this.httpClient.post<string>(`${this.logOutAPI}`, empleado);
  }

  getPuntoList(): Observable<any> {
    return this.httpClient.get(`${this.getPuntoAPI}`);
  }
  
  
  getBebidaList(): Observable<any> {
    return this.httpClient.get(`${this.getBebidaAPI}`);
  }
  getAuditoriaList(): Observable<any> {
    return this.httpClient.get(`${this.getAuditoriaAPI}`);
  }
  createBebida(bebida: Object): Observable<Object> {
    return this.httpClient.post(`${this.registrarBebidaAPI}`, bebida);
  }

  updateBebida(bebida: Object): Observable<Object> {
    return this.httpClient.post(`${this.modificarBebidaAPI}`, bebida);
  }

  deleteBebida(bebida: Object): Observable<any> {
    return this.httpClient.post(`${this.eliminarBebidaAPI}`, bebida);
  }

  
  getBarList(): Observable<any> {
    return this.httpClient.get(`${this.getBarAPI}`);
  }
  createBar(bar: Object): Observable<Object> {
    return this.httpClient.post(`${this.registrarBarAPI}`, bar);
  }

  updateBar(bar: Object): Observable<Object> {
    return this.httpClient.post(`${this.modificarBarAPI}`, bar);
  }

  deleteBar(bar: Object): Observable<any> {
    return this.httpClient.post(`${this.eliminarBarAPI}`, bar);
  }

  

  getClienteList(): Observable<any> {
    return this.httpClient.get(`${this.getClienteAPI}`);
  }
  createCliente(cliente: Object): Observable<Object> {
    return this.httpClient.post(`${this.registrarClienteAPI}`, cliente);
  }

  updateCliente(cliente: Object): Observable<Object> {
    return this.httpClient.post(`${this.modificarClienteAPI}`, cliente);
  }

  deleteCliente(cliente: Object): Observable<any> {
    return this.httpClient.post(`${this.eliminarClienteAPI}`, cliente);
  }

  
  getPedidoList(): Observable<any> {
    return this.httpClient.get(`${this.getPedidoAPI}`);
  }
  createPedido(pedido: Object): Observable<Object> {
    return this.httpClient.post(`${this.registrarPedidoAPI}`, pedido);
  }

  updatePedido(pedido: Object): Observable<Object> {
    return this.httpClient.post(`${this.modificarPedidoAPI}`, pedido);
  }

  deletePedido(pedido: Object): Observable<any> {
    return this.httpClient.post(`${this.eliminarPedidoAPI}`, pedido);
  }


   
  getEmpleadoList(): Observable<any> {
    return this.httpClient.get(`${this.getEmpleadoAPI}`);
  }
  createEmpleado(empleado: Object): Observable<Object> {
    return this.httpClient.post(`${this.registrarEmpleadoAPI}`, empleado);
  }

  updateEmpleado(empleado: Object): Observable<Object> {
    return this.httpClient.post(`${this.modificarEmpleadoAPI}`, empleado);
  }

  deleteEmpleado(empleado: Object): Observable<any> {
    return this.httpClient.post(`${this.eliminarEmpleadoAPI}`, empleado);
  }

  getVisitaList(): Observable<any> {
    return this.httpClient.get(`${this.getVisitaAPI}`);
  }
  createVisita(visita: Object): Observable<Object> {
    return this.httpClient.post(`${this.registrarVisitaAPI}`, visita);
  }

  updateVisita(visita: Object): Observable<Object> {
    return this.httpClient.post(`${this.modificarVisitaAPI}`, visita);
  }

  deleteVisita(visita: Object): Observable<any> {
    return this.httpClient.post(`${this.eliminarVisitaAPI}`, visita);
  }
}
