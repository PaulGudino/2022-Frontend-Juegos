import { Injectable } from '@angular/core';
import{Styles} from '../../../interfaces/styles/Styles'

@Injectable({
  providedIn: 'root'
})
export class DashboardStyleService {
   imageBackgroundGameFile!: File
   imageLogoGameFile!: File;
   imageMachineGameFile!: File;
   imageWinnerGameFile!: File;
   videoScreensaverFile!:File;
   previewFontLetter:string='';

   style:Styles = {
      id:1,
      game_id: 1,
      color_text: '',
      font_letter:'',

      image_machine_game : '',
      image_background_game: '',
      image_logo_game: '../../../assets/img/logoejemplo.png',
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

  constructor() { }

  loadData(style:Styles){
   this.style = style;
  }

  getTitleButtonScreensaver():string{
   return this.style.title_button_screensaver;
  }
  getLogoUrl():string{
   if(this.style.image_logo_game !=undefined){
      return this.style.image_logo_game;

   }else
   return '';
  }
  getStyles(){
   return this.style
  }
  getImageBackgroundGameFile(){
   return this.imageBackgroundGameFile;
  }
  setImageBackgroundGameFile(file:any){
   this.imageBackgroundGameFile = file
  }
  getImageWinnerGameFile(){
   return this.imageWinnerGameFile;
  }
  setImageWinnerGameFile(file:any){
   this.imageWinnerGameFile = file
  }
  getImageLogoFile(){
   return this.imageLogoGameFile
  }
  setImageLogoFile(file:any){
   this.imageLogoGameFile = file
  }
  getVideoScreensaverFile(){
   return this.videoScreensaverFile;
  }
  setVideoScreensaverFile(file:any){
   this.videoScreensaverFile = file
  }
  getImageMachineGameFile(){
   return this.imageMachineGameFile;
  }
  setImageMchineGameFile(file:any){
   this.imageMachineGameFile = file
  }
  getPreviewFontLetter(){
   return this.previewFontLetter;
  }
  setPreviewFontLetter(font:string){
   this.previewFontLetter = font
  }

  public get_video_screensaver(): string{
   return this.style.video_screensaver;
}

public set_video_screensaver(video:string):void{
   this.style.video_screensaver = video;
}

public get_title_button_screensaver(){
   return this.style.title_button_screensaver;
}

public  set_title_button_screensaver(title:string):void{
   this.style.title_button_screensaver = title;
}

public get_image_background_game() {
   return this.style.image_background_game;
}

public get_image_logo_game() {
   if(this.style.image_logo_game !=undefined){
      return this.style.image_logo_game;

   }else{
      return '';
   }
}

public get_color_background_game(){
	return this.style.color_background_game;
}

public  set_color_background_game(newColor:string){
   this.style.color_background_game = newColor;
}

public get_color_text(){
   return this.style.color_text;
}

public  set_color_text(color:string){
	this.style.color_text = color;

}

public get_title_winner() {
   return this.style.title_winner
}

public  set_title_winner(title:string){
   this.style.title_winner = title;
}

public get_scan_code_title() {
   return this.style.scan_code_title
}

public  set_scan_code_title(title:string){
   this.style.scan_code_title = title;
}
public get_scan_code_description() {
   return this.style.scan_code_description;
}

public  set_scan_code_description(description:string){
   this.style.scan_code_description = description;
}

public get_description_winner() {
   return this.style.description_winner
}
public get_image_machine_game() {
   return this.style.image_machine_game;
}

public  set_description_winner(description:string){
   this.style.description_winner = description;
}

public get_date_created(){
   return this.style.date_created
}
public get_image_winner(){
   return this.style.image_winner;
}
public get_font_letter(){
   return this.style.font_letter;
}

public  set_modified_date(newDate:Date) {
   this.style.date_modified = newDate;
}

public get_is_active(){
   return this.style.is_active
}



}
