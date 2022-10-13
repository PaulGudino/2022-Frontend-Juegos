import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      }
      return image;
    } catch (e) {
      return null;
    }
  }
  )

  captureFile(event: any): File | null {
    const archivoCapturado = event.target.files[0];
    let nombre = archivoCapturado.name;
    if ( nombre.split('.')[1] == 'png' || nombre.split('.')[1] == 'jpg' || nombre.split('.')[1] == 'jpeg' || nombre.split('.')[1] == 'gif' ) {
      return archivoCapturado;
    }else{
      return null;
    }
  }

}
