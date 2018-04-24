import { TestBed, inject } from '@angular/core/testing';

import { WorkflowService } from './workflow.service';
import { HttpClientModule } from '@angular/common/http';
import { Workflow } from '../../model/workflow';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ResultBean } from '../../model/resultBean';
import { asyncData } from '../../../testing/async-observable-helpers';
import { expressionType } from '@angular/compiler/src/output/output_ast';
// test
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('WorkflowService', () => {
  let httpTestingController: HttpTestingController;
  let workflowService: WorkflowService;
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  const postWorkflow: Workflow = {
    Name: 'test',
    Id: 'test',
    StepId: ['test'],
    Type: 'test',
    Modifiedtime: 'test'
  };
  const expectWorkflow: ResultBean = {
    StatusCode: '01',
    Data: null
  };
  //  every http in this testbed will be proxy by HttpClientTestingModule
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkflowService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    workflowService = TestBed.get(WorkflowService);
  });
  it('should be created', inject([WorkflowService], (service: WorkflowService) => {
    expect(service).toBeTruthy();
  }));
  it('it should get workflows ', () => {
    workflowService.getWorkflows().subscribe(result => {
      expect(result).toEqual(expectWorkflow);
    });
    const req = httpTestingController.expectOne(workflowService.getWorkflowListUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(expectWorkflow);
    httpTestingController.verify();
  });
  it('it should delete workflow ', () => {
    workflowService.deleteWorkflow(postWorkflow).subscribe(result => {
      expect(result).toEqual(expectWorkflow);
    });
    const req = httpTestingController.expectOne(workflowService.deleteWorkflowUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(postWorkflow);
    req.flush(expectWorkflow);
    httpTestingController.verify();
  });
  it('it should add Workflow', () => {
    workflowService.addWorkflow(postWorkflow).subscribe(result => {
      expect(result).toEqual(expectWorkflow);
    });
    const req = httpTestingController.expectOne(workflowService.addWorkflowUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(expectWorkflow);
    httpTestingController.verify();
  });
  it('it should update Workflow', () => {
    workflowService.updateWorkflow(postWorkflow).subscribe(result => {
      expect(result).toEqual(expectWorkflow);
    });
    const req = httpTestingController.expectOne(workflowService.updateWorkflowUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(expectWorkflow);
    httpTestingController.verify();
  });
  it('it should save tempdata', () => {
    workflowService.setUpdate(postWorkflow);
    expect(workflowService.workflow).toEqual(postWorkflow);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

});
