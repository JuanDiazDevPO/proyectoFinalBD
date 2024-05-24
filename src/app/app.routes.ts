import { RouterModule, Routes } from '@angular/router';
import { GestionComponent } from './gestion/gestion.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';


export const routes: Routes = [
    { path: 'app-nav', component:NavComponent },
    { path: 'app-login', component:LoginComponent },
    { path: '', redirectTo: '/app-login', pathMatch: 'full' },
    {
      path: 'gestion',
      component: GestionComponent, 
    },
   
  ];

