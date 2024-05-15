import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseDataSource, SwapiSpecies } from 'src/app/lib';
import { SwapiService } from 'src/app/lib/services/swapi/swapi.service';

@Component({
  selector: 'app-species-page',
  templateUrl: './species-page.component.html',
  styleUrls: ['./species-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesPageComponent implements OnInit {
  dataSource: BaseDataSource<SwapiSpecies>;
  displayedColumns = [
    'name',
    'classification',
    'designation',
    'language',
    'average_lifespan',
  ];
  constructor(private swapi: SwapiService) {}

  ngOnInit(): void {
    const resourceFunc = (page: number, search: string) => {
      return this.swapi.getPageResource<SwapiSpecies>('species', page, search);
    };
    this.dataSource = new BaseDataSource(resourceFunc);
  }
}
