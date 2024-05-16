import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseDataSource, SwapiStarship } from 'src/app/lib';
import { DataTableComponent } from 'src/app/lib/components';
import { SwapiService } from 'src/app/lib/services/swapi/swapi.service';

@Component({
  standalone: true,
  imports: [DataTableComponent],
  selector: 'app-starships-page',
  templateUrl: './starships-page.component.html',
  styleUrls: ['./starships-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipsPageComponent implements OnInit {
  dataSource: BaseDataSource<SwapiStarship>;
  displayedColumns = [
    'name',
    'model',
    'manufacturer',
    'consumables',
    'hyperdrive_rating',
  ];
  constructor(private swapi: SwapiService) {}

  ngOnInit(): void {
    const resourceFunc = (page: number, search: string) => {
      return this.swapi.getPageResource<SwapiStarship>(
        'starships',
        page,
        search,
      );
    };
    this.dataSource = new BaseDataSource(resourceFunc);
  }
}
