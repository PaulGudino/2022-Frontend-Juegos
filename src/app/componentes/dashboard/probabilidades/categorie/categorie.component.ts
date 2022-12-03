import {
   Component,
   OnInit,
   Input,
   Output,
   EventEmitter,
   SimpleChanges,
} from '@angular/core';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';
import { ControllerProbabilityService } from '../../../../servicios/probability/controllerProbability/controller-probability.service';
import { Publicity } from '../../../../interfaces/publicity/publicity';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';

@Component({
   selector: 'app-categorie',
   templateUrl: './categorie.component.html',
   styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit {
   isModalOpen: boolean = false;
   @Output() propagar = new EventEmitter<any>();

   @Input() awards: any[] = [];
   publicityList: Publicity[] = [];

   @Input() title: string = '';
   @Input() color: string = '';
   @Input() box_number: Number = 1;
   @Input() boxes: Number[] = [];

   constructor(
      private probability: ProbabilityService,
      private controller: ControllerProbabilityService,
      private publicity: PublicityService
   ) {}

   ngOnInit(): void {
      // //  this.publicity.getPublicityList()
      // //  .subscribe(data => {
      // //    this.publicityList = data
      // // })
   }

   reload() {
      this.awards = this.controller.getNewAwards();
   }

   // ngOnChanges(changes: SimpleChanges) {
   //   console.log(changes)
   // }

   openModal() {
      this.isModalOpen = true;
      this.propagar.emit({
         isModalOpen: this.isModalOpen,
         category: this.title,
         awards: this.awards,
         publicity: this.publicityList,
      });
   }
}
