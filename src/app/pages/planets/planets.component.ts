import {
  ChangeDetectionStrategy,
  Component, OnInit
} from '@angular/core';
import { BaseDataSource, SwapiPlanet } from 'src/app/lib';
import { SwapiService } from 'src/app/lib/services/swapi/swapi.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsPageComponent implements OnInit {
  dataSource: BaseDataSource<SwapiPlanet>;
  displayedColumns = ['name', 'climate', 'terrain' ,'gravity', 'orbital_period'];
  constructor(private swapi: SwapiService) {}


  ngOnInit(): void {
    this.dataSource = new BaseDataSource(
      this.swapi.getPageResource<SwapiPlanet>.bind(this.swapi, 'planets')
    );
  }
}
