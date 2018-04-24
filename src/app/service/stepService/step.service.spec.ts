import { TestBed, inject } from '@angular/core/testing';
import { asyncData, asyncError } from '../../../testing/async-observable-helpers';
import { StepService } from './step.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ResultBean } from '../../model/resultBean';
import { Step } from '../../model/step';

describe('StepService', () => {
  let stepService: StepService;
  let httpTestController: HttpTestingController;
  const expectStep: ResultBean = {
    StatusCode: '01',
    Data: []
  };
  const postStep: Step = {
    Name: 'test',
    Id: 'test',
    Type: 'test',
    WorkflowID: 'test',
    InstanceId: ['test']
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [StepService]
    });
    stepService = TestBed.get(StepService);
    httpTestController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([StepService], (service: StepService) => {
    expect(service).toBeTruthy();
  }));
  it('it should getSteps', () => {
    stepService.getSteps().subscribe(result => {
      expect(result).toEqual(expectStep);
    });
    const req = httpTestController.expectOne(stepService.getStepListUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(expectStep);
    httpTestController.verify();
  });
  it('it should delete steps', () => {
    stepService.deleteStep(postStep).subscribe(result => {
      console.log('test delete step');
      console.log(result);
      expect(result).toEqual(expectStep);
    });
    const req = httpTestController.expectOne(stepService.deleteStepUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(postStep);
    req.flush(expectStep);
    httpTestController.verify();
  });
  it('it should updata steps', () => {
    stepService.updateStep(postStep).subscribe(result => {
      console.log('test update step');
      console.log(result);
      expect(result).toEqual(expectStep);
    });
    const req = httpTestController.expectOne(stepService.updateStepUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(postStep);
    req.flush(expectStep);
    httpTestController.verify();
  });
  it('it should add steps', () => {
    stepService.addStep(postStep).subscribe(result => {
      expect(result).toEqual(expectStep);
    });
    const req = httpTestController.expectOne(stepService.addStepUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(postStep);
    req.flush(expectStep);
    httpTestController.verify();
  });
  it('it should save tempdata', () => {
    stepService.setUpdate(postStep);
    expect(stepService.step).toEqual(postStep);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestController.verify();
  });
});
