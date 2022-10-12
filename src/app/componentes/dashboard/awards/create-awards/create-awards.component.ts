import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AwardsService } from 'src/app/servicios/awards/awards.service';

@Component({
  selector: 'app-create-awards',
  templateUrl: './create-awards.component.html',
  styleUrls: ['./create-awards.component.css']
})
export class CreateAwardsComponent implements OnInit {

  public previsulizacion: string = '';
  form: FormGroup;
  @ViewChild("takeInput", { static: false })
  InputVar!: ElementRef;
  fileToUpload!: File;

  Categorias = [
    {id: 'L', name: 'Legendaria'},
    {id: 'E', name: 'Epica'},
    {id: 'R', name: 'Rara'},
    {id: 'C', name: 'Común'},
    {id: 'P', name: 'Publicidad'},
  ]
  Juegos = [
    {id:'T', name: 'Traga Monedas'},
  ]

  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private awardSrv: AwardsService,
    private snackbar: SnackbarService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      initial_stock: ['', Validators.required],
      is_active: ['', Validators.required],
      category: ['', Validators.required],
      juego: ['', Validators.required],
  })
   }
  

  ngOnInit(): void {
  }
  capturarFile(event: any): void {
    const archivoCapturado = event.target.files[0];
    this.fileToUpload = archivoCapturado;
    let nombre = archivoCapturado.name;
    if ( nombre.split('.')[1] == 'png' || nombre.split('.')[1] == 'jpg' || nombre.split('.')[1] == 'jpeg' || nombre.split('.')[1] == 'gif' ) {
      this.extraerBase64(archivoCapturado).then((imagen: any) => {
        this.previsulizacion = imagen.base;
      });
    }else{
      this.deleteImage();
      this.snackbar.mensaje('Solo se permiten imagenes');
    }
  }
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      }
      return image;
    } catch (e) {
      return null;
    }
  }
  )

  deleteImage(){
    this.previsulizacion = '';
    this.InputVar.nativeElement.value = "";
  }

  enviar(){
    let formData: FormData = new FormData();
    let user_register = localStorage.getItem('user_id');

    formData.append('name', this.form.get('name')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('initial_stock', this.form.get('initial_stock')?.value);
    formData.append('is_active', this.form.get('is_active')?.value);
    formData.append('category', this.form.get('category')?.value);
    formData.append('juego', this.form.get('juego')?.value);
    formData.append('imagen', this.fileToUpload, this.fileToUpload.name);
    formData.append('user_register', user_register!);
    
    this.awardSrv.postAward(formData).subscribe(
      (res) => {
        this.snackbar.mensaje('Premio creado correctamente');
        this.router.navigate(['dashboard/premios']);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
