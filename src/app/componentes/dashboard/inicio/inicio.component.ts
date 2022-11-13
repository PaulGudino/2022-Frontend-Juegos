import { Usuarios } from '../../../interfaces/usuarios/usuarios';
import { ApiService } from '../../../servicios/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuarioget: Usuarios ={
    id: 0,
    cedula : '',
    names : '',
    surnames : '',
    username : '',
    email : '',
    phone : '',
    password : '',
    sex : '',
    address : '',
    rol : '',
    is_active : true,
    created : '',
    modified : '',
    last_session : ''
  }; 
  constructor(
    private api: ApiService,
    private router: Router
    ) {
      
     }

  ngOnInit(): void {
    this.obtenerUsuario();
  }
  obtenerUsuario(){
    // const id = this.puente.getuser_id();
    const id = localStorage.getItem('user_id');
    // JSON.parse(); para convetir a objeto lo del localstorage
    if (id) {
      this.api.getUsuarioId(Number(id)).subscribe(
        res => {
          this.usuarioget = res;
        },
        err => console.log(err)
      );
    }
  }
  cambiarContrasenia(){
    this.router.navigate(['/dashboard/cambiar-contraseña']);
  }
}
