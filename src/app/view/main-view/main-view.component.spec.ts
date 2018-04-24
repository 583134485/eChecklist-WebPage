import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewComponent } from './main-view.component';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { AsideComponent } from '../../component/aside/aside.component';
import { ContentComponent } from '../../share/component/content/content.component';
import { ListInstanceComponent } from '../../component/list-instance/list-instance.component';
import { AddInstanceComponent } from '../../component/add-instance/add-instance.component';
import { LoginComponent } from '../../component/login/login.component';
import { WorkflowListComponent } from '../../component/workflow-list/workflow-list.component';
import { WorkflowStepsComponent } from '../../component/workflow-steps/workflow-steps.component';
import { BackBtnComponent } from '../../share/component/back-btn/back-btn.component';
import { SaveBtnComponent } from '../../share/component/save-btn/save-btn.component';
import { StepsDetailComponent } from '../../component/steps-detail/steps-detail.component';
import { InstanceDetailComponent } from '../../component/instance-detail/instance-detail.component';

import { AppRoutingModule } from '../../route/app.router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TempalteNamePipe } from '../../share/pipe/template-pipe/tempalte-name.pipe';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
describe('MainViewComponent', () => {
  let component: MainViewComponent;
  let fixture: ComponentFixture<MainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainViewComponent,
        HeaderComponent,
        FooterComponent,
        AsideComponent,
        ContentComponent,
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
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
