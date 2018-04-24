
import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StatusTransfer } from './../../share/util/StatusTransfer';
import { CheckName } from '../../share/validator/checkName';
import { ResultBean } from '../../model/resultBean';
import { Step } from '../../model/step';
import { StepService } from '../../service/stepService/step.service';
import { Workflow } from '../../model/workflow';
import { WorkflowService } from '../../service/workflowService/workflow.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-workflow-steps',
  templateUrl: './workflow-steps.component.html',
  styleUrls: ['./workflow-steps.component.css'],
  animations: [
    trigger('canDelete', [
      state('false', style({
        transform: 'scale(1)'
      })),
      state('true', style({
        backgroundColor: '#EE2C2C',
        transform: 'scale(1.2)',
        color: '#fff',
      })),
      transition('false => true', animate('250ms ease-in')),
      transition('true => false', animate('250ms ease-out'))
    ])
  ]
})
export class WorkflowStepsComponent implements OnInit {
  // form value
  workflowName: String = '';
  workflow: Workflow = {
    Id: ' ',
    Name: ' ',
    StepId: [' '],
    Type: ' ',
    Modifiedtime: ' '
  };
  step = new Step();
  check: CheckName = new CheckName();
  triggerMap = new Map();
  workflowGet = new ResultBean();
  workflowsendtodetail = new Workflow();
  workflowId: String = '';
  public resultBean: ResultBean = {
    StatusCode: '01',
    Data: []
  };
  resultArr: any[] = [];
  // check
  ifworkflowNameVaild: Boolean = true;
  ifempty: Boolean = false;
  onceSave: Boolean = true;
  ifFirstTimeInto = true;
  ifSaveSuccess = false;
  ifCreate: Boolean = false;
  ifCreateWorkFlowFirst: Boolean = false;
  duplicatedWorkFlowName: Boolean = false;
  showSuccess: Boolean = false;
  private canDelete = false;
  del: Boolean = false;
  ifWorkflowId: Boolean = false;


  reg: RegExp = new RegExp('^[a-zA-Z0-9-_ ]+(\s*$)');
  failedMessage: string = StatusTransfer.getStatus('00');
  successMessage: string = StatusTransfer.getStatus('01');
  duplicateMessage: string = StatusTransfer.getStatus('02');
  workflowNameLengthMessage: string = StatusTransfer.getStatus('000');
  emptyworkflowNameMessage: string = StatusTransfer.getStatus('001');
  unvalidInputMessage: string = StatusTransfer.getStatus('003');

  @HostListener('document:click', ['$event']) resetTrigger() {
    for (const ins of this.resultBean.Data) {
      this.triggerMap.set(ins.Id, 'false');
    }
  }
  constructor(
    private router: Router,
    private stepService: StepService,
    private workflowService: WorkflowService,
    private activeRouter: ActivatedRoute
  ) { }
  ngOnInit() {
    // this.workflow = this.workflowService.getUpdate();
    this.activeRouter.queryParams.subscribe(params => {
      this.workflow.Id = params['workflowId'];
      this.workflow.Name = params['workflowName'];
    });
    this.isWorkflowCreate();
    this.getSteplist();
    this.workflowId = this.workflow.Id;
    this.workflowName = this.workflow.Name;
  }
  // ready
  isWorkflowCreate() {
    if (this.workflow.Id === undefined) {
      this.ifCreate = true;
      this.ifWorkflowId = false;
    } else {
      this.ifWorkflowId = true;
      this.onceSave = false;
      this.ifCreate = false;
      this.ifFirstTimeInto = false;
      this.ifempty = false;
      this.workflowName = this.workflow.Name;
    }
  }
  // ready
  toStepDetail() {//  :TODO

    this.router.navigate(['/app-steps-detail'], { queryParams: { 'workflowId': this.workflow.Id, 'workflowName': this.workflow.Name } });
  }

  // ready
  toWorkflowList() {
    this.workflowName = '';
    this.workflowNameLengthMessage = null;
    this.workflow = null;
    this.workflowService.setUpdate(null);
    this.router.navigateByUrl('/app-workflow-list');
  }
  // ready
  getSteplist() {
    const selectworkflow: Workflow = {
      Id: this.workflow.Id,
      Name: this.workflow.Name,
      StepId: this.workflow.StepId,
      Type: this.workflow.Type,
      Modifiedtime: this.workflow.Modifiedtime
    };
    this.workflowService.getstepsByworkflow(selectworkflow).subscribe((data: ResultBean) => {
      this.resultBean = data;
      this.resetTrigger();
    }, error => { console.log('dont know the diffrence of error in subscribe and pipe'); }
    );
  }
  deleteStep(id: string) {
    this.step.Id = id;
    this.stepService.deleteStep(this.step).subscribe((data: ResultBean) => {
      this.getSteplist();
    });
  }

