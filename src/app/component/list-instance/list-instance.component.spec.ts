import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { ListInstanceComponent } from './list-instance.component';
import { AppRoutingModule } from '../../route/app.router';
import { AddInstanceComponent } from '../add-instance/add-instance.component';
import { LoginComponent } from '../login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TempalteNamePipe } from '../../share/pipe/template-pipe/tempalte-name.pipe';
import { InstanceService } from '../../service/instanceService/instance.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ResultBean } from '../../model/resultBean';
import { Router } from '@angular/router';
import { Instance } from '../../model/instance';
import { ActivatedRoute, ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { WorkflowListComponent } from '../workflow-list/workflow-list.component';
import { WorkflowStepsComponent } from '../workflow-steps/workflow-steps.component';
import { BackBtnComponent } from '../../share/component/back-btn/back-btn.component';
import { SaveBtnComponent } from '../../share/component/save-btn/save-btn.component';
import { StepsDetailComponent } from '../../component/steps-detail/steps-detail.component';
import { InstanceDetailComponent } from '../../component/instance-detail/instance-detail.component';


let component: ListInstanceComponent;
let fixture: ComponentFixture<ListInstanceComponent>;
describe('ListInstanceComponent', () => {
  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [
        ListInstanceComponent,
        AddInstanceComponent,
        LoginComponent,
        TempalteNamePipe,
        WorkflowListComponent,
        WorkflowStepsComponent,
        BackBtnComponent,
        SaveBtnComponent,
        StepsDetailComponent,
        InstanceDetailComponent],
      imports: [AppRoutingModule, ReactiveFormsModule, HttpClientModule, FormsModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/app-list-instance' },
        { provide: Router, useValue: routerSpy },
        InstanceService,
        TempalteNamePipe
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ListInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should tell ROUTER to navigate ', () => {
    component.toAddInstance();
    // args passed to router.navigateByUrl() spy
    this.router = fixture.debugElement.injector.get(Router);
    const spy = this.router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/app-add-instance',
      'should nav to HeroDetail for first hero');
  });
  it('should do updataInstance ', () => {
    component.updataInstance('test', 'testname', 'typr', 'template');
  });
  it('should do deleteInstance ', () => {
    component.deleteInstance('test', 'testname', 'typr');
  });

});




