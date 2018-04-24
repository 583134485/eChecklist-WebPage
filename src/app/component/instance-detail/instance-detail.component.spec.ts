import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDetailComponent } from './instance-detail.component';
import { WorkflowListComponent } from '../workflow-list/workflow-list.component';
import { LoginComponent } from '../login/login.component';
import { AddInstanceComponent } from '../add-instance/add-instance.component';
import { ListInstanceComponent } from '../list-instance/list-instance.component';
import { BackBtnComponent } from '../../share/component/back-btn/back-btn.component';
import { SaveBtnComponent } from '../../share/component/save-btn/save-btn.component';
import { WorkflowStepsComponent } from '../workflow-steps/workflow-steps.component';
import { StepsDetailComponent } from '../../component/steps-detail/steps-detail.component';
// service
import { InstanceService  } from '../../service/instanceService/instance.service';
import { TemplateService  } from '../../service/templateService/template.service';
// module
import { AppRoutingModule } from '../../route/app.router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// pipe
import { TempalteNamePipe } from '../../share/pipe/template-pipe/tempalte-name.pipe';
// route
import { APP_BASE_HREF } from '@angular/common';

import { ResultBean } from '../../model/resultBean';
import { Observable } from 'rxjs/Observable';

import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { TemplateUtil } from '../../share/util/Model';



describe('InstanceDetailComponent', () => {
  let component: InstanceDetailComponent;
  let fixture: ComponentFixture<InstanceDetailComponent>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    TestBed.configureTestingModule({
      declarations: [
        InstanceDetailComponent,
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
          { provide: APP_BASE_HREF, useValue: '/app-workflow-steps' },
          TempalteNamePipe,
          InstanceService,
          TemplateService,
          {provide: Router, useValue: routerSpy},
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
    fixture = TestBed.createComponent(InstanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('the pull downlist should be created when keyup  ', () => {

       // fixture.nativeElement.querySelector('#mydiv').keyup();

  });
  it('should get the instances ', () => {
   const instanceService = TestBed.get(InstanceService);
//    const json = '{"StatusCode":"01","Data":[{"Id":"5ad842baa4cf390eacf0b707","Name":"2","Type":null,"Template":null,"stepid":null},{"Id":"5ad86ef2a4cf5b0eacafc5ed","Name":"21","Type":"Well","Template":"Model","stepid":null},{"Id":"5ad99104a4cf48154c205c87","Name":"aaaaa","Type":null,"Template":null,"stepid":"5ad941ffa4cf3c2b9c04091a"},{"Id":"5ad99171a4cf48154c205c8c","Name":"bbbbb","Type":null,"Template":null,"stepid":"5ad9d1e7a4cf3e3c0c32d7ea"},{"Id":"5ad87324a4cf5b0eacafc5ff","Name":"kk","Type":null,"Template":null,"stepid":"5ad9d1e7a4cf3e3c0c32d7ea"},{"Id":"5ad9ac11a4cf7f154ce46f8c","Name":"ttt","Type":null,"Template":null,"stepid":null}]}';
//    Rx.Observable.of(JSON.parse(json));
//     Rx

//    spy = spyOn(instanceService, 'getInstances').and.returnValue(rs);
   fixture.detectChanges();
   component.getInstances();
   expect(component.instances).toBeTruthy();


  });
  it('should get a table', () => {
    expect(TemplateUtil.main()).toBeTruthy();
    console.log(TemplateUtil.main());
  });
});

