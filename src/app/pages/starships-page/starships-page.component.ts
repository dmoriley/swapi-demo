import {
  ChangeDetectionStrategy,
  Component, OnInit
} from '@angular/core';
import { BaseDataSource, SwapiStarship } from 'src/app/lib';
import { SwapiService } from 'src/app/lib/services/swapi/swapi.service';

@Component({
  selector: 'app-starships-page',
  templateUrl: './starships-page.component.html',
  styleUrls: ['./starships-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class StarshipsPageComponent implements OnInit {
  dataSource: BaseDataSource<SwapiStarship>;
  displayedColumns = ['name', 'model', 'manufacturer' ,'consumables', 'hyperdrive_rating'];
  constructor(private swapi: SwapiService) {}


  ngOnInit(): void {
    this.dataSource = new BaseDataSource(
      this.swapi.getPageResource<SwapiStarship>.bind(this.swapi, 'starships')
    );
  }
}
