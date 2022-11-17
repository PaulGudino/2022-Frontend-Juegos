import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Component({
  selector: 'app-edit-awards',
  templateUrl: './edit-awards.component.html',
  styleUrls: ['./edit-awards.component.css']
})
export class EditAwardsComponent implements OnInit {

  img_upload = "assets/img/upload.png";

  public previsulizacion: string = this.img_upload;
  form: FormGroup;
  @ViewChild("takeInput", { static: false })
  InputVar!: ElementRef;
  fileToUpload!: File | null;
  imagen !: File;
  getPremio: any
  
  Categorias = [
    {id: 'L', name: 'Legendaria'},
    {id: 'E', name: 'Epica'},
    {id: 'R', name: 'Rara'},
    {id: 'C', name: 'Común'},
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
    private snackbar: SnackbarService,
    private dialogService: ConfirmDialogService,
    private activerouter: ActivatedRoute, 
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
    let award_id = this.activerouter.snapshot.paramMap.get('id');
    this.awardSrv.getAwardbyId(Number(award_id)).subscribe(
      (res) => {
        this.getPremio = res;
        console.log(this.getPremio.imagen);
        this.form.patchValue({
          name: this.getPremio.name,
          description: this.getPremio.description,
          initial_stock: this.getPremio.initial_stock,
          is_active: this.getPremio.is_active.toString(),
          category: this.getPremio.category,
          juego: this.getPremio.juego,
        })
        this.previsulizacion = this.getPremio.imagen;
      },
      (err) => {
        console.log(err);
      }
    )
  }
  capturarFile(event: any): void {
    this.fileToUpload = this.imageSrv.captureFile(event);
    if (this.fileToUpload) {
      this.imageSrv.extraerBase64(this.fileToUpload).then((imagen: any) => {
        this.previsulizacion = imagen.base;
      });
    }else{
      this.previsulizacion = this.img_upload;
      this.InputVar.nativeElement.value = "";
      this.snackbar.mensaje('Solo se permiten imagenes');
    }
  }

  deleteImage(){
    this.previsulizacion = this.img_upload;
    this.InputVar.nativeElement.value = "";
    this.fileToUpload = null;
  }

  editAwards() {
    if (this.form.valid) {
      let award_id = this.activerouter.snapshot.paramMap.get('id');
      const options = {
        title: 'EDITAR PREMIO',
        message: '¿ESTÁ SEGURO QUE QUIERE EDITAR EL PREMIO '+ this.form.get('name')?.value +'?',
        cancelText: 'CANCELAR',
        confirmText: 'EDITAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {

        if (confirmed) {
          let formData: FormData = new FormData();
          let user_modify = localStorage.getItem('user_id');

          formData.append('name', this.form.get('name')?.value);
          formData.append('description', this.form.get('description')?.value);
          formData.append('initial_stock', this.form.get('initial_stock')?.value);
          formData.append('is_active', this.form.get('is_active')?.value);
          formData.append('category', this.form.get('category')?.value);
          formData.append('juego', this.form.get('juego')?.value);
          if (this.fileToUpload) {
            this.imagen = this.fileToUpload;
            formData.append('imagen', this.imagen, this.imagen.name);
          }
          formData.append('user_modify', user_modify!);

          this.awardSrv.putAward(Number(award_id), formData).subscribe(
            (res) => {
              this.snackbar.mensaje('Premio Actualizado Exitosamente');
              this.router.navigate(['/dashboard/premios']);
            },
            (err) => {
              this.dialogService.error(err.error);
              
            }
          )
        }
      });
    }
  }

  backAwards() {
    this.router.navigate(['/dashboard/premios']);
  }

}
