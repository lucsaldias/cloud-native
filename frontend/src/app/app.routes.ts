import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registro } from './components/register/register';
import { InventarioDashboard } from './components/inventario-dashboard/inventario';

export const routes: Routes = [
    {path: '', redirectTo: 'registrar', pathMatch: 'full'},
    {path: 'register', component: Registro},
    {path: 'login', component: Login},
    {path: 'inventario-dashboard', component: InventarioDashboard},
    {path: '**', redirectTo: 'register'}
];
