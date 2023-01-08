import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AwardsService } from 'src/app/servicios/awards/awards.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { TicketConfigurationService } from 'src/app/servicios/ticket-configuration/ticket-configuration.service';

@Component({
  selector: 'app-ticket-configuration',
  templateUrl: './ticket-configuration.component.html',
  styleUrls: ['./ticket-configuration.component.css']
})
export class TicketConfigurationComponent implements OnInit {

  codigoQR = "123456"
  img_upload = ""
  imagen !: File;
  public previsulizacion: string = this.img_upload;
  form: FormGroup;
  @ViewChild("takeInput", { static: false })
  fileToUpload!: File | null;
  InputVar!: ElementRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private awardSrv: AwardsService,
    private snackbar: SnackbarService,
    private dialogService: ConfirmDialogService,
    private imageSrv: ImageService,
    private staticData: PuenteDatosService,
    private TicketConfigurationSrv: TicketConfigurationService
  ) { 
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
  })
  }

  ngOnInit(): void {
    this.staticData.setMenuGeneral();
    this.getTicketConfiguration();
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
  cancel(){
    this.router.navigate(['/dashboard/tickets']);
  }

  getTicketConfiguration(){
    this.TicketConfigurationSrv.getTicketConfiguration().subscribe((data: any) => {
      this.form.patchValue({
        title: data.title,
        description: data.description,
      })
      this.previsulizacion = data.logo;
    })
  }

  updateTicketConfiguration(){
    if (this.form.valid) {
      const options = {
        title: 'ACTUALIZAR CONFIGURACIÓN DEL TICKET',
        message: '¿ESTÁ SEGURO QUE DESEA ACTUALIZAR CONFIGURACIÓN DEL TICKET'+'?',
        cancelText: 'CANCELAR',
        confirmText: 'ACTUALIZAR'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {

        if (confirmed) {
          let formData: FormData = new FormData();

          formData.append('title', this.form.get('title')?.value);
          formData.append('description', this.form.get('description')?.value);

          if (this.fileToUpload?.name) {
            this.imagen = this.fileToUpload;
            formData.append('logo', this.imagen, this.imagen.name);
          }

          this.TicketConfigurationSrv.updateTicketConfiguration(formData).subscribe(
            (res) => {
              this.snackbar.mensaje('Configuración Del Ticket Actualizado Exitosamente');
              this.router.navigate(['/dashboard/tickets']);
            },
            (err) => {
              this.dialogService.error(err.error);
              
            }
          )
        }
      });
    }else{
      this.snackbar.mensaje('Llene el formulario correctamente')
    }
  }

}
