import { Component, signal, computed, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink, Router } from "@angular/router";
import Swal from "sweetalert2";

export interface Recurso {
    idRecurso?: number;
    nombreRecurso: string;
    nombreCreador: string;
    descRecurso: string;
    categRecurso: string;
    rutaArchivo:  string,
    descargas?: number;
}

@Component({
    selector: 'inventario-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './inventario.html',
    styleUrl: './inventario.css',
})

export class InventarioDashboard implements OnInit {
    busqueda = signal<string>('');
    categoriaSeleccionada = signal<string>('Todos');

    constructor(private router: Router) {}

    seleccionarCategoria(categoria: string): void {
        this.categoriaSeleccionada.set(categoria);
    }

    crearNuevoRecurso(): void {
        if(this.esInvitado()) {
            Swal.fire({
                title: '¡Inicia Sesion o Registrate!',
                text: 'Para crear un nuevo recurso, necesitas iniciar sesion o registrarte.',
                imageUrl: 'https://i.pinimg.com/474x/f3/e0/9b/f3e09b5a5f7e73c23e3a91fbb1a03451.jpg',
                imageWidth: 120,
                imageHeight: 120,
                imageAlt: 'Icono',
                showCancelButton: true,
                confirmButtonColor: '#00d62a',
                cancelButtonColor: '#ef4444',
                confirmButtonText: '🔑 Iniciar Sesion',
                cancelButtonText: 'Cancelar',
                background: '#151f28',
                color: '#ffffff',

                didOpen: (popup) => {
                    popup.style.border = '2px solid #ffffff';
                    popup.style.borderRadius = '16px';
                    popup.style.boxShadow = '0 0 20px rgba(0, 210, 106, 0.25)';
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    this.router.navigate(['/login']);
                }
            });
            return;
        }

        const usuarioActual = localStorage.getItem('currentUser') || 'Invitado';
        if (usuarioActual === 'Invitado') {
            alert('Debes iniciar sesion para seguir a un creador.');
            this.router.navigate(['/login']);
            return;
        }

        console.log('Abrir formulario de creacion de recursos');
    }

    siguiendoLista = signal<string[]>(['yorch']);

    comunidades = [
        {nombre: 'Unreal Engine Chile', miembros: '1.2k Miembros', icono: '🔮'},
        {nombre: 'Unity Indie Developers', miembros: '3.4k Miembros', icono: '⚡'},
        {nombre: 'Pixel & 3D LATAM', miembros: '42k Miembors', icono: '🎨'}
    ]

    obtenerTotalComunidades(): number {
        if(this.esInvitado()) {
            return 0;
        }
        return this.comunidades.length;
    }

    estaSiguiendo(nombreCreador: string): boolean {
        if (this.esInvitado()) {
            return false;
        }
        return this.siguiendoLista().includes(nombreCreador.toLowerCase());
    }

    seguirCreadorDirecto(nombreCreador: string, event: Event) {
        event.stopPropagation();

        if(this.esInvitado()) {
            Swal.fire({
                title: '¡Inicia Sesion o Registrate!',
                text: `Para poder seguir a ${nombreCreador} y estar al tanto de sus publicaciones, necesitaras iniciar sesion o registrarte`,
                imageUrl: 'https://i.pinimg.com/474x/f3/e0/9b/f3e09b5a5f7e73c23e3a91fbb1a03451.jpg',
                imageWidth: 120,
                imageHeight: 120,
                imageAlt: 'Icono',
                showCancelButton: true,
                confirmButtonColor: '#00d62a',
                cancelButtonColor: '#ef4444',
                confirmButtonText: '🔑 Iniciar Sesion',
                cancelButtonText: 'Cancelar',
                background: '#151f28',
                color: '#ffffff',

                didOpen: (popup) => {
                    popup.style.border = '2px solid #ffffff';
                    popup.style.borderRadius = '16px';
                    popup.style.boxShadow = '0 0 20px rgba(0, 210, 106, 0.25)';
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    this.router.navigate(['/login']);
                }
            });
            return;
        }

        const usuarioActual = localStorage.getItem('currentUser') || 'Invitado';
        if (usuarioActual === 'Invitado') {
            alert('Debes iniciar sesion para seguir a un creador.');
            this.router.navigate(['/login']);
            return;
        }

        const creador = nombreCreador.toLowerCase();

        if (this.siguiendoLista().includes(creador)) {
            this.siguiendoLista.update(lista => lista.filter(c => c !== creador));
        } else {
            this.siguiendoLista.update(lista => [...lista, creador]);
        }

        console.log(`Siguiendo al creador: ${nombreCreador}`);
    }

    categorias = ['Todos', 'Modelo 3D', 'Textura', 'VFX', 'Scripts', 'Audio'];

