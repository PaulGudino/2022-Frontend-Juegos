import { map, Observable, startWith } from 'rxjs';
import { PuenteDatosService } from './../../../../servicios/comunicacio_componentes/puente-datos.service';
import { SnackbarService } from '../../../../servicios/snackbar/snackbar.service';
import { FormGroup,FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ApiService } from '../../../../servicios/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/interfaces/roles/roles';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';

function autocompleteObjectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } }
    }
    return null  /* valid option selected */
  }
}

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})


export class CrearUsuariosComponent implements OnInit {

  roles: Roles[] = [];
  form: FormGroup;
  filteredOptions!: Observable<Roles[]>;
  ocultar = true;
  listSex = [
    {id: 'M', name: 'Masculino'},
    {id: 'F', name: 'Femenino'},
    {id: 'O', name: 'Otro'}
  ];

  constructor(
    private api: ApiService, 
    private router: Router, 
    private fb: FormBuilder, 
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
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      sex: ['', Validators.required],
      address: ['', Validators.required],
      rol: new FormControl('', [Validators.required, autocompleteObjectValidator()])
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

  ngOnInit(): void {
    this.staticData.setMenuGeneral();
    this.cargarRoles()
  }

  crearUsuario():void{
    console.log(this.form.value)
    if(this.form.valid){
      const options = {
        title: 'CREAR USUARIO',
        message: '¿ESTÁ SEGURO QUE QUIERE CREAR EL NUEVO USUARIO?',
        cancelText: 'CANCELAR',
        confirmText: 'CREAR'
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
          formData.append('password', this.form.get('password')?.value);
          formData.append('phone', this.form.get('phone')?.value);
          formData.append('sex', this.form.get('sex')?.value);
          formData.append('rol', this.form.get('rol')?.value.id);
          formData.append('address', this.form.get('address')?.value);
          formData.append('rol_request', localStorage.getItem('rol_id') || '');
          this.api.postUsuarios(formData).subscribe({
            next: (res) => {
              this.snackBar.mensaje('Usuario Creado Exitosamente')
              this.regresarUsuarios();
            },
            error: (res)=>{
              this.dialogService.error(res.error);
            }
          })
        }
      });
    }else{
      this.snackBar.mensaje('Llene el formulario correctamente')
    }
  }

  cargarRoles(){
    this.api.getRoles().subscribe((data) => {
      this.roles = data;
      // Filtrar roles
      this.filteredOptions = this.form.controls['rol'].valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.roles.slice();
        }),
      );
    });
  }

  regresarUsuarios(){
    this.router.navigate(['/dashboard/usuarios']);
  }

}
