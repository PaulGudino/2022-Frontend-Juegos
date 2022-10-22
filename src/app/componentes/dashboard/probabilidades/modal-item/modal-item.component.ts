import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.css']
})
export class ModalItemComponent implements OnInit {
  @Input() name: string='product name';
  @Input() stock: string='-';
  @Input() imgUrl: string='';

  constructor() { }

  ngOnInit(): void {
  }

}
