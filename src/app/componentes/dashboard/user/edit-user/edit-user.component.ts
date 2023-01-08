import { Usuarios } from '../../../../interfaces/usuarios/usuarios';
import { ApiService } from '../../../../servicios/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Roles } from 'src/app/interfaces/roles/roles';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { map, Observable, startWith } from 'rxjs';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditarUsuariosComponent implements OnInit {

  form: FormGroup;
  roles: Roles[] = [];
  filteredOptions!: Observable<Roles[]>;
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
    private snackBar: SnackbarService,
    private dialogService: ConfirmDialogService,
    private staticData: PuenteDatosService
    ) {

    this.form = this.fb.group({
      cedula: new FormControl('', [Validators.required, Validators.minLength(10)]),
      username: ['', Validators.required],
      names: ['', Validators.required],
      surnames: ['', Validators.required],
      email : new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      sex: ['', Validators.required],
      address: ['', Validators.required],
      rol: new FormControl('', [Validators.required, autocompleteObjectValidator()]),
      is_active: ['', Validators.required],
  })
   }

   private _filter(name: string): Roles[] {
    if (name === '') {
      return this.roles.slice();
    }
    const filterValue = name.toLowerCase();
    return this.roles.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(rol: Roles): string | undefined {
    // Muetsra el valor que se asigne en el input
    const valueshow = rol.name;
    return rol && rol.name ? valueshow : undefined;
  }

  public validation_msgs = {
    'contactAutocompleteControl': [
      { type: 'invalidAutocompleteObject', message: 'Seleccione una opción del listado !!!' },
    ]
  }

  async ngOnInit(): Promise<void> {
    this.staticData.setMenuGeneral();
    
    await this.cargarRoles();
    let usuarioid = this.activerouter.snapshot.paramMap.get('id');
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
        (data) => {
          this.form.controls['rol'].setValue(data[0]);
        })
      this.form.controls['is_active'].setValue(this.usuarioget.is_active.toString())
    });
  }

  regresarUsuarios(){
    this.router.navigate(['/dashboard/usuarios']);
  }


  async cargarRoles(){
    this.api.getRoles().subscribe((data) => {
      this.roles = data;
      this.filteredOptions = this.form.controls['rol'].valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.roles.slice();
        }),
      );
    });
  }
  
  actualizarUsuario(){
    let usuarioid = this.activerouter.snapshot.paramMap.get('id');
    if (this.form.valid){
      const options = {
        title: 'EDITAR USUARIO',
        message: '¿ESTÁ SEGURO QUE QUIERE ACTUALIZAR EL USUARIO '+ this.form.get('names')?.value+ ' '+this.form.get('surnames')?.value +'?',
        cancelText: 'CANCELAR',
        confirmText: 'EDITAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          let formData: FormData = new FormData();
          formData.append('cedula', this.form.get('cedula')?.value);
          formData.append('username', this.form.get('username')?.value);
          formData.append('names', this.form.get('names')?.value);
          formData.append('surnames', this.form.get('surnames')?.value);
          formData.append('email', this.form.get('email')?.value);
          formData.append('phone', this.form.get('phone')?.value);
          formData.append('sex', this.form.get('sex')?.value);
          formData.append('address', this.form.get('address')?.value);
          formData.append('rol', this.form.get('rol')?.value.id);
          formData.append('is_active', this.form.get('is_active')?.value);
          formData.append('rol_request', sessionStorage.getItem('rol_id') || '');

          this.api.putUsuario(Number(usuarioid), formData).subscribe(
            (data) => {
              this.snackBar.mensaje('Usuario Actualizado Exitosamente');
              this.router.navigate(['/dashboard/usuarios']);
            },
            (res) => {
              this.dialogService.error(res.error);
            }
          );
        }
      }
    );
  }else{
    this.snackBar.mensaje('Llene el formulario correctamente');
  }
}

}