    recursos = signal<Recurso[]>([
       {
            idRecurso: 1,
            nombreRecurso: 'Star Wars Blaster Sound',
            nombreCreador: 'darthvader',
            descRecurso: 'Efecto de sonido de los blaster de los stormtroopers.',
            categRecurso: 'Audio',
            rutaArchivo: 'https://p.turbosquid.com/ts-thumb/8y/Qjszva/KFPYw8cL/blasterfrontright34/png/1548902238/1920x1080/fit_q87/8f6ef028f7a8c86315155ea1894f8595ac973064/blasterfrontright34.jpg',
            descargas: 152333
        },
        {
            idRecurso: 2,
            nombreRecurso: 'Super Mario 64 Textures',
            nombreCreador: 'empanacio.lol',
            descRecurso: 'El paquete de texturas completo del Super Mario 64.',
            categRecurso: 'Textura',
            rutaArchivo: 'https://textures.spriters-resource.com/media/game_icons/1/1026.png',
            descargas: 53002
        },
        {
            idRecurso: 3,
            nombreRecurso: 'Script Fuego Animado',
            nombreCreador: 'yorch',
            descRecurso: 'Un script para animar el fuego de forma realista.',
            categRecurso: 'Scripts',
            rutaArchivo: 'https://images.unsplash.com/photo-1618325508550-951512a1e82d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGxhbWFzJTIwZGUlMjBmdWVnb3xlbnwwfHwwfHx8MA%3D%3D',
            descargas: 25032
        },
        {
            idRecurso: 4,
            nombreRecurso: 'Doro 3D Model',
            nombreCreador: 'Cults',
            descRecurso: 'dorooooo',
            categRecurso: 'Modelo 3D',
            rutaArchivo: 'https://images.cults3d.com/_PriX-1xpcH0shyC9VZFvlA6NaQ=/516x516/filters:no_upscale()/https://fbi.cults3d.com/uploaders/41970553/illustration-file/3d761aff-1bf7-4f18-a11f-ea986d4dfb8c/untitled.png',
            descargas: 2000000        
        },
        {
            idRecurso: 5,
            nombreRecurso: 'Mario 3D model',
            nombreCreador: 'empanacio.lol',
            descRecurso: 'its a me, mario',
            categRecurso: 'Modelo 3D',
            rutaArchivo: 'https://p.turbosquid.com/ts-thumb/TE/8IcoKi/gp/signature/png/1788748861/1920x1080/fit_q87/1829a3490f11ee02056bbf71c6677c35a38788a4/signature.jpg',
            descargas: 12431        
        },
        {
            idRecurso: 6,
            nombreRecurso: 'Efecto Humo Azul',
            nombreCreador: 'pin',
            descRecurso: 'Humo azul animado, perfecto para animaciones de peleas',
            categRecurso: 'VFX',
            rutaArchivo: 'https://img.magnific.com/vector-gratis/efectos-comicos-nubes-fuego-humo-explosion-bomba-hechizo-magico-explosion-juego-2d-elementos-vfx-explosion-llama-azul-humo-aislado-ilustracion-dibujos-animados-vector-fondo_107791-22504.jpg?semt=ais_hybrid&w=740&q=80',
            descargas: 890        
        },
        {
            idRecurso: 7,
            nombreRecurso: 'aerodinamica de una empanada',
            nombreCreador: 'arr',
            descRecurso: 'empanadas',
            categRecurso: 'Scripts',
            rutaArchivo: 'https://i.redd.it/t2yvanfk0m161.jpg',
            descargas: 12003
        },
        {
            idRecurso: 8,
            nombreRecurso: 'Corona 3D',
            nombreCreador: 'darthvader',
            descRecurso: 'modelo de corona en 3d, para que te sientas que pudiste conquistar polonia.',
            categRecurso: 'Modelo 3D',
            rutaArchivo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwfzn7SlQWnmZHzlpmyG2FCVFdErK3cDcCd1oR4KA10eY02IwsgmELWic&s=10',
            descargas: 400000
        }
    ]);

    recursosFiltrados = computed(() => {
        const query = this.busqueda().toLowerCase();
        const cat = this.categoriaSeleccionada();

        return this.recursos().filter(recurso => {
            const coincideCat = cat === 'Todos' || recurso.categRecurso === cat;
            const coincideTexto = 
                recurso.nombreRecurso.toLowerCase().includes(query) ||
                recurso.nombreCreador.toLowerCase().includes(query) ||
                recurso.descRecurso.toLowerCase().includes(query);

            return coincideCat && coincideTexto;
        });
    });

    usuarioActual = signal<string>(localStorage.getItem('currentUser') || 'Invitado');
    esInvitado = computed(() => this.usuarioActual() === 'Invitado')

    isInvitado: boolean = true;
    nombreUsuario: string = 'Invitado';

    ngOnInit(): void {
        this.verificarEstadoSesion();
    }
    
    verificarEstadoSesion(): void {
        const usuarioLogueado = localStorage.getItem('user')

        if (usuarioLogueado) {
            const usuario = JSON.parse(usuarioLogueado);
            this.isInvitado = false;
            this.nombreUsuario = usuario.nombre || usuario.nombreusuario || 'Developer';
        } else {
            this.isInvitado = true;
            this.nombreUsuario = 'Invitado';
        }
    }

    cerrarSesion(): void{
        localStorage.removeItem('user');
        this.isInvitado = true;
        this.nombreUsuario = 'Invitado';
    }
}