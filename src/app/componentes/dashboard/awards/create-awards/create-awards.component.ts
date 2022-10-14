import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { ImageService } from 'src/app/servicios/image/image.service';

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
  fileToUpload!: File | null;
  imagen !: File;

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
    private awardSrv: AwardsService,
    private snackbar: SnackbarService,
    private dialogService: ConfirmDialogService,
    private imageSrv: ImageService
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
    this.fileToUpload = this.imageSrv.captureFile(event);
    if (this.fileToUpload) {
      this.imagen = this.fileToUpload;
      this.imageSrv.extraerBase64(this.imagen).then((imagen: any) => {
        this.previsulizacion = imagen.base;
      });
    }else{
      this.previsulizacion = '';
      this.InputVar.nativeElement.value = "";
      this.snackbar.mensaje('Solo se permiten imagenes');
    }
  }
  
  

  deleteImage(){
    this.previsulizacion = '';
    this.InputVar.nativeElement.value = "";
  }

  createAwards(){
    if (this.form.valid && this.fileToUpload) {
      const options = {
        title: 'CREAR PREMIO',
        message: 'ESTA SEGURO QUE QUIERE CREAR EL PREMIO?',
        cancelText: 'CANCELAR',
        confirmText: 'CONFIRMAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {

        let formData: FormData = new FormData();
        let user_register = localStorage.getItem('user_id');

        formData.append('name', this.form.get('name')?.value);
        formData.append('description', this.form.get('description')?.value);
        formData.append('initial_stock', this.form.get('initial_stock')?.value);
        formData.append('is_active', this.form.get('is_active')?.value);
        formData.append('category', this.form.get('category')?.value);
        formData.append('juego', this.form.get('juego')?.value);
        formData.append('imagen', this.imagen, this.imagen.name);
        formData.append('user_register', user_register!);

        this.awardSrv.postAward(formData).subscribe(
          (res) => {
            this.snackbar.mensaje('Premio creado correctamente');
            this.router.navigate(['dashboard/premios']);
          },
          (err) => {
            this.dialogService.error(err.error);
          }
        )
      });
    }else{
      this.snackbar.mensaje('Complete todos los campos');
    }
  }


  backAwards(){
    this.router.navigate(['dashboard/premios']);
  }
}
