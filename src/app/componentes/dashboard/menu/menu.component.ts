import { Menu } from './../../../interfaces/menu';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/usuarios/api.service';
import { Router } from '@angular/router';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { AuthInterceptor } from 'src/app/interceptores/auth.interceptor';

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
    let refresh !: string
    if (localStorage.getItem('token')){
        let formData: FormData = new FormData();
        refresh = localStorage.getItem('refresh')!;
        formData.append('refresh', refresh);
        this.auth.Logout(formData).subscribe(
          res => {
            this.router.navigate(['/login']);
            localStorage.clear();
            AuthInterceptor.accessToken = '';
          },
          err => console.log(err)
        );
    }else{
      this.router.navigate(['/login']);
    }
  }
}