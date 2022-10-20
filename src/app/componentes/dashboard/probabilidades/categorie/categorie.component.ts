import { Component, OnInit,Input } from '@angular/core';
import { getAwardList } from 'src/app/interfaces/awards/getAwardList';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  @Input() awards:getAwardList[]=[];
  @Input() title:string = ''
  @Input() color:string=''


  constructor(

  ) { }

  ngOnInit(): void {

  }

}
