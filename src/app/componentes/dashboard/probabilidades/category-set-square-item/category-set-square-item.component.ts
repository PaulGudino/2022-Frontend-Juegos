
import { Component, OnInit,Input } from '@angular/core';


@Component({
  selector: 'app-category-set-square-item',
  templateUrl: './category-set-square-item.component.html',
  styleUrls: ['./category-set-square-item.component.css']
})
export class CategorySetSquareItemComponent implements OnInit {
  @Input() category:string ='category';
  squares:number=-1;

  constructor() { }

  ngOnInit(): void {
  }

}
