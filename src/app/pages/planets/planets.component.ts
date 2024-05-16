import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseDataSource, SwapiPlanet } from 'src/app/lib';
import { DataTableComponent } from 'src/app/lib/components';
import { SwapiService } from 'src/app/lib/services/swapi/swapi.service';

@Component({
  standalone: true,
  imports: [DataTableComponent],
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsPageComponent implements OnInit {
  dataSource: BaseDataSource<SwapiPlanet>;
  displayedColumns = [
    'name',
    'climate',
    'terrain',
    'gravity',
    'orbital_period',
  ];
  constructor(private swapi: SwapiService) {}

  ngOnInit(): void {
    const resourceFunc = (page: number, search: string) => {
      return this.swapi.getPageResource<SwapiPlanet>('planets', page, search);
    };
    this.dataSource = new BaseDataSource(resourceFunc);
  }
}
