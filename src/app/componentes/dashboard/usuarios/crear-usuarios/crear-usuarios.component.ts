import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../../servicios/api.service';
import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/interfaces/roles';
import { UsuariosCrear } from 'src/app/interfaces/usuariocrear';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {

  roles: Roles[] = [];
  form: FormGroup
  constructor(private api: ApiService, private router: Router, private fb: FormBuilder) { 
    this.form = this.fb.group({
      cedula: ['', Validators.required],
      username: ['', Validators.required],
      names: ['', Validators.required],
      surnames: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      sex: ['', Validators.required],
      address: ['', Validators.required],
      rol: ['', Validators.required],
      is_active: ['', Validators.required],
  })
  }

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(){
    this.api.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }
  regresarUsuarios(){
    this.router.navigate(['/dashboard/usuarios']);
  }

  crearUsuario(){
    const usuario: UsuariosCrear = {
      cedula: this.form.value.cedula,
      username: this.form.value.username,
      names: this.form.value.names,
      surnames: this.form.value.surnames,
      email: this.form.value.email,
      password: this.form.value.password,
      phone: this.form.value.phone,
      sex: this.form.value.sex,
      address: this.form.value.address,
      rol: this.form.value.rol,
      is_active: this.form.value.is_active
    }
    this.api.postUsuarios(usuario).subscribe({
      next: (res) => {
        alert("Usuario creado exitosamente");
        this.regresarUsuarios();
      }
    })
  }

}
