import { Injectable, inject, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recurso } from "../models/recurso";

@Injectable({
    providedIn: 'root'
})
export class RecursoService {
    private http = inject(HttpClient);
    private API_URL = 'http://localhost:8080/api/recursos';

    private recursosSignal = signal<Recurso[]>([]);
    readonly recursoSeleccionado = signal<Recurso | null>(null);

    readonly filtroTexto = signal<string>('');
    readonly categoriaSeleccionada = signal<string>('Todos');

    readonly recursosFiltrados = computed(() => {
        const query = this.filtroTexto().toLowerCase();
        const cat = this.categoriaSeleccionada();

        return this.recursosSignal().filter( r => {
            const coincideTexto = r.nombre.toLowerCase().includes(query) || r.categoria.toLowerCase().includes(query);
            const coincideCat = cat === 'Todos' || r.categoria.toLowerCase() === cat.toLowerCase();
            return coincideTexto && coincideCat;
        });
    });

    cargarRecurso(): void {
        this.http.get<Recurso[]>(this.API_URL).subscribe({
            next: (data) => this.recursosSignal.set(data),
            error: (err) => console.error('Error al conectar con el Spring Boot :(', err)
        });
    }

    crearRecurso(recurso: Recurso): void {
        this.http.post<Recurso>(this.API_URL, recurso).subscribe({
            next: (nuevo) => this.recursosSignal.update(lista => [...lista, nuevo]),
            error: (err) => console.error('Error al guardar el recurso:', err)
        });
    }

    actualizarRecurso(id: number, recurso: Recurso): void {
        this.http.put<Recurso>(`${this.API_URL}/${id}`, recurso).subscribe({
            next: (actualizado) => {
                this.recursosSignal.update(lista =>
                    lista.map(item => item.id === id ? actualizado : item)
                );
                this.seleccionRecurso(actualizado);
            },
            error: (err) => console.error('Hubo un error en actualizar el recurso')
        });
    }

    eliminarRecurso(id: number): void {
        this.http.delete<void>(`${this.API_URL}/${id}`).subscribe({
            next: () => {
                this.recursosSignal.update(lista => lista.filter(r => r.id !== id));
                if (this.recursoSeleccionado()?.id === id) {
                    this.seleccionRecurso(null);
                }
            },
            error: (err) => console.error('Hubo un error al borrar el recurso:', err)
        });
    }

    seleccionRecurso(recurso: Recurso | null): void {
        this.recursoSeleccionado.set(recurso);
    }

    setFiltro(query: string): void {
        this.filtroTexto.set(query);
    }

    setCategoria(categoria: string): void {
        this.categoriaSeleccionada.set(categoria);
    }
}