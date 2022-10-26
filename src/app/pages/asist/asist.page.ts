import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-asist',
  templateUrl: './asist.page.html',
  styleUrls: ['./asist.page.scss'],
})
export class AsistPage implements OnInit {
  ramos: Observable<any>;


  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.ramos = this.dataService.getRamos();
  }

}
