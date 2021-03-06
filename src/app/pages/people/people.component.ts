import {
  ChangeDetectionStrategy,
  Component, OnInit
} from '@angular/core';
import { BaseDataSource } from 'src/app/lib';
import { SwapiService } from 'src/app/lib/services/swapi/swapi.service';
import { SwapiPerson } from 'src/app/lib/services/swapi/swapi.types';

@Component({
  selector: 'sw-people-page',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeoplePageComponent implements OnInit {
  dataSource: BaseDataSource<SwapiPerson>;
  displayedColumns = ['name', 'height', 'mass', 'hair_color', 'eye_color'];


  constructor(private swapi: SwapiService) {}

  ngOnInit(): void {
    this.dataSource = new BaseDataSource(
      this.swapi.getPageResource<SwapiPerson>.bind(this.swapi, 'people')
    );
  }
}
