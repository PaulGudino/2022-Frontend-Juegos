import { Injectable } from '@angular/core';
import{Styles} from '../../../../interfaces/styles/Styles'

@Injectable({
  providedIn: 'root'
})
export class StylesService {

   style:Styles = {
      id:1,
      game_id: 1,
      color_text: '',
      font_letter:'',

      image_machine_game : '',
      image_background_game: '',
      image_logo_game: '',
      color_background_game:'',

      video_screensaver: '',
      video_autoplay:true,
      video_loop:true,
      title_button_screensaver: '',

      scan_code_title:'',
      scan_code_description:'',

      title_winner: '',
      description_winner: '',
      image_winner:'',

      date_created: new Date(),
      date_modified: new Date(),
      is_active: true,
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
