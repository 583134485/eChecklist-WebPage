import { Component, OnInit, Host, Directive, HostListener } from '@angular/core';
import { HostBinding } from '@angular/core';
import { tick } from '@angular/core/testing';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

import { Workflow } from '../../model/workflow';
import { WorkflowService } from '../../service/workflowService/workflow.service';
import { ResultBean } from '../../model/resultBean';
import { Step } from '../../model/step';
import { StepService } from '../../service/stepService/step.service';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css'],
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
export class WorkflowListComponent implements OnInit {
  public resultBean: ResultBean = {
    StatusCode: '01',
    Data: [{ Id: '01', Name: 'test' },
    { Id: '02', Name: 'test1' }]
  };
  triggerMap = new Map();
  private canDelete = false;
  workflow = new Workflow();
  resultArr: any[];
  workflows: Workflow[];

  @HostListener('document:click', ['$event']) resetTrigger() {
    for (const ins of this.resultBean.Data) {
      this.triggerMap.set(ins.Id, 'false');
    }
  }
  constructor(
    private router: Router,
    private workflowService: WorkflowService, private stepService: StepService
  ) { }


  ngOnInit() {
    this.getworkflowlist();


  }

  // ready
  toAddWorkflowSteps() {
    this.router.navigateByUrl('/app-workflow-steps');
  }
  // ready
  updateWorkflow(id, name) {
    this.router.navigate(['/app-workflow-steps'], { queryParams: { 'workflowId': id, 'workflowName': name} });
  }
  // ready
  getworkflowlist() {
    this.workflowService.getWorkflows().subscribe((data: ResultBean) => {
      this.resultBean = data;
      // this.workflows = [{ id: '13', name: 'fk' }, { id: '129', name: 'fk' }, { id: '3', name: 'fk' }];
      this.resetTrigger();
    }, error => { console.log('dont know the diffrence of error in subscribe and pipe'); }
    );
  }
  // ready
  deleteWorkflow(name: string, id: string) {
    this.workflow.Id = id;
    this.workflow.Name = name;
    this.workflowService.deleteWorkflow(this.workflow).subscribe((data: ResultBean) => {
      this.getworkflowlist();
    });
  }
  triggerState(id, name, event) {
    event.stopPropagation();
    if (this.triggerMap.get(id) === 'false') {
      // console.log('ssssssssssssssssssssssss ');
      this.resetTrigger();
      this.triggerMap.set(id, 'true');
    } else {
      this.deleteWorkflow(name, id);
    }
  }

}

