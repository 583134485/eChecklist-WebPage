import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import { AppRoutingModule } from '../../../route/app.router';
import { ListInstanceComponent } from '../../../component/list-instance/list-instance.component';
import { AddInstanceComponent } from '../../../component/add-instance/add-instance.component';
import { LoginComponent } from '../../../component/login/login.component';
import { WorkflowListComponent } from '../../../component/workflow-list/workflow-list.component';
import { WorkflowStepsComponent } from '../../../component/workflow-steps/workflow-steps.component';
import { BackBtnComponent } from '../../../share/component/back-btn/back-btn.component';
import { SaveBtnComponent } from '../../../share/component/save-btn/save-btn.component';
import { StepsDetailComponent } from '../../../component/steps-detail/steps-detail.component';
import { InstanceDetailComponent } from '../../../component/instance-detail/instance-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TempalteNamePipe } from '../../../share/pipe/template-pipe/tempalte-name.pipe';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContentComponent,
        ListInstanceComponent,
        AddInstanceComponent,
        LoginComponent,
        TempalteNamePipe,
        WorkflowListComponent,
        WorkflowStepsComponent,
        SaveBtnComponent,
        BackBtnComponent,
        StepsDetailComponent,
        InstanceDetailComponent],
      imports: [AppRoutingModule, ReactiveFormsModule, HttpClientModule, FormsModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
