import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { MatchService } from 'src/app/servicios/match/match.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/servicios/client/client.service';
import { Client } from 'src/app/interfaces/client/Client';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {

  clientId = this.activedRoute.snapshot.paramMap.get('id');
  singularName : string = 'cliente';
  pluralName : string = 'clientes';
  actionName : string = 'visualizar';

  Filters = [
    // {id: '?state=Activo', name: 'Clientes Activos'},
    // {id: '?state=Inactivo', name: 'Clientes Inactivos'},
    {id: '?ticket__client__id='+this.clientId+'&win_match=true&delivered=false', name: 'Premios No Entregados'},
    {id: '?ordering=date_created&ticket__client__id='+this.clientId , name: 'Primeras Partidas Jugadas'},
    {id: '?ordering=-date_created&ticket__client__id='+this.clientId , name: 'Últimas Partidas Jugadas'},
  ]
  default_filter = '?ordering=-date_created&ticket__client__id='+this.clientId

  client : Client = {
    id : '',
    cedula : '',
    names : '',
    surnames : '',
    email : '',
    phone : '',
    sex : '',
    address : '',
    // state : '',
    user_client_register : '',
    user_client_modify : '',
    created : '',
    modified : '',
    client: '',
  };
  client_history : any

  constructor(
    private router : Router,
    private activedRoute : ActivatedRoute,
    private clientAPI : ClientService,
    private staticData: PuenteDatosService,
    private matchSrv: MatchService,
    private dialogService: ConfirmDialogService,
    private snackSrv: SnackbarService
  ) {}

  toList() {
    this.router.navigate(['dashboard/' + this.pluralName]);
  }

  ngOnInit(): void {
    this.staticData.setMenuGeneral();
    this.clientAPI.getById(Number(this.clientId)).subscribe((data) => {
      this.client = data;
    })
    this.getClientHistory(this.default_filter)
  }
  getClientHistory(string:any){
    this.matchSrv.getMatchFilterClientHistory(string).subscribe(
      (data:any)=>{
        this.client_history = data
      }
    )
  }
  filter(filter: string) {
    this.getClientHistory(filter);
  }
  async deliveryAward(id:string){
    
    const options = {
      title: 'ENTREGAR PREMIO',
      message: '¿ESTÁ SEGURO QUE DESEA CAMBIAR ENTREGAR EL PREMIO?',
      cancelText: 'CANCELAR',
      confirmText: 'ENTREGAR'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(async confirmed => {
      if (confirmed) {
        let formData : FormData = new FormData();
        formData.append('delivery', 'true');
        this.matchSrv.changeDelivered(id, formData).subscribe(
          data=>{
            this.snackSrv.mensaje('Se cambió el estado de la entrega del premio')
            this.getClientHistory(this.default_filter)
          }
        )
      }
    });
    
  }
}

