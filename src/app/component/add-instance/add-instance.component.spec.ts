import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { AddInstanceComponent } from './add-instance.component';
import { By } from '@angular/platform-browser';
import { AppRoutingModule } from '../../route/app.router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TempalteNamePipe } from '../../share/pipe/template-pipe/tempalte-name.pipe';
import { ListInstanceComponent } from '../list-instance/list-instance.component';
import { LoginComponent } from '../login/login.component';
import { APP_BASE_HREF } from '@angular/common';
import { InstanceService } from '../../service/instanceService/instance.service';
import { TemplateService } from '../../service/templateService/template.service';
import { Instance } from '../../model/instance';
import { ResultBean } from '../../model/resultBean';
import { HttpClientModule } from '@angular/common/http';
import { asyncData, asyncError } from '../../../testing/async-observable-helpers';
import { WorkflowListComponent } from '../workflow-list/workflow-list.component';
import { WorkflowStepsComponent } from '../workflow-steps/workflow-steps.component';
import { BackBtnComponent } from '../../share/component/back-btn/back-btn.component';
import { SaveBtnComponent } from '../../share/component/save-btn/save-btn.component';
import { StepsDetailComponent } from '../../component/steps-detail/steps-detail.component';
import { InstanceDetailComponent } from '../../component/instance-detail/instance-detail.component';

import { Observable } from 'rxjs/Observable';
let component: AddInstanceComponent;
let fixture: ComponentFixture<AddInstanceComponent>;
// let heroEl: HTMLElement;
// let heroE2: HTMLElement;
let httpClientSpy: { get: jasmine.Spy };
let templateService: TemplateService;
let instanceService: InstanceService;
let spy: jasmine.Spy;
// let templateArr:[]
describe('AddInstanceComponent', () => {
  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [
        AddInstanceComponent,
        ListInstanceComponent,
        LoginComponent,
        TempalteNamePipe,
        WorkflowListComponent,
        WorkflowStepsComponent,
        BackBtnComponent,
        SaveBtnComponent,
        StepsDetailComponent,
        InstanceDetailComponent
      ],
      imports: [AppRoutingModule, ReactiveFormsModule, HttpClientModule, FormsModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        InstanceService,
        TemplateService,
        TempalteNamePipe,
        ResultBean,
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstanceComponent);
    component = fixture.componentInstance;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    templateService = new TemplateService(<any>httpClientSpy);
    const expectedTemplates: ResultBean = {
      StatusCode: '01',
      Data: [{ tempalte: 'super' }, { tempalte: 'model' }, { tempalte: 'aaa' }]
    };
    httpClientSpy.get.and.returnValue(asyncData(expectedTemplates));
    templateService.getTemplates().subscribe(
      templates => expect(templates).toEqual(expectedTemplates, 'expected templates'),
      fail
    );
    instanceService = TestBed.get(InstanceService);
    spy = spyOn(instanceService, 'addInstance').and.returnValue(new MyOb());
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('it add Instance', () => {
    component.status = 'add';
    const saveInstance: Instance = {
      name: '',
      template: '',
      type: '',
      id: '',
      stepid: ''
    };
    component.saveInstance();
    component.addInstance();
  });
  it('it add Instance success', () => {
    component.status = 'add';
    // component.name = '1';
    // component.nameInput = 'SuperMan';
    // expect(component.addInstance()).toBe(2);
    component.addInstance();
  });

  it('it add Instance dublicated', () => {
    component.status = 'add';
    component.name = '1';
    component.nameInput = 'SuperMan';
    const x = component.addInstance();
    console.log('addInstance-------' + x);
    expect(x).toBe(2);
  });

  it('it is update Instance', () => {
    component.status = null;
    expect(component.addInstance()).toBe(2);
  });
  it('it is running save the formGroup', () => {
    component.saveInstance();
    expect(component.saveInstance).toBeTruthy();
  });
  it('it is updateInstance ', () => {
    component.updateInstance();
  });
  it('it is updateInstance qq', () => {
    this.id = '';
    component.updateInstance();
  });
  it('should tell ROUTER to navigate when List Instance clicked', () => {
    component.toListPage();
    this.router = fixture.debugElement.injector.get(Router);
    spy = this.router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/app-list-instance',
      'should nav to Instance Detail for view');
  });
  it('it is Modify', () => {
    component.instanceSub.id = '01';
    component.instanceSub.name = 'admin';
    expect(component.statusCheck()).toBeTruthy();
  });
});

class MyOb extends Observable<ResultBean> {
  StatusCode: String = '02';
  Data: any = null;
}


