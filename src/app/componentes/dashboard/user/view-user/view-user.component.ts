import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../../../interfaces/usuarios/usuarios';
import { ApiService } from '../../../../servicios/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';

@Component({
  selector: 'app-visualizar-usuarios',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class VisualizarUsuariosComponent implements OnInit {

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
    private router: Router, 
    private activerouter: ActivatedRoute,
    private staticData: PuenteDatosService
    ) { }

  ngOnInit(): void {
    this.staticData.setMenuGeneral();
    let usuarioid = this.activerouter.snapshot.paramMap.get('id');
    this.api.getUsuarioId(Number(usuarioid)).subscribe((data) => {
      this.usuarioget = data;
    })
  }
  regresarUsuarios(){
    this.router.navigate(['/dashboard/usuarios']);
  }
}
