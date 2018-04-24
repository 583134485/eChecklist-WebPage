import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainViewComponent } from '../view/main-view/main-view.component';
import { ListInstanceComponent } from '../component/list-instance/list-instance.component';
import { AddInstanceComponent } from '../component/add-instance/add-instance.component';
import { LoginComponent } from '../component/login/login.component';
import { WorkflowListComponent } from '../component/workflow-list/workflow-list.component';
import { InstanceDetailComponent } from '../component/instance-detail/instance-detail.component';
import { WorkflowStepsComponent } from '../component/workflow-steps/workflow-steps.component';
import { StepsDetailComponent } from '../component/steps-detail/steps-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/app-login', pathMatch: 'full' },
    { path: 'app-add-instance', component: AddInstanceComponent },
    { path: 'app-list-instance', component: ListInstanceComponent },
    { path: 'app-login', component: LoginComponent },
    { path: 'app-workflow-list', component: WorkflowListComponent },
    { path: 'app-workflow-steps', component: WorkflowStepsComponent },
    { path: 'app-steps-detail', component: StepsDetailComponent },
    { path: 'app-instance-detail', component: InstanceDetailComponent },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
