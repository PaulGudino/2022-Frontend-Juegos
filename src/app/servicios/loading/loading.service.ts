import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoadin$ = new Subject<boolean>();

  constructor() { }

  show(): void {
    this.isLoadin$.next(true);
  }
  hide(): void {
    this.isLoadin$.next(false);
  }
}
