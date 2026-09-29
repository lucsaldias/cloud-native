import { Component, inject, signal, OnInit, OnDestroy } from "@angular/core";
import { RouterLink, Router } from "@angular/router";
import { MsalService, MsalBroadcastService } from "@azure/msal-angular";
import { InteractionStatus } from "@azure/msal-browser";
import { filter, Subject, takeUntil } from "rxjs";
import { loginRequest } from "../../auth-config"; 

@Component ({
    selector: 'registrar',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class Registro implements OnInit, OnDestroy {
    private msalService = inject(MsalService);
    private msalBroadcastService = inject(MsalBroadcastService);
    private router = inject(Router);
    private destroy$ = new Subject<void>();
    
    errorMensaje = signal<string | null>(null);
    isCargando = signal<boolean>(false);

    ngOnInit(): void {
        this.msalBroadcastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.isCargando.set(false);
                const cuentas = this.msalService.instance.getAllAccounts();
                
                if (cuentas.length > 0) {
                    this.msalService.instance.setActiveAccount(cuentas[0]);
                    this.router.navigate(['/inventario-dashboard']);
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onSubmit(): void {
        this.isCargando.set(true);
        this.errorMensaje.set(null);
        
        this.msalService.loginRedirect({
            ...loginRequest,
            redirectUri: 'http://localhost:4200/register'
        });
    }
}