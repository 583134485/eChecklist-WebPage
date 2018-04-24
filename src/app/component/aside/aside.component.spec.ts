import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideComponent } from './aside.component';

describe('AsideComponent', () => {
  let component: AsideComponent;
  let fixture: ComponentFixture<AsideComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have .instanceList with "aside works!" and show success', () => {
    const asideElement: HTMLElement = fixture.nativeElement;
    const p = asideElement.querySelector('.instanceList');
    expect(p.textContent).toEqual('Instance');
  });
  it('should have .username with "aside works!" and show success', () => {
    const asideElement: HTMLElement = fixture.nativeElement;
    const p = asideElement.querySelector('.username');
    expect(p.textContent).toContain('Alexander');
  });
  it('should have .userstatus with "aside works!" and show success', () => {
    const asideElement: HTMLElement = fixture.nativeElement;
    const p = asideElement.querySelector('.userstatus');
    expect(p.textContent).toContain('online');
  });

});
