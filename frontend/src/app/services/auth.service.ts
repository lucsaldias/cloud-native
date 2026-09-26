import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Login } from "../components/login/login";

export interface RegistroPayLoad {
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
}

export interface LoginPayLoad {
    correo: string;
    contrasena: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/auth';

    registrar(datos: RegistroPayLoad): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, datos);
    }

    login(datos: LoginPayLoad): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, datos);
    }
}