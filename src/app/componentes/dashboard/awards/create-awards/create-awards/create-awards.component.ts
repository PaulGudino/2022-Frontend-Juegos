import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { postAward } from 'src/app/interfaces/awards/postAward';
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
  ArchivoImagen : postAward = {
    imagen: new File([""], "filename")
  }
  
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
    private awardSrv: AwardsService
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
    console.log(archivoCapturado.name);
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsulizacion = imagen.base;
    });
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

  // enviar(){
  //   this.ArchivoImagen.imagen = this.fileToUpload;
  //   this.awardSrv.prueba(this.ArchivoImagen).subscribe(
  //     (res) => {
  //       console.log(res);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   )
  // }
  enviar(){
    let formData: FormData = new FormData();
    formData.append('imagen', this.fileToUpload, this.fileToUpload.name);
    formData.append('Hola', 'Vengo del front');
    console.log(formData);
    this.awardSrv.prueba(formData).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }
}


