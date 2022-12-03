import { Component, OnInit, Input } from '@angular/core';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Component({
   selector: 'app-box-publicity',
   templateUrl: './box-publicity.component.html',
   styleUrls: ['./box-publicity.component.css'],
})
export class BoxPublicityComponent implements OnInit {
   @Input() imageUrl: string = '';
   @Input() id: number = 0;
   @Input() isTop: boolean = true;
   constructor(
      private publicity: PublicityService,
      private dialog: ConfirmDialogService,
      private snackBar: SnackbarService,
      private dashPublicity: DashboardPublicityService
   ) {}

   ngOnInit(): void {}

   delete() {
      if (this.id == 0) {
         console.log('error');
      } else {
         const options = {
            title: 'ELIMINAR PUBLICIDAD',
            message: '¿ESTÁ SEGURO QUE QUIERE ELIMINAR ESTA PUBLICIDAD?',
            cancelText: 'CANCELAR',
            confirmText: 'ELIMINAR',
         };
         // let user_register = localStorage.getItem('user_id');
         this.dialog.open(options);
         this.dialog.confirmed().subscribe((confirmed) => {
            if (confirmed) {
               if (this.isTop) {
                  this.publicity
                     .deleteTopPublicity(this.id)
                     .subscribe((data) => {
                        this.chargeTopPublicity();
                     });
               } else {
                  this.publicity
                     .deleteBottomPublicity(this.id)
                     .subscribe((data) => {
                        this.chargeBottomPublicity();
                     });
               }

               this.snackBar.mensaje('Publicidad Eliminada exitosamente');
            }
         });
      }
   }

   chargeTopPublicity() {
      this.publicity.getPublicityTopList().subscribe((data) => {
         this.dashPublicity.loadTopData(data);
      });
   }
   chargeBottomPublicity() {
      this.publicity.getPublicityBottomList().subscribe((data) => {
         this.dashPublicity.loadBottomData(data);
      });
   }
}
