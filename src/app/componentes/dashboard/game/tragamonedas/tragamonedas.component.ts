import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameDateService } from 'src/app/servicios/game-date/game-date.service';

@Component({
  selector: 'app-tragamonedas',
  templateUrl: './tragamonedas.component.html',
  styleUrls: ['./tragamonedas.component.css']
})
export class TragamonedasComponent implements OnInit {

  form: FormGroup;

  Juegos = [
    {id:'T', name: 'Traga Monedas'},
  ]

  constructor(
    private fb: FormBuilder,
    private gamedateSrv: GameDateService,
    private router : Router
  ) { 
    this.form = this.fb.group({
      start_date:  ['', Validators.required],
      end_date:  ['', Validators.required],
      juego:  ['', Validators.required],
      is_active:  ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  backGameDate(){
    this.router.navigate(['/dashboard/juego'])
  }

  createGameDate(){
    this.gamedateSrv.postGameDate(this.form.value).subscribe(
      res => {
        alert('Juego creado con exito');
        console.log(res)
      },
      err => {
        alert('Error al crear el juego');
        console.log(err)
      }
    )
  }

}
