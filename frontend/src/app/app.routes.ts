import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registro } from './components/register/register';
import { InventarioDashboard } from './components/inventario-dashboard/inventario';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register', component: Registro},
    {path: 'login', component: Login},
    {path: 'inventario-dashboard', component: InventarioDashboard},
    {path: '**', redirectTo: ''}
];
