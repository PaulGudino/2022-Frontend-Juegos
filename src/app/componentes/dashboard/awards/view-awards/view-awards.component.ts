import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';
import { AwardsService } from 'src/app/servicios/awards/awards.service';

@Component({
  selector: 'app-view-awards',
  templateUrl: './view-awards.component.html',
  styleUrls: ['./view-awards.component.css']
})
export class ViewAwardsComponent implements OnInit {

  constructor(
    private award: AwardsService,
    private router: Router,
    private activerouter: ActivatedRoute
  ) { }

  premioget: getAwardList = {
    id: 0,
    name: '',
    description: '',
    imagen: '',
    initial_stock: 0,
    current_stock: 0,
    prizes_awarded: 0,
    is_active: true,
    created: '',
    modified: '',
    user_register: '',
    user_modify: '',
    category: '',
    game: ''
  };

  ngOnInit(): void {
    let premioid = this.activerouter.snapshot.paramMap.get('id');
    this.award.getAwardbyIdVisualizer(Number(premioid)).subscribe((data) => {
      this.premioget = data;
      console.log(this.premioget);
    })
  }
  regresarPremios(){
    this.router.navigate(['/dashboard/premios']);
  }
}
