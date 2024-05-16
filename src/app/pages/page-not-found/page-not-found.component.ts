import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-page-not-found',
  template: `
    <header>
      <h1>Pretty empty here</h1>
    </header>
  `,
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
