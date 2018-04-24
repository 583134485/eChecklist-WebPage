import { Component, OnInit, Host, Directive, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';
import { ResultBean } from '../../model/resultBean';
import { StatusTransfer } from './../../share/util/StatusTransfer';
import { CheckName } from '../../share/validator/checkName';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StepService } from '../../service/stepService/step.service';
import { Instance } from '../../model/instance';
import { InstanceService } from '../../service/instanceService/instance.service';
import { Step } from '../../model/step';
import { Workflow } from '../../model/workflow';
import { WorkflowService } from '../../service/workflowService/workflow.service';

@Component({
  selector: 'app-steps-detail',
  templateUrl: './steps-detail.component.html',
  styleUrls: ['./steps-detail.component.css'],
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
export class StepsDetailComponent implements OnInit {
  failedMessage: string = StatusTransfer.getStatus('00');
  successMessage: string = StatusTransfer.getStatus('01');
  duplicateMessage: string = StatusTransfer.getStatus('02');
  instanceNameLengthMessage: string = StatusTransfer.getStatus('000');
  emptyInstanceNameMessage: string = StatusTransfer.getStatus('001');
  unvalidInputMessage: string = StatusTransfer.getStatus('003');

  reg: RegExp = new RegExp('^[a-zA-Z0-9-_ ]+(\s*$)');
  stepName: String = '';
  step: Step = new Step();
  ifstepNameVaild: Boolean = true;
  ifSaveSuccess: Boolean = false;
  ifempty: Boolean = false;
  ifFirstTimeInto = true;
  ifWorkflowId = false;
  onceSave = true;
  duplicatedWorkFlowName: Boolean = false;
  check: CheckName = new CheckName();
  instance: Instance = new Instance();
  workflow: Workflow = new Workflow();
  triggerMap = new Map();
  stepGet = new ResultBean();
  stepAccept: Step = new Step();
  stepId: String = '';
  public resultBean: ResultBean = {
    StatusCode: '01',
    Data: []
  };
  @HostListener('document:click', ['$event']) resetTrigger() {
    for (const ins of this.resultBean.Data) {
      this.triggerMap.set(ins.Id, 'false');
    }
  }

  constructor(private router: Router,
    private instanceService: InstanceService, private activeRouter: ActivatedRoute,
    private stepService: StepService, private workflowService: WorkflowService) { }

  ngOnInit() {
    // this.workflow = this.workflowService.getUpdate();
    // this.stepAccept = this.stepService.getUpdate();
    this.activeRouter.queryParams.subscribe(params => {
      this.stepAccept.Id = params['stepId'];
      this.stepAccept.Name = params['stepName'];
      this.workflow.Id = params['workflowId'];
      this.stepAccept.WorkflowID = params['workflowId'];
      this.workflow.Name = params['workflowName'];
    });
    this.stepId = this.stepAccept.Id;
    this.stepName = this.stepAccept.Name;
    if (this.stepAccept.Id === undefined) {
      this.ifWorkflowId = false;
    } else {
      this.ifWorkflowId = true;
    }
    this.getStepDetail();

  }

  triggerState(id, event) {
    event.stopPropagation();
    if (this.triggerMap.get(id) === 'false') {
      this.resetTrigger();
      this.triggerMap.set(id, 'true');
    } else {
      this.deleteInstance(id);
      this.triggerMap.set(id, 'flase');
    }
  }
  deleteInstance(id: string) {
    this.instance.id = id;
    this.instance.stepid = this.stepAccept.Id;
    this.instanceService.deleteInstance(this.instance).subscribe((data: ResultBean) => {
      this.getStepDetail();
    });
  }
  getStepDetail() {
    this.stepService.getStepDetail(this.stepAccept).subscribe((data: ResultBean) => {
      this.resultBean = data;
      this.resetTrigger();
    }, error => { console.log('dont know the diffrence of error in subscribe and pipe'); }
    );
  }
  addStepOrUpdate() {
    if (this.ifWorkflowId === false) {
      this.ifFirstTimeInto = false;
      const step: Step = {
        Name: this.stepName.toString(),
        Id: '',
        Type: '',
        WorkflowID: this.workflow.Id,
        InstanceId: []
      };
      return this.add(step);
    } else {
      console.log('update');
      this.updata();

    }
  }
  // no exclusive test for this method
  add(step: Step): number {
    this.stepService.addStep(step).subscribe(
      (data: ResultBean) => {
        this.stepGet = data;
        if (this.stepGet.StatusCode === '02') {
          this.duplicatedWorkFlowName = true;
          this.onceSave = true;
          setTimeout(() => { this.duplicatedWorkFlowName = false; }, 2000);
          return 2;
        } else {
          console.log('refresh');
          this.onceSave = false;
          this.stepId = data.Data[0].Id;
          this.ifWorkflowId = true;
          this.ifSaveSuccess = !this.ifSaveSuccess;
          setTimeout(() => {
            this.ifSaveSuccess = !this.ifSaveSuccess;
          }, 2000);
          this.getStepDetail();
          return 1;
        }
      });
    return 1;
  }
  // no exclusive test for this method
  updata(): number {
    this.stepAccept.Name = this.stepName;
    this.stepService.updateStep(this.stepAccept).subscribe(
      (data: ResultBean) => {
        this.stepGet = data;
        if (data.StatusCode === '02') {
          this.ifSaveSuccess = false;
          this.onceSave = true;
          this.duplicatedWorkFlowName = true;
          setTimeout(() => { this.duplicatedWorkFlowName = false; }, 2000);
          return 1;
        } else {
          this.ifSaveSuccess = !this.ifSaveSuccess;
          this.onceSave = false;
          this.ifSaveSuccess = true;
          setTimeout(() => {
            this.ifSaveSuccess = false;
          }, 3000);
          return 2;
        }
      }
    );
    return 2;
  }
  toBack() {
    this.router.navigate(['/app-workflow-steps'], { queryParams: { 'workflowId': this.workflow.Id, 'workflowName': this.workflow.Name } });
  }

  checkInstanceName(event) {
    if (event.keyCode === 16) {
      return;
    }
    this.ifstepNameVaild = this.check.checkInputName(this.reg, this.stepName).flag;
    this.stepName = this.check.checkInputName(this.reg, this.stepName).inputName;
    this.ifFirstTimeInto = false;
    if (this.stepName === '') {
      this.ifempty = true;
    } else {
      this.ifempty = false;
    }
  }
  addInstanceDetail() {
    this.router.navigate(['/app-instance-detail'], {
      queryParams: {
        'stepId': this.stepId,
        'workflowId': this.workflow.Id, 'stepName': this.stepAccept.Name,
        'workflowName': this.workflow.Name
      }
    });
  }
  toUpdateInstance(id) {
    this.router.navigate(['/app-instance-detail'], {
      queryParams: {
        'stepId': this.stepId, 'instanceId': id,
        'workflowId': this.workflow.Id, 'stepName': this.stepAccept.Name,
        'workflowName': this.workflow.Name
      }
    });
  }
}
