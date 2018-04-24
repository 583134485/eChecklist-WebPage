import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule, Component } from '@angular/core';

import { WorkflowListComponent } from './workflow-list.component';
import { LoginComponent } from '../login/login.component';
import { AddInstanceComponent } from '../add-instance/add-instance.component';
import { ListInstanceComponent } from '../list-instance/list-instance.component';
import { BackBtnComponent } from '../../share/component/back-btn/back-btn.component';
import { SaveBtnComponent } from '../../share/component/save-btn/save-btn.component';
import { WorkflowStepsComponent } from '../workflow-steps/workflow-steps.component';
import { StepsDetailComponent } from '../../component/steps-detail/steps-detail.component';
import { InstanceDetailComponent } from '../../component/instance-detail/instance-detail.component';
import { of } from 'rxjs/observable/of';
import { HttpClientModule } from '@angular/common/http';
// module
import { AppRoutingModule } from '../../route/app.router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// pipe
import { TempalteNamePipe } from '../../share/pipe/template-pipe/tempalte-name.pipe';
import { WorkflowService } from '../../service/workflowService/workflow.service';
import { StepService } from '../../service/stepService/step.service';
// route
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';

const expectHttpResult = {
  StatusCode: '02',
  Data: [],
};
describe('WorkflowListComponent', () => {
  let component: WorkflowListComponent;
  let fixture: ComponentFixture<WorkflowListComponent>;
  let workflowService: WorkflowService;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    TestBed.configureTestingModule({
      declarations: [
        WorkflowListComponent,
        AddInstanceComponent,
        ListInstanceComponent,
        LoginComponent,
        TempalteNamePipe,
        BackBtnComponent,
        SaveBtnComponent,
        WorkflowStepsComponent,
        StepsDetailComponent,
        InstanceDetailComponent],
      imports: [AppRoutingModule, ReactiveFormsModule, FormsModule, HttpClientModule, NoopAnimationsModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/app-workflow-list' },
        TempalteNamePipe, WorkflowService, StepService,
        { provide: Router, useValue: routerSpy }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate toAddWorkflowSteps', () => {
    component.toAddWorkflowSteps();
    this.router = fixture.debugElement.injector.get(Router);
    const spy = this.router.navigateByUrl as jasmine.Spy;
    const args = spy.calls.first().args[0];
    expect(args).toBe('/app-workflow-steps', 'should navigate to steps');
  });
  it('should navigate to updateWorkflow', () => {
    component.updateWorkflow('test', 'test');
    this.router = fixture.debugElement.injector.get(Router);
    const spy = this.router.navigate as jasmine.Spy;
    const args = spy.calls.first().args[0];
    expect(args).toEqual(['/app-workflow-steps']);
  });
  it('should getworkflowlist', () => {
    component.getworkflowlist();
  });
  it('should deleteWorkflow', () => {
    let spy: jasmine.Spy;
    workflowService = TestBed.get(WorkflowService);
    spy = spyOn(workflowService, 'deleteWorkflow').and.returnValue(of(expectHttpResult));
    component.deleteWorkflow('test', 'test');
  });
});

