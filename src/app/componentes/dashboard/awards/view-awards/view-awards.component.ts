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

  premioget: any;

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
