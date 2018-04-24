import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule, Component } from '@angular/core';
// component
import { StepsDetailComponent } from './steps-detail.component';
import { StatusTransfer } from './../../share/util/StatusTransfer';
import { CheckName } from '../../share/validator/checkName';
import { BackBtnComponent } from '../../share/component/back-btn/back-btn.component';
import { SaveBtnComponent } from '../../share/component/save-btn/save-btn.component';
import { WorkflowListComponent } from '../workflow-list/workflow-list.component';
import { LoginComponent } from '../login/login.component';
import { AddInstanceComponent } from '../add-instance/add-instance.component';
import { ListInstanceComponent } from '../list-instance/list-instance.component';
import { WorkflowStepsComponent } from '../workflow-steps/workflow-steps.component';
import { InstanceDetailComponent } from '../../component/instance-detail/instance-detail.component';
import { of } from 'rxjs/observable/of';

// service
import { StepService } from '../../service/stepService/step.service';
import { InstanceService } from '../../service/instanceService/instance.service';
import { WorkflowService } from '../../service/workflowService/workflow.service';

// module
import { AppRoutingModule } from '../../route/app.router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// pipe
import { TempalteNamePipe } from '../../share/pipe/template-pipe/tempalte-name.pipe';
// route
import { APP_BASE_HREF } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

const expectHttpResult = {
  StatusCode: '02',
  Data: [],
};
describe('StepsDetailComponent', () => {
  let component: StepsDetailComponent;
  let fixture: ComponentFixture<StepsDetailComponent>;
  let instanceService: InstanceService;
  let stepService: StepService;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    TestBed.configureTestingModule({
      declarations: [
        StepsDetailComponent,
        BackBtnComponent,
        SaveBtnComponent,
        WorkflowListComponent,
        AddInstanceComponent,
        ListInstanceComponent,
        LoginComponent,
        TempalteNamePipe,
        WorkflowStepsComponent,
        InstanceDetailComponent],
      imports: [AppRoutingModule, ReactiveFormsModule, FormsModule, NoopAnimationsModule, HttpClientModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/app-steps-detail' },
        InstanceService,
        StepService,
        WorkflowService,
        TempalteNamePipe,
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({
              stepId: 'test', stepName: 'test',
              workflowId: 'test', workflowName: 'test'
            })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should deleteInstance', () => {
    let spy: jasmine.Spy;
    instanceService = TestBed.get(InstanceService);
    spy = spyOn(instanceService, 'deleteInstance').and.returnValue(of(expectHttpResult));
    component.deleteInstance('test');
  });
  it('should getStepDetail', () => {
    let spy: jasmine.Spy;
    stepService = TestBed.get(StepService);
    spy = spyOn(stepService, 'getStepDetail').and.returnValue(of(expectHttpResult));
    component.getStepDetail();
  });
  it('should addStep', () => {
    component.ifWorkflowId = false;
    let spy: jasmine.Spy;
    stepService = TestBed.get(StepService);
    spy = spyOn(stepService, 'addStep').and.returnValue(of(expectHttpResult));
    component.addStepOrUpdate();
  });
  it('should updataStep', () => {
    component.ifWorkflowId = true;
    let spy: jasmine.Spy;
    stepService = TestBed.get(StepService);
    spy = spyOn(stepService, 'updateStep').and.returnValue(of(expectHttpResult));
    component.addStepOrUpdate();
  });
  it('should navigate back', () => {
    component.toBack();
    this.router = fixture.debugElement.injector.get(Router);
    const spy = this.router.navigate as jasmine.Spy;
    const args = spy.calls.first().args[0];
    expect(args).toEqual(['/app-workflow-steps']);
  });
  it('should navigate addInstanceDetail', () => {
    component.addInstanceDetail();
    this.router = fixture.debugElement.injector.get(Router);
    const spy = this.router.navigate as jasmine.Spy;
    const args = spy.calls.first().args[0];
    expect(args).toEqual(['/app-instance-detail']);
  });
  it('should navigate toUpdateInstance', () => {
    component.toUpdateInstance('test');
    this.router = fixture.debugElement.injector.get(Router);
    const spy = this.router.navigate as jasmine.Spy;
    const args = spy.calls.first().args[0];
    expect(args).toEqual(['/app-instance-detail']);
  });
});
