import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MainViewComponent } from './view/main-view/main-view.component';
import { HeaderComponent } from './component/header/header.component';
import { ContentComponent } from './share/component/content/content.component';
import { AsideComponent } from './component/aside/aside.component';
import { FooterComponent } from './component/footer/footer.component';
import { AddInstanceComponent } from './component/add-instance/add-instance.component';
import { ListInstanceComponent } from './component/list-instance/list-instance.component';
import { TempalteNamePipe } from './share/pipe/template-pipe/tempalte-name.pipe';
import { LoginComponent } from './component/login/login.component';

import { WorkflowListComponent } from './component/workflow-list/workflow-list.component';
import { WorkflowStepsComponent } from './component/workflow-steps/workflow-steps.component';
import { StepsDetailComponent } from './component/steps-detail/steps-detail.component';
import { InstanceDetailComponent } from './component/instance-detail/instance-detail.component';
import { BackBtnComponent } from './share/component/back-btn/back-btn.component';
import { SaveBtnComponent } from './share/component/save-btn/save-btn.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './route/app.router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { InstanceService } from './service/instanceService/instance.service';
import { TemplateService } from './service/templateService/template.service';
import { WorkflowService } from './service/workflowService/workflow.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainViewComponent,
        HeaderComponent,
        ContentComponent,
        AsideComponent,
        FooterComponent,
        AddInstanceComponent,
        ListInstanceComponent,
        TempalteNamePipe,
        LoginComponent,
        WorkflowListComponent,
        WorkflowStepsComponent,
        StepsDetailComponent,
        InstanceDetailComponent,
        BackBtnComponent,
        SaveBtnComponent
      ],
      imports: [
        CommonModule,
        BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule
      ],
      providers: [
        InstanceService,
        TempalteNamePipe,
        TemplateService,
        WorkflowService
      ],
    }).compileComponents();
  }));
  // it('should create the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
});