  triggerState(name, id, event) {
    event.stopPropagation();
    if (this.triggerMap.get(id) === 'false') {
      this.resetTrigger();
      this.triggerMap.set(id, 'true');
    } else {
      this.deleteStep(id);
    }
  }

  checkWorkFlowName(event) {
    if (!this.onceSave) {
      this.onceSave = true;
    }
    if (event.keyCode === 16) {
      return;
    }
    this.ifworkflowNameVaild = this.check.checkInputName(this.reg, this.workflowName).flag;
    this.workflowName = this.check.checkInputName(this.reg, this.workflowName).inputName;
    this.ifFirstTimeInto = false;
    if (this.workflowName === '') {
      this.ifempty = true;
    } else {
      this.ifempty = false;
    }
  }
  // ready
  updataStep(id, name) {
    this.router.navigate(['/app-steps-detail'], {
      queryParams: {
        'workflowId': this.workflow.Id, 'stepName': name, 'stepId': id,
        'workflowName': this.workflow.Name
      }
    });
  }
  // ready
  addWorkFlow() {
    if (this.ifCreate) {
      this.onceSave = false;
      const workFlowTemp: Workflow = {
        Name: this.workflowName,
        Type: '',
        Id: '',
        Modifiedtime: '',
        StepId: []
      };
      return this.add(workFlowTemp);
    } else {
      this.onceSave = false;
      return this.updata();
    }
  }
  // ready
  add(workFlowTemp): number {
    this.workflowService.addWorkflow(workFlowTemp).subscribe(
      (data: ResultBean) => {
        this.workflowGet = data;
        if (this.workflowGet.StatusCode === '02') {
          this.duplicatedWorkFlowName = true;
          this.onceSave = true;
          setTimeout(() => { this.duplicatedWorkFlowName = false; }, 2000);
          return 2;
        } else {
          this.showSuccess = !this.showSuccess;
          this.onceSave = false;
          this.ifWorkflowId = true;
          const workflowBack: Workflow = {
            Id: data.Data[0].Id,
            StepId: data.Data[0].StepId,
            Name: data.Data[0].Name,
            Type: data.Data[0].Type,
            Modifiedtime: data.Data[0].Modifiedtime
          };
          this.workflow = workflowBack;
          this.getSteplist();
          this.showSuccess = true;
          this.ifCreate = false;
          setTimeout(() => { this.showSuccess = false; }, 2000);
          return 1;
        }
      });
    return 1;
  }
  // ready
  getOneWorkFlow(workflow: Workflow) {
    return this.workflowService.getOneWorkflow(workflow).subscribe(
      (data: ResultBean) => {
        const workflowBack: Workflow = {
          Id: data.Data[0].Id,
          StepId: data.Data[0].StepId,
          Name: this.workflowName,
          Type: data.Data[0].Type,
          Modifiedtime: data.Data[0].Modifiedtime
        };
        return workflowBack;
      });
  }
  updateWorkFlow() {
    if (this.workflowName !== '') {
      this.onceSave = false;
      const updateworkflow = this.getOneWorkFlow(this.workflow);
      return this.add(updateworkflow);
    } else {
      this.onceSave = false;
      return this.updata();
    }
  }

  // ready
  updata(): number {
    this.workflow.Name = this.workflowName;
    this.workflowService.updateWorkflow(this.workflow).subscribe(
      (data: ResultBean) => {
        this.workflowGet = data;
        if (data.StatusCode === '02') {
          this.showSuccess = false;
          this.onceSave = true;
          this.duplicatedWorkFlowName = true;
          setTimeout(() => { this.duplicatedWorkFlowName = false; }, 2000);
          return 2;
        } else {
          this.showSuccess = !this.showSuccess;
          this.onceSave = false;
          const workflowBack: Workflow = {
            Id: data.Data[0].Id,
            StepId: data.Data[0].StepId,
            Name: data.Data[0].Name,
            Type: data.Data[0].Type,
            Modifiedtime: data.Data[0].Modifiedtime
          };
          this.workflowsendtodetail = workflowBack;
          this.getSteplist();
          this.showSuccess = true;
          this.ifCreate = false;
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
          return 1;
        }
      }
    );
    return 1;
  }
}
