import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLearnComponent } from './item-learn.component';

describe('ItemLearnComponent', () => {
  let component: ItemLearnComponent;
  let fixture: ComponentFixture<ItemLearnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemLearnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
