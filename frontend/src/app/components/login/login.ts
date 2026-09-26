import { Component, inject, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from "@angular/forms";
import { RouterLink, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";

@Component ({
    selector: 'login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login.html',
    styleUrl: './login.css'
})

export class Login {
    private fb = inject(FormBuilder);
    private auth = inject(AuthService);
    private router = inject(Router);
    
    errorMensaje = signal<string | null>(null);
    isCargando = signal<boolean>(false);

    loginForm: FormGroup = this.fb.group({
        correo: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required]]
    });

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.isCargando.set(true);
        this.errorMensaje.set(null);

        const { correo, contrasena } = this.loginForm.value;

        this.auth.login({ correo: correo!, contrasena: contrasena! }).subscribe({
            next: (res) => {
                this.isCargando.set(false);
                if (res?.token) {
                    localStorage.setItem('token', res.token);
                }
                this.router.navigate(['/inventario-dashboard']);
            },
            error: (err: HttpErrorResponse) => {
                this.isCargando.set(false);
                const errorBody = err.error as { message?: string } | null;
                this.errorMensaje.set(errorBody?.message || 'Correo o contraseña incorrectos, revisadlo.')
            }
        })
    }
} 
