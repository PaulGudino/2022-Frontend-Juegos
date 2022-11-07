import { Component, OnInit } from '@angular/core';
import {ThemeService} from './service/theme.service';
@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  backgroundImgUrl = '';

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.themeService.getThemeImages()
    .subscribe(data => {
      console.log(data);
    })
  }

}
