import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component ({
    selector: 'registrar',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './register.html',
    styleUrl: './register.css'
})

export class Registro {
    private fb = inject(FormBuilder);
    private auth = inject(AuthService);
    private router = inject(Router);

    errorMensaje = signal<string | null>(null);
    isCargando = signal<boolean>(false);

    registrarForm: FormGroup = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        confirmarContrasena: ['', Validators.required]
    }, {
        validators: this.contrasenaMatchValidator
    });

    private contrasenaMatchValidator(control: AbstractControl): ValidationErrors | null {
        const contrasena = control.get('contrasena')?.value;
        const confirmarContrasena = control.get('confirmarContrasena')?.value;
        return contrasena === confirmarContrasena ? null : { contrasenaMisMatch: true};
    }

    onSubmit(): void {
        if (this.registrarForm.invalid) {
            this.registrarForm.markAllAsTouched();
            return;
        }

        this.isCargando.set(true);
        this.errorMensaje.set(null);

        const { nombre, apellido, correo, contrasena } = this.registrarForm.value;

        this.auth.registrar({ nombre: nombre!, apellido: apellido!, correo: correo!, contrasena: contrasena!}).subscribe({
            next: () => {
                this.isCargando.set(false);
                this.router.navigate(['/inventario-dashboard']);
            },
           error: (err: HttpErrorResponse) => {
            this.isCargando.set(false);
            const errorBody = err.error as {message?: string} | null;
            this.errorMensaje.set(errorBody?.message || 'Hubo un error en crear tu cuenta :(');
           }
        });
    }
}