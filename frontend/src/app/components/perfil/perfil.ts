import { Component, OnInit, signal, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink, Router } from "@angular/router";

export interface Recurso {
    idRecurso: number;
    nombreRecurso: string;
    descRecurso: string;
    categRecurso: string;
    rutaArchivo: string;
    nombreCreador: string;
    descargas: number;
}

@Component({
    selector: 'perfil-usuario',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './perfil.html',
    styleUrl: './perfil.css'
})

export class Perfil implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    usuarioLogeado = signal<string>(localStorage.getItem('currentUser') || 'Invitado');

    siguiendoLista = signal<string[]>(['yorch']);

    perfilUsuario = signal<string>('');
    isPerfilPropio = computed(() => this.perfilUsuario().toLowerCase() === this.usuarioLogeado().toLowerCase());

    estaSiguiendo = computed(() => this.siguiendoLista().includes(this.perfilUsuario().toLowerCase()));

    recursosGlobales = signal<Recurso[]>([
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
        }
    ])

    userAssets = computed(() => 
    this.recursosGlobales().filter(
        r => r.nombreCreador.toLowerCase() === this.perfilUsuario().toLowerCase()
    )
   );

   totalDescargas = computed(() =>
    this.userAssets().reduce((acumulado, asset) => acumulado + asset.descargas, 0)
   );

   totalDescargasFormateado = computed(() => {
    const total = this.totalDescargas();
    if (total >= 1000) {
      return (total / 1000).toFixed(1) + 'k';
    }
    return total.toString();
  });

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const username = params['username'];
            if (username) {
                this.perfilUsuario.set(username);
            } else {
                if (this.usuarioLogeado() === 'Invitado') {
                    this.router.navigate(['/inventario-dashboard']);
                } else {
                    this.perfilUsuario.set(this.usuarioLogeado());
                }
            }
        });
    }

    toggleSeguir() {
        if (this.usuarioLogeado() === 'Invitado') {
            alert('Necesitas iniciar sesion para seguir a este usuario.');
            this.router.navigate(['/login']);
            return;
        }

        const creador = this.perfilUsuario().toLowerCase();

        if (this.estaSiguiendo()) {

        this.siguiendoLista.update(lista => lista.filter(u => u !== creador));
    } else {
        this.siguiendoLista.update(lista => [...lista, creador]);
    }
   }
}