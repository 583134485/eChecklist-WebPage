import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../../route/app.router';
import { AddInstanceComponent } from '../add-instance/add-instance.component';
import { ListInstanceComponent } from '../list-instance/list-instance.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TempalteNamePipe } from '../../share/pipe/template-pipe/tempalte-name.pipe';
import { APP_BASE_HREF } from '@angular/common';
import { WorkflowListComponent } from '../workflow-list/workflow-list.component';
import { WorkflowStepsComponent } from '../workflow-steps/workflow-steps.component';
import { BackBtnComponent } from '../../share/component/back-btn/back-btn.component';
import { SaveBtnComponent } from '../../share/component/save-btn/save-btn.component';
import { StepsDetailComponent } from '../../component/steps-detail/steps-detail.component';
import { InstanceDetailComponent } from '../../component/instance-detail/instance-detail.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        AddInstanceComponent,
        ListInstanceComponent,
        TempalteNamePipe,
        WorkflowListComponent,
        WorkflowStepsComponent,
        BackBtnComponent,
        SaveBtnComponent,
        StepsDetailComponent,
        InstanceDetailComponent
      ],
      imports: [
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/app-login' }, { provide: Router, useValue: routerSpy }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should tell ROUTER to navigate when List Instance clicked', () => {
    component.navigateToIndex();
    this.router = fixture.debugElement.injector.get(Router);
    const spy = this.router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    // expecting to navigate to id of the component's first hero;
    expect(navArgs).toBe('/app-list-instance',
      'should nav to Instance Detail for view');
  });

});
