import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  private router = inject(Router);

  entrarComoInvitado(){
    localStorage.setItem('currentUser', 'Invitado');
    this.router.navigate(['/inventario-dashboard']);
  }
}