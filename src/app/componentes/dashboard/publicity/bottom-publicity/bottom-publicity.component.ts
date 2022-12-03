import { Component, OnInit, Input } from '@angular/core';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';

@Component({
   selector: 'app-bottom-publicity',
   templateUrl: './bottom-publicity.component.html',
   styleUrls: ['./bottom-publicity.component.css'],
})
export class BottomPublicityComponent implements OnInit {
   form: FormGroup;

   constructor(
      public dashPublicity: DashboardPublicityService,
      private publicity: PublicityService,
      private router: Router,
      private fb: FormBuilder,
      private dialog: ConfirmDialogService,
      private snackBar: SnackbarService
   ) {
      this.form = this.fb.group({
         transition: [''],
      });
   }

   ngOnInit(): void {
      this.chargePublicity();
   }
   regresar() {
      this.router.navigate(['/dashboard/juego/publicidad']);
   }
   guardarPublicidad() {
      if (this.form.valid) {
         const options = {
            title: 'CAMBIAR CONFIGURACION PROBABILIDADES JUEGO',
            message:
               '¿ESTÁ SEGURO QUE QUIERE CAMBIAR LA CONFIGURACION DE PROBABILIDADES?',
            cancelText: 'CANCELAR',
            confirmText: 'CREAR',
         };
         // let user_register = localStorage.getItem('user_id');
         this.dialog.open(options);
         this.dialog.confirmed().subscribe((confirmed) => {
            if (confirmed) {
               let formDataTop: FormData = new FormData();
               formDataTop.append(
                  'image',
                  this.dashPublicity.getBottomImageFileToUpload(),
                  this.dashPublicity.getBottomImageFileToUpload().name
               );
               formDataTop.append(
                  'time_display',
                  this.form.get('transition')?.value
               );
               this.publicity
                  .postBottomPublicity(formDataTop)
                  .subscribe((data) => {
                     this.chargePublicity();
                  });
               this.cleanData();
               this.snackBar.mensaje(
                  'Publicidad Superior Agregada exitosamente'
               );
            }
         });
      }
   }

   cleanData() {
      this.dashPublicity.setPreviewBottomImage('');
      this.form.controls['transition'].setValue('');
   }
   chargePublicity() {
      this.publicity.getPublicityBottomList().subscribe((data) => {
         this.dashPublicity.loadBottomData(data);
      });
   }
}
