import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDetailsPageComponent } from './entity-details-page.component';

describe('EntityDetailsPageComponent', () => {
  let component: EntityDetailsPageComponent;
  let fixture: ComponentFixture<EntityDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
