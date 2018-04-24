import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule, Component } from '@angular/core';
import { WorkflowStepsComponent } from './workflow-steps.component';
import { LoginComponent } from '../login/login.component';
import { AddInstanceComponent } from '../add-instance/add-instance.component';
import { ListInstanceComponent } from '../list-instance/list-instance.component';
import { BackBtnComponent } from '../../share/component/back-btn/back-btn.component';
import { SaveBtnComponent } from '../../share/component/save-btn/save-btn.component';
import { WorkflowListComponent } from '../workflow-list/workflow-list.component';
import { StepsDetailComponent } from '../../component/steps-detail/steps-detail.component';
import { InstanceDetailComponent } from '../../component/instance-detail/instance-detail.component';
import { of } from 'rxjs/observable/of';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';


// module
import { AppRoutingModule } from '../../route/app.router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// pipe
import { TempalteNamePipe } from '../../share/pipe/template-pipe/tempalte-name.pipe';

// route
import { APP_BASE_HREF } from '@angular/common';
// service
import { StepService } from '../../service/stepService/step.service';
import { InstanceService } from '../../service/instanceService/instance.service';
import { WorkflowService } from '../../service/workflowService/workflow.service';
import { Observable } from 'rxjs/Observable';
import { ResultBean } from '../../model/resultBean';
import { asyncData } from '../../../testing/async-observable-helpers';
import { Workflow } from '../../model/workflow';
import { ReplaySubject } from 'rxjs/ReplaySubject';


let workflowService: WorkflowService;
let stepService: StepService;
const expectHttpResult = {
  StatusCode: '02',
  Data: [],
};
const expectTrueHttpResult = {
  StatusCode: '01',
  Data: [
    {
      Id: 'test',
      StepId: 'test',
      Name: 'test',
      Type: 'test',
      Modifiedtime: 'test'
    }]
};
const fakeParam = {
  workflowId: 'test',
  workflowName: 'test'
};
describe('WorkflowStepsComponent', () => {
  let component: WorkflowStepsComponent;
  let fixture: ComponentFixture<WorkflowStepsComponent>;


  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    TestBed.configureTestingModule({
      declarations: [
        WorkflowStepsComponent,
        AddInstanceComponent,
        ListInstanceComponent,
        LoginComponent,
        BackBtnComponent,
        SaveBtnComponent,
        WorkflowListComponent,
        TempalteNamePipe,
        StepsDetailComponent,
        InstanceDetailComponent],
      imports: [AppRoutingModule, ReactiveFormsModule, FormsModule, HttpClientModule, NoopAnimationsModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: 'app-workflow-steps' },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { queryParams: of({ workflowId: 'test', workflowName: 'test' }) } },
        TempalteNamePipe, StepService, WorkflowService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // add
  it('should add workflow and get null data', () => {
    let spy: jasmine.Spy;
    workflowService = TestBed.get(WorkflowService);
    spy = spyOn(workflowService, 'addWorkflow').and.returnValue(of(expectHttpResult));
    component.ifCreate = true;
    component.workflowName = 'test';
    const result = component.addWorkFlow();
    expect(component.onceSave).toEqual(true);
    expect(component.duplicatedWorkFlowName).toEqual(true);
    expect(result).toEqual(1);
  });
  it('should add workflow and get true data', () => {
    let spy: jasmine.Spy;
    workflowService = TestBed.get(WorkflowService);
    spy = spyOn(workflowService, 'addWorkflow').and.returnValue(of(expectTrueHttpResult));
    component.ifCreate = true;
    component.workflowName = 'test';
    const result = component.addWorkFlow();
    expect(component.showSuccess).toEqual(true);
    expect(component.onceSave).toEqual(false);
    expect(result).toEqual(1);
  });
  // updata
  it('should update workflow and get null data', () => {
    let spy: jasmine.Spy;
    workflowService = TestBed.get(WorkflowService);
    spy = spyOn(workflowService, 'updateWorkflow').and.returnValue(of(expectHttpResult));
    component.ifCreate = false;
    component.workflowName = 'test';
    component.workflow = {
      Id: ' ',
      Name: ' ',
      StepId: [' '],
      Type: ' ',
      Modifiedtime: ' '
    };
    const result = component.addWorkFlow();
    expect(result).toEqual(1);
  });
  it('should update workflow and get true data', () => {
    let spy: jasmine.Spy;
    workflowService = TestBed.get(WorkflowService);
    spy = spyOn(workflowService, 'updateWorkflow').and.returnValue(of(expectTrueHttpResult));
    component.ifCreate = false;
    component.workflowName = 'test';
    component.workflow = {
      Id: ' ',
      Name: ' ',
      StepId: [' '],
      Type: ' ',
      Modifiedtime: ' '
    };
    const result = component.addWorkFlow();
    expect(result).toEqual(1);
  });
  // steplist
  it('should get getSteplist with workflow', () => {
    let spy: jasmine.Spy;
    workflowService = TestBed.get(WorkflowService);
    spy = spyOn(workflowService, 'getstepsByworkflow').and.returnValue(of(expectTrueHttpResult));

    component.getSteplist();
    expect(component.resultBean).toEqual(expectTrueHttpResult);
  });
  it('should create init in create', () => {
    component.workflow.Id = undefined;
    component.isWorkflowCreate();
    expect(component.ifCreate).toEqual(true);
  });
  it('should create init in updata', () => {
    component.workflow = {
      Id: 'test ',
      Name: ' ',
      StepId: [' '],
      Type: ' ',
      Modifiedtime: ' '
    };
    component.isWorkflowCreate();
    expect(component.ifCreate).toEqual(false);
  });
  it('should getOneWorkFlow ', () => {
    const workflow: Workflow = {
      Name: 'test',
      Id: 'test',
      StepId: ['test'],
      Type: 'test',
      Modifiedtime: 'test'
    };
    let spy: jasmine.Spy;
    workflowService = TestBed.get(WorkflowService);
    spy = spyOn(workflowService, 'getOneWorkflow').and.returnValue(of(expectTrueHttpResult));
    const workback = component.getOneWorkFlow(workflow);
  });
  it('should deleteStep', () => {
    const workflow: Workflow = {
      Name: 'test',
      Id: 'test',
      StepId: ['test'],
      Type: 'test',
      Modifiedtime: 'test'
    };
    let spy: jasmine.Spy;
    stepService = TestBed.get(StepService);
    spy = spyOn(stepService, 'deleteStep').and.returnValue(of(expectTrueHttpResult));
    component.deleteStep('test');
  });
  // url
  it('should navigate expect url', () => {
    component.toWorkflowList();
    this.router = fixture.debugElement.injector.get(Router);
    const spy = this.router.navigateByUrl as jasmine.Spy;
    const args = spy.calls.first().args[0];
    expect(args).toBe('/app-workflow-list', 'should navigate to workflowlist');
  });
  it('should navigate to updatastep', () => {
    component.updataStep('test', 'test');
    this.router = fixture.debugElement.injector.get(Router);
    const spy = this.router.navigate as jasmine.Spy;
    const args = spy.calls.first().args[0];
    console.log('arg');
    console.log(args);
    expect(args).toEqual(['/app-steps-detail']);
  });
  it('should toStepDetail', () => {
    component.toStepDetail();
    this.router = fixture.debugElement.injector.get(Router);
    const spy = this.router.navigate as jasmine.Spy;
    const args = spy.calls.first().args[0];
    expect(args).toEqual(['/app-steps-detail']);
  });

});
class ExceptResultBean extends Observable<ResultBean> {
  StatusCode: String = '01';
  Data: any[] = [];
}
