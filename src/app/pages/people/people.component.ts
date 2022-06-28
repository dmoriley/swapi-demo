import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BaseDataSource } from 'src/app/lib';
import { SwapiService } from 'src/app/lib/services/swapi/swapi.service';
import { SwapiPeople } from 'src/app/lib/services/swapi/swapi.types';

@Component({
  selector: 'sw-people-page',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeoplePageComponent implements OnInit {
  dataSource: BaseDataSource<SwapiPeople>;
  displayedColumns = ['name', 'height', 'mass', 'hair_color', 'eye_color'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filterInput') filterInput: ElementRef;

  constructor(private swapi: SwapiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataSource = new BaseDataSource(
      this.swapi.getAllPeople.bind(this.swapi)
    );
  }
}
