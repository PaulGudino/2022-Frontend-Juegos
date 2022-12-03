import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'app-button-primary',
   templateUrl: './button-primary.component.html',
   styleUrls: ['./button-primary.component.css'],
})
export class ButtonPrimaryComponent implements OnInit {
   @Input() title: string = '';
   @Input() backgroundColor: string = '#00ffc5';
   @Input() styledPadding: string = '0.5rem 2rem';
   @Input() fontSize: string = '14px';

   constructor() {}

   ngOnInit(): void {}
}
