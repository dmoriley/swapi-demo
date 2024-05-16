import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseDataSource, SwapiVehicle } from 'src/app/lib';
import { DataTableComponent } from 'src/app/lib/components';
import { SwapiService } from 'src/app/lib/services/swapi/swapi.service';

@Component({
  standalone: true,
  imports: [DataTableComponent],
  selector: 'app-vehicles-page',
  templateUrl: './vehicles-page.component.html',
  styleUrls: ['./vehicles-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesPageComponent implements OnInit {
  dataSource: BaseDataSource<SwapiVehicle>;
  displayedColumns = [
    'name',
    'model',
    'manufacturer',
    'vehicle_class',
    'cost_in_credits',
  ];
  constructor(private swapi: SwapiService) {}

  ngOnInit(): void {
    const resourceFunc = (page: number, search: string) => {
      return this.swapi.getPageResource<SwapiVehicle>('vehicles', page, search);
    };
    this.dataSource = new BaseDataSource(resourceFunc);
  }
}
