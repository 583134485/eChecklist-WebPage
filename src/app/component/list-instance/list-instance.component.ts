import { Component, OnInit, Host, Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { InstanceService } from '../../service/instanceService/instance.service';
import { ResultBean } from '../../model/resultBean';
import { Instance } from '../../model/instance';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HostBinding } from '@angular/core';
import { tick } from '@angular/core/testing';
// import { UrlService } from '../../service/urlService/url.service';


@Component({
  selector: 'app-list-instance',
  templateUrl: './list-instance.component.html',
  styleUrls: ['./list-instance.component.css'],
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
export class ListInstanceComponent implements OnInit {
  public resultBean: ResultBean = {
    StatusCode: '',
    Data: []
  };
  instance = new Instance();
  resultArr: any[];
  triggerMap = new Map();
  private canDelete = false;

  @HostListener('document:click', ['$event']) resetTrigger() {
    for (const ins of this.resultBean.Data) {
      this.triggerMap.set(ins.Id, 'false');
    }
  }

  constructor(
    private router: Router,
    private instanceService: InstanceService,
  ) {
  }

  ngOnInit() {
    this.getInstancelist();
  }

  toAddInstance() {
    this.router.navigateByUrl('/app-add-instance');
  }
  getInstancelist() {
    this.instanceService.getInstances().subscribe((data: ResultBean) => {
      this.resultBean = data;
      this.resetTrigger();
    }, error => { console.log('dont know the diffrence of error in subscribe and pipe'); }
    );
  }
  deleteInstance(name: string, template: string, id: string) {
    this.instance.id = id;
    this.instance.name = name;
    this.instance.template = template;
    this.instanceService.deleteInstance(this.instance).subscribe((data: ResultBean) => {
      this.getInstancelist();
    });
  }

  triggerState(name, template, id, event) {
    event.stopPropagation();
    if (this.triggerMap.get(id) === 'false') {
      this.resetTrigger();
      this.triggerMap.set(id, 'true');
    } else {
      this.deleteInstance(name, template, id);
    }
  }
  updataInstance(id, name, type, template) {
    this.instanceService.setUpdate({
      name: name,
      type: type,
      template: template,
      id: id,
      stepid: ''
    });
    this.toAddInstance();
  }
}
