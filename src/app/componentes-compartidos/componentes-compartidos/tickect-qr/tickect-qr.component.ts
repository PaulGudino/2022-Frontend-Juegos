import { TicketConfigurationService } from 'src/app/servicios/ticket-configuration/ticket-configuration.service';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/servicios/game/game.service';

@Component({
  selector: 'app-tickect-qr',
  templateUrl: './tickect-qr.component.html',
  styleUrls: ['./tickect-qr.component.css']
})
export class TickectQRComponent implements OnInit {

  @Input() logo = '';
  @Input() title = '';
  @Input() description = '';
  @Input() startdate = '';
  @Input() enddate = '';

  @Input() codigoQR: string = '';
  @Input() QRdata: string = '';

  constructor(
    private GameSrv: GameService,
    private QrConfigSrv: TicketConfigurationService
  ) { }

  ngOnInit(): void {
    console.log(this.QRdata)

    this.GameSrv.getById(1).subscribe((res: any) => {
      this.startdate = res.start_date.split('T')[0].split('-').reverse().join('/');
      this.enddate = res.end_date.split('T')[0].split('-').reverse().join('/');
    });

    this.QrConfigSrv.getTicketConfiguration().subscribe((res: any) => {
      this.logo = res.logo;
      this.title = res.title;
      this.description = res.description;
    });
  }

}
