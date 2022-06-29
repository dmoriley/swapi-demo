import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyLoadDropdownComponent } from './lazy-load-dropdown.component';

describe('LazyLoadDropdownComponent', () => {
  let component: LazyLoadDropdownComponent;
  let fixture: ComponentFixture<LazyLoadDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyLoadDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LazyLoadDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
