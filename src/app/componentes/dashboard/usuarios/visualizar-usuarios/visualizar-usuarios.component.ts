import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../../../interfaces/usuarios/usuarios';
import { ApiService } from '../../../../servicios/usuarios/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visualizar-usuarios',
  templateUrl: './visualizar-usuarios.component.html',
  styleUrls: ['./visualizar-usuarios.component.css']
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
  constructor(private api: ApiService, private router: Router, private activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    let usuarioid = this.activerouter.snapshot.paramMap.get('id');
    this.api.getUsuarioId(Number(usuarioid)).subscribe((data) => {
      this.usuarioget = data;
    })
  }
  regresarUsuarios(){
    this.router.navigate(['/dashboard/usuarios']);
  }
}
