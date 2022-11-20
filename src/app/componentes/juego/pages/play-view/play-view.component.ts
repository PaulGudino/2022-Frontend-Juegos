import { Component, Input, OnInit } from '@angular/core';
import { PublicityService } from '../../service/publicity/publicity.service';
import {StylesService } from '../../service/styles/styles.service';
import {Styles} from '../../../../interfaces/styles/Styles'


@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.css']
})
export class PlayViewComponent implements OnInit {
   informationText:string='A JUGAR!'
   availableSpin:number=2;
   informationTextGame:string=`Disponnible ${this.availableSpin} Giro mas`;
   top_publicity:string = this.publicity.getTopPublicity();
   bottom_publicity:string = this.publicity.getTopPublicity();

   style:Styles = this.stylesService.getStyles();



  constructor(
   private publicity: PublicityService,
   private stylesService: StylesService


  ) { }

  ngOnInit(): void {
  }

}
