import {
  ChangeDetectionStrategy,
  Component, OnInit
} from '@angular/core';
import { BaseDataSource, SwapiVehicle } from 'src/app/lib';
import { SwapiService } from 'src/app/lib/services/swapi/swapi.service';

@Component({
  selector: 'app-vehicles-page',
  templateUrl: './vehicles-page.component.html',
  styleUrls: ['./vehicles-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class VehiclesPageComponent implements OnInit {
  dataSource: BaseDataSource<SwapiVehicle>;
  displayedColumns = ['name', 'model', 'manufacturer' ,'vehicle_class', 'cost_in_credits'];
  constructor(private swapi: SwapiService) {}


  ngOnInit(): void {
    this.dataSource = new BaseDataSource(
      this.swapi.getPageResource<SwapiVehicle>.bind(this.swapi, 'vehicles')
    );
  }
}
