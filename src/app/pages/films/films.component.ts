import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseDataSource } from 'src/app/lib';
import { DataTableComponent } from 'src/app/lib/components';
import { SwapiService } from 'src/app/lib/services/swapi/swapi.service';
import { SwapiFilm } from 'src/app/lib/services/swapi/swapi.types';

@Component({
  standalone: true,
  imports: [DataTableComponent],
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsPageComponent implements OnInit {
  dataSource: BaseDataSource<SwapiFilm>;
  displayedColumns = [
    'title',
    'director',
    'producer',
    'episode_id',
    'release_date',
  ];
  constructor(private swapi: SwapiService) {}

  ngOnInit(): void {
    const resourceFunc = (page: number, search: string) => {
      return this.swapi.getPageResource<SwapiFilm>('films', page, search);
    };
    this.dataSource = new BaseDataSource(resourceFunc);
  }
}
