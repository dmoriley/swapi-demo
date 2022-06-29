import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entity-details-page',
  templateUrl: './entity-details-page.component.html',
  styleUrls: ['./entity-details-page.component.scss'],
})
export class EntityDetailsPageComponent implements OnInit {
  extras;

  constructor(private router: Router) {
    const { extras } = this.router.getCurrentNavigation() ?? {};
    this.extras = extras;
  }

  ngOnInit(): void {}
}
