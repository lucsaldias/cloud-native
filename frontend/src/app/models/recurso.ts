export interface Recurso {
    id?: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    rareza: 'comun' | 'raro' | 'epico' | 'legendario' | string;
    tamano?: string;
    urlArchivo: string;
}