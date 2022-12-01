export interface Styles{
   id: number;
   game_id: number;
   color_text: string;
   font_letter:string;

   image_machine_game?: any;
   image_background_game?: string;
   image_logo_game?: string;
   color_background_game: string;

   video_screensaver?: any;
   video_autoplay:boolean;
   video_loop:boolean;
   title_button_screensaver: string;

   scan_code_title:string;
   scan_code_description:string

   title_winner: string;
   description_winner: string;
   image_winner?:any;

   date_created: Date;
   date_modified: Date;
   is_active: boolean;
}
