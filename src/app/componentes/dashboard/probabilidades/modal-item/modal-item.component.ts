<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit,Input } from '@angular/core';
>>>>>>> testing

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.css']
})
export class ModalItemComponent implements OnInit {
<<<<<<< HEAD
=======
  @Input() name: string='product name';
  @Input() stock: string='-';
  @Input() imgUrl: string='';
>>>>>>> testing

  constructor() { }

  ngOnInit(): void {
  }

}
