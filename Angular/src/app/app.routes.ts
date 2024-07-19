import { Routes } from '@angular/router';
import { MaquetacionLoginComponent } from './componentes/maquetacion/maquetacion-login/maquetacion-login.component';
import { MaquetacionTiendaComponent } from './componentes/maquetacion/maquetacion-tienda/maquetacion-tienda.component';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { RegistroComponent } from './componentes/usuarios/registro/registro.component';
import { ConfirmacionRegistroComponent } from './componentes/usuarios/confirmacion-registro/confirmacion-registro.component';
import { PerfilComponent } from './componentes/usuarios/perfil/perfil.component';
import { CatalogoComponent } from './componentes/tienda/catalogo/catalogo.component';
import { usuarioAutenticadoGuard } from './guards/usuarioAutenticadoGuard';
import { registroVerificadoGuard } from './guards/registroVerificadoGuard';
import { CestaComponent } from './componentes/tienda/cesta/cesta.component';
import { OfertasComponent } from './componentes/tienda/ofertas/ofertas.component';
import { ResumenCestaComponent } from './componentes/tienda/resumen-cesta/resumen-cesta.component';
import { FormularioCompraComponent } from './componentes/tienda/formulario-compra/formulario-compra.component';

export const routes: Routes = [

    {
        path: '',
        component: MaquetacionLoginComponent,
        children: [
            {
                path: '',
                component: LoginComponent
            },
            {
                path: 'registro',
                component: RegistroComponent
            },
            {
                path: 'confirmacion',
                canActivate: [ registroVerificadoGuard ],
                component: ConfirmacionRegistroComponent
            }
        ]
    },
    {
        path: 'tienda',
        canActivate: [ usuarioAutenticadoGuard ],
        component: MaquetacionTiendaComponent,
        children: [
            {
                path: 'perfil',
                component: PerfilComponent
            },
            {
                path: 'catalogo',
                component: CatalogoComponent
            },
            {
                path: 'cesta',
                component: CestaComponent
            },
            {
                path: 'compra',
                component: FormularioCompraComponent
            },
            //
            //Rutas para el named router outlet 'barra-izq'
            //
            {
                outlet    : "barra-izquierda",
                path      : "ofertas",
                component : OfertasComponent
                //Puede tener children
            },
            //
            //Rutas para el named router outlet 'der'

            //
            {
                outlet    : "barra-derecha",
                path      : "resumen",
                component : ResumenCestaComponent
                //Puede tener children
            }
        ]
    }

];
