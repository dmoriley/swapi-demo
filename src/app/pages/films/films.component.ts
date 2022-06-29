import {
  ChangeDetectionStrategy,
  Component, OnInit
} from '@angular/core';
import { BaseDataSource } from 'src/app/lib';
import { SwapiService } from 'src/app/lib/services/swapi/swapi.service';
import { SwapiFilm } from 'src/app/lib/services/swapi/swapi.types';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsPageComponent implements OnInit {
  dataSource: BaseDataSource<SwapiFilm>;
  displayedColumns = ['title', 'director', 'producer', 'episode_id', 'release_date'];
  constructor(private swapi: SwapiService) {}


  ngOnInit(): void {
    this.dataSource = new BaseDataSource(
      this.swapi.getPageResource<SwapiFilm>.bind(this.swapi, 'films')
    );
  }
}
