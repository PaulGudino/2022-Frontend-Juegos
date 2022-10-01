import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/servicios/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  isLoading$ = this.loading.isLoadin$;

  constructor(
    private loading: LoadingService,
  ) { }

  ngOnInit(): void {
  }

}
