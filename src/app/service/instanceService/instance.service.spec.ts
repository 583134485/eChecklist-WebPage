import { TestBed, inject } from '@angular/core/testing';
import { asyncData, asyncError } from '../../../testing/async-observable-helpers';
import { InstanceService } from './instance.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Instance } from '../../model/instance';

let httpClientSpy: { get: jasmine.Spy };
let instanceService: InstanceService;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};
const instance: Instance = {
  name: 'test',
  type: 'test',
  template: 'test',
  id: 'test',
  stepid: 'test'
};
describe('TemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstanceService],
      imports: [HttpClientModule]
    });
  });
  it('should be created', inject([InstanceService], (service: InstanceService) => {
    expect(service).toBeTruthy();
  }));
});
describe('TemplateService (with spies)', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    instanceService = new InstanceService(<any>httpClientSpy);
  });
  it('should return expected instance (HttpClient called once)', () => {
    const expectedTemplates: ResultBean = {
      statusCode: '01',
      Data: null
    };
    httpClientSpy.get.and.returnValue(asyncData(expectedTemplates));
    instanceService.getInstances().subscribe(
      templates => expect(templates).toEqual(expectedTemplates, 'expected templates'),
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
describe('InstanceService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let expectedTemplate: ResultBean;
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [InstanceService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    instanceService = TestBed.get(InstanceService);
  });
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    instanceService = new InstanceService(<any>httpClientSpy);
  });
  beforeEach(() => {
    expectedTemplate = new ResultBean();
    instanceService = TestBed.get(InstanceService);

  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  /// HeroService method tests begin ///
  it('should return expected template (called once)', () => {
    instanceService.getInstances().subscribe(
      instanceResult => expect(instanceResult).toEqual(expectedTemplate, 'should return expected instance'),
      fail
    );

    // HeroService should have made one request to GET heroes from expected URL
    const req = httpTestingController.expectOne(instanceService.getInstanceListUrl);
    expect(req.request.method).toEqual('GET');
    // Respond with the mock heroes
    req.flush(expectedTemplate);
  });
  it('should update instance', () => {
    instanceService.getUpdate();
    instanceService.setUpdate(instance);
  });
});
export class ResultBean {
  statusCode: string;
  Data: any[];
}
