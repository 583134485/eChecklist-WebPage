import { StatusTransfer } from './../../share/util/StatusTransfer';
import { ResultBean } from './../../model/resultBean';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TempalteNamePipe } from '../../share/pipe/template-pipe/tempalte-name.pipe';
import { InstanceService } from '../../service/instanceService/instance.service';
import { Instance } from '../../model/instance';

import { TemplateService } from '../../service/templateService/template.service';
import { forbiddenNameValidator } from '../../share/validator/forbiddenTemName';
import { delay, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-add-instance',
  templateUrl: './add-instance.component.html',
  styleUrls: ['./add-instance.component.css']
})
export class AddInstanceComponent implements OnInit {
  // check value
  show: Boolean = false;
  errInstanceName: Boolean = true;
  onceSave: Boolean = true;

  status: String = 'Create';
  duplicatedInstanceName: Boolean = false;
  // form value
  nameInput: String = 'Select The Template';
  instanceSub: Instance = { name: '', type: '', id: '', template: '', stepid: '' };
  name: String = '';
  id: String = '';
  // receive value
  instanceGet: ResultBean;
  templateGet: ResultBean;
  instanceName: any;
  nameSet = [];
  temName: String;
  reg: RegExp = new RegExp('^[a-zA-Z0-9-_ ]+(\s*$)');



  failedMessage: string = StatusTransfer.getStatus('00');
  successMessage: string = StatusTransfer.getStatus('01');
  duplicateMessage: string = StatusTransfer.getStatus('02');
  instanceNameLengthMessage: string = StatusTransfer.getStatus('000');
  emptyInstanceNameMessage: string = StatusTransfer.getStatus('001');
  templateNameInvaildMessage: string = StatusTransfer.getStatus('002');
  unvalidInputMessage: string = StatusTransfer.getStatus('003');

  instanceForm: FormGroup = new FormGroup({
    name: new FormControl(this.name, [Validators.minLength(1), Validators.maxLength(100)]),
    id: new FormControl(this.id),
    template: new FormControl(this.nameInput, forbiddenNameValidator(/Select The Template/i)),
    template1: new FormControl('', []),
  });
  constructor(
    private router: Router,
    private temPipe: TempalteNamePipe,
    private instanceService: InstanceService,
    private templateService: TemplateService
  ) { }

  ngOnInit() {
    this.getTemplist();
    this.instanceSub = this.instanceService.getUpdate();
    this.statusCheck();
    this.instanceForm.patchValue({
      template: this.nameInput
    });
  }

  statusCheck() {
    if (this.instanceSub !== null) {
      this.nameInput = this.instanceSub.template;
      this.name = this.instanceSub.name;
      this.id = this.instanceSub.id;
      this.status = 'Modify';
    } else {
      this.status = 'Create';
      this.nameInput = 'Select The Template';
    }
  }

  getTemplist() {
    this.templateService.getTemplates().subscribe(
      (data: ResultBean) => {
        this.templateGet = data;
        this.getNameSet(data);
      }
    );
  }

  getNameSet(data: ResultBean) {
    for (const template of data.Data) {
      this.nameSet.push(template.Name);
    }
  }

  addInstance() {
    if (this.status === 'Create') {
      this.onceSave = false;
      this.saveInstance();
      const instanceTemp: Instance = {
        name: this.instanceName,
        type: '',
        template: this.nameInput,
        id: '',
        stepid: ''
      };
      return this.add(instanceTemp);
    } else {
      this.onceSave = false;
      return this.updata();
    }
  }
  add(instanceTemp): number {
    this.instanceService.addInstance(instanceTemp).subscribe(
      (data: ResultBean) => {
        this.instanceGet = data;
        if (this.instanceGet.StatusCode === '02') {
          this.duplicatedInstanceName = true;
          this.onceSave = true;
          setTimeout(() => { this.duplicatedInstanceName = false; }, 1000);
          return 2;
        } else {
          this.show = !this.show;
          this.onceSave = false;
          setTimeout(() => { this.toListPage(); }, 3000);
          return 1;
        }
      });
    return 1;
  }
  updata(): number {
    this.instanceService.updateInstance(this.updateInstance()).subscribe(
      (data: ResultBean) => {
        this.instanceGet = data;
        if (data.StatusCode === '02') {
          this.show = false;
          this.onceSave = true;
          this.duplicatedInstanceName = true;
          setTimeout(() => { this.duplicatedInstanceName = false; }, 2000);
          return 1;
        } else {
          this.show = !this.show;
          this.onceSave = false;
          setTimeout(() => { this.toListPage(); }, 3000);
          return 2;
        }
      }
    );
    return 2;
  }
  updateInstance() {
    const saveInstance: Instance = this.saveInstance();
    saveInstance.id = this.id;
    saveInstance.name = saveInstance.name === '' ? this.name : saveInstance.name;
    saveInstance.template = saveInstance.template === '' ? this.nameInput : saveInstance.template;
    return saveInstance;
  }
  saveInstance(): Instance {
    const formValue = this.instanceForm.value;
    return {
      name: formValue.name,
      template: formValue.template,
      type: '',
      id: formValue.id,
      stepid: ''
    };
  }

  toListPage() {
    this.instanceService.setUpdate(null);
    this.status = 'Create';
    this.router.navigateByUrl('/app-list-instance');
  }

  upTemp(event) {
    this.nameInput = event.target.innerText;
    if (this.status === 'Modify') {
      const formv = this.instanceForm.value;
      if (formv.name !== undefined) {
        this.name = formv.name;
      }
      this.instanceForm.patchValue({
        name: this.name,
        template: this.nameInput
      });
    } else {
      this.instanceForm.patchValue({
        template: this.nameInput
      });
    }
  }

  checkInstanceName(event) {
    if (event.keyCode === 16) {
      return;
    }
    if (this.reg.test(this.instanceName)) {

      if (this.instanceName === ' ') {
        this.instanceName = this.instanceName.slice(0, this.instanceName.length - 1);
      }
    } else {
      while (!this.reg.test(this.instanceName) && this.instanceName !== '') {
        this.instanceName = this.instanceName.slice(0, this.instanceName.length - 1);
      }
      if (this.instanceName === '') {
        this.errInstanceName = true; // hide
      } else {
        this.errInstanceName = false; // show
      }
    }
  }
}
