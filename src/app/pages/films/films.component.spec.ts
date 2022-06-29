import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsPageComponent } from './films.component';

describe('FilmsComponent', () => {
  let component: FilmsPageComponent;
  let fixture: ComponentFixture<FilmsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
