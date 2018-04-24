import { TestBed, inject } from '@angular/core/testing';
import { asyncData, asyncError } from '../../../testing/async-observable-helpers';
import { TemplateService } from './template.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

let httpClientSpy: { get: jasmine.Spy };
let templateService: TemplateService;

describe('TemplateService', () => {

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TemplateService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [TemplateService],
      imports: [HttpClientModule]
    });
  });
  it('should be created', inject([TemplateService], (service: TemplateService) => {
    expect(service).toBeTruthy();
  }));
});
describe('TemplateService (with spies)', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    templateService = new TemplateService(<any>httpClientSpy);
  });
  it('should return expected template (HttpClient called once)', () => {
    const expectedTemplates: ResultBean = {
      statusCode: '01',
      Data: []
    };
    httpClientSpy.get.and.returnValue(asyncData(expectedTemplates));
    templateService.getTemplates().subscribe(
      templates => expect(templates).toEqual(expectedTemplates, 'expected templates'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
describe('TemplateService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let expectedTemplate: ResultBean;
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [TemplateService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    templateService = TestBed.get(TemplateService);
  });
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    templateService = new TemplateService(<any>httpClientSpy);
  });
  beforeEach(() => {
    expectedTemplate = new ResultBean();
    templateService = TestBed.get(TemplateService);

  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  /// Service method tests begin ///
  it('should return expected template (called once)', () => {
    templateService.getTemplates().subscribe(
      template => expect(template).toEqual(expectedTemplate, 'should return expected template'),
      fail
    );

    // Service should have made one request to GET heroes from expected URL
    const req = httpTestingController.expectOne(templateService.getTemplateListUrl);
    expect(req.request.method).toEqual('GET');
    // Respond with the mock heroes
    req.flush(expectedTemplate);
  });
});
export class ResultBean {
  statusCode: string;
  Data: any[];
}
