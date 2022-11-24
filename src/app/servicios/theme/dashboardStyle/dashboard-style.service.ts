import { Injectable } from '@angular/core';
import{Styles} from '../../../interfaces/styles/Styles'

@Injectable({
  providedIn: 'root'
})
export class DashboardStyleService {
   imageBackgroundGameFile!: File
   imageLogoGameFile!: File;
   videoScreensaverFile!:File

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

  constructor() { }

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
  getImageBackgroundGameFile(){
   return this.imageBackgroundGameFile;
  }
  setImageBackgroundGameFile(file:any){
   this.imageBackgroundGameFile = file
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
   return this.style.image_logo_game;
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

public get_description_winner() {
   return this.style.description_winner
}

public  set_description_winner(description:string){
   this.style.description_winner = description;
}

public get_date_created(){
   return this.style.date_created
}

public  set_modified_date(newDate:Date) {
   this.style.date_modified = newDate;
}

public get_is_active(){
   return this.style.is_active
}



}
