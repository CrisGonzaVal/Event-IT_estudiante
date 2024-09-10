import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeminariosPage } from './seminarios.page';

describe('SeminariosPage', () => {
  let component: SeminariosPage;
  let fixture: ComponentFixture<SeminariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeminariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
