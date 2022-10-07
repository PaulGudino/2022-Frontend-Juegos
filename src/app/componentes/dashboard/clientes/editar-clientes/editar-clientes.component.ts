import { ConfirmacionEditarComponent } from '../confirmacion-editar/confirmacion-editar.component';
import { Usuarios } from '../../../../interfaces/usuarios/usuarios';
import { ApiService } from '../../../../servicios/usuarios/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosEditar } from 'src/app/interfaces/usuarios/usuarioeditar';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Roles } from 'src/app/interfaces/roles/roles';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {

  form: FormGroup;
  roles: Roles[] = [];
  id_rol: number = 0;
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
    private api: ApiService ,
    private fb: FormBuilder, 
    private router: Router, 
    private activerouter: ActivatedRoute, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    ) {

    this.form = this.fb.group({
      cedula: ['', Validators.required],
      username: ['', Validators.required],
      names: ['', Validators.required],
      surnames: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      sex: ['', Validators.required],
      address: ['', Validators.required],
      rol: ['', Validators.required],
      is_active: ['', Validators.required],
  })
   }

  ngOnInit(): void {
    
    let usuarioid = this.activerouter.snapshot.paramMap.get('id');
    this.cargarRoles();
    this.api.getUsuarioId(Number(usuarioid)).subscribe((data) => {
      this.usuarioget = data;
      this.form.controls['cedula'].setValue(this.usuarioget.cedula);
      this.form.controls['username'].setValue(this.usuarioget.username);
      this.form.controls['names'].setValue(this.usuarioget.names);
      this.form.controls['surnames'].setValue(this.usuarioget.surnames);
      this.form.controls['email'].setValue(this.usuarioget.email);
      this.form.controls['phone'].setValue(this.usuarioget.phone);
      this.form.controls['sex'].setValue(this.usuarioget.sex);
      this.form.controls['address'].setValue(this.usuarioget.address);
      this.api.getRolbyName(this.usuarioget.rol).subscribe(
        (data)=> { 
          this.form.controls['rol'].setValue(data[0].id.toString());
        })
      this.form.controls['is_active'].setValue(this.usuarioget.is_active.toString())
    });
  }

  regresarUsuarios(){
    this.router.navigate(['/dashboard/usuarios']);
  }


  cargarRoles(){
    this.api.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  actualizarUsuario(){
    let usuarioid = this.activerouter.snapshot.paramMap.get('id');
    const usuario: UsuariosEditar = {
      id: Number(usuarioid),
      cedula: this.form.value.cedula,
      username: this.form.value.username,
      names: this.form.value.names,
      surnames: this.form.value.surnames,
      email: this.form.value.email,
      phone: this.form.value.phone,
      sex: this.form.value.sex,
      address: this.form.value.address,
      rol: this.form.value.rol,
      is_active: this.form.value.is_active,
    }
    if(this.form.valid){
      const dialogref = this.dialog.open(ConfirmacionEditarComponent,{
        width:'50%',
        data: usuario
      });
      dialogref.afterClosed().subscribe(res =>{
        console.log(res)
      })
    }else{
      this.error();
    }
    
  }
  error(){
    this.snackBar.open('Llene el formulario correctamente', '', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    })
  }
}
