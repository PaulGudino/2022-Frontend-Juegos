import { Menu } from './../../../interfaces/menu';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { Router } from '@angular/router';
import { PuenteDatosService } from 'src/app/servicios/puente-datos.service';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  Titulo = 'Menu';
  Titulo2 = 'App Juegos'
  menu: Menu[] = [];
  constructor(
    private api: ApiService,
    private router: Router,
    private puente: PuenteDatosService,
    private auth: AuthService
    ) {
  }


  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu(){
    this.api.getMenu().subscribe((data) => {
      this.menu = data;
    });
  }
  logout(){
    const id = this.puente.getuser_id();
    this.auth.Logout({id}).subscribe(
      (res: any) => {
        this.router.navigate(['/login']);
      }, error => {
        console.log(error);
      }
    );
  }
}