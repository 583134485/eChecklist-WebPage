import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './route/app.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainViewComponent } from './view/main-view/main-view.component';
import { HeaderComponent } from './component/header/header.component';
import { ContentComponent } from './share/component/content/content.component';
import { AsideComponent } from './component/aside/aside.component';
import { FooterComponent } from './component/footer/footer.component';
import { AddInstanceComponent } from './component/add-instance/add-instance.component';
import { ListInstanceComponent } from './component/list-instance/list-instance.component';
import { TempalteNamePipe } from './share/pipe/template-pipe/tempalte-name.pipe';

import { InstanceService } from './service/instanceService/instance.service';
import { TemplateService } from './service/templateService/template.service';
import { LoginComponent } from './component/login/login.component';
import { WorkflowService } from './service/workflowService/workflow.service';

import { WorkflowListComponent } from './component/workflow-list/workflow-list.component';
import { WorkflowStepsComponent } from './component/workflow-steps/workflow-steps.component';
import { StepsDetailComponent } from './component/steps-detail/steps-detail.component';
import { InstanceDetailComponent } from './component/instance-detail/instance-detail.component';
import { BackBtnComponent } from './share/component/back-btn/back-btn.component';
import { SaveBtnComponent } from './share/component/save-btn/save-btn.component';
import { StepService } from './service/stepService/step.service';

@NgModule({
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
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    InstanceService,
    TempalteNamePipe,
    TemplateService,
    StepService,
    WorkflowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
