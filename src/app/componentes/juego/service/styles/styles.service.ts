import { Injectable } from '@angular/core';
import{Styles} from '../../../../interfaces/styles/Styles'

@Injectable({
  providedIn: 'root'
})
export class StylesService {

   style:Styles = {
      id:1,
      video_screensaver: '',
      title_button_screensaver: '',
      image_background_game: '',
      image_logo_game: '',
      color_background_game:'',
      color_text: '',
      title_winner: '',
      description_winner: '',
      date_created: new Date(),
      date_modified: new Date(),
      is_active: true,
      game_id: 1,
   }


  constructor(
  ) { }

   loadData(style:Styles){
      this.style = style;
   }

   getTitleButtonScreensaver():string{
      return this.style.title_button_screensaver;
   }
   getLogoUrl():string{
      return this.style.image_logo_game;
  }
   getStyles(){
      return this.style
   }



   }
