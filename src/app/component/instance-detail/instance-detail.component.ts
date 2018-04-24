import { TemplateService } from './../../service/templateService/template.service';
import { Template } from './../../share/util/Model';
import { InstanceService } from './../../service/instanceService/instance.service';
import { ResultBean } from './../../model/resultBean';
import { Component, OnInit } from '@angular/core';
import { TempalteNamePipe } from '../../share/pipe/template-pipe/tempalte-name.pipe';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../../share/validator/forbiddenTemName';
import { HttpParams } from '@angular/common/http';
import { Instance } from '../../model/instance';
// import { Instance } from '../../model/instance';
import { TemplateUtil } from '../../share/util/Model';
import { StatusTransfer } from './../../share/util/StatusTransfer';
import { ActivatedRoute, Router } from '@angular/router';
import { animation1, animation2 } from '../../share/animation/basic.animation';


@Component({
    selector: 'app-instance-detail',
    templateUrl: './instance-detail.component.html',
    styleUrls: ['./instance-detail.component.css'],
    animations: [animation1, animation2],
})
export class InstanceDetailComponent implements OnInit {
    instanceName2: String = 'Select One Instance';
    instanceName: String;
    instanceNames: String[] = [];
    instances: any[] = [];
    selectedInstance: any;
    showList: Boolean = false;
    // instanceName: String;
    oldInstanceId: String;
    stepId: String;
    stepName: String;
    instanceId: String; // when create is null
    workflowId: String;
    workflowName: String;

    showSaveSuccessFlag: Boolean = false;
    showSaveFailedFlag: Boolean = false;
    showDuplicateFlag: Boolean = false;

    tipClass: String;
    showTipFlag: Boolean = false;
    tipMessage: String;
    language: String = 'English';

    failedMessage: string = StatusTransfer.getStatus('00');
    successMessage: string = StatusTransfer.getStatus('01');
    duplicateMessage: string = StatusTransfer.getStatus('02');
    instanceNameLengthMessage: string = StatusTransfer.getStatus('000');
    emptyInstanceNameMessage: string = StatusTransfer.getStatus('001');
    instanceNameInvaildMessage: string = StatusTransfer.getStatus('002');
    unvalidInputMessage: string = StatusTransfer.getStatus('003');





    constructor(private instanceService: InstanceService,
        private activeRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        // const ps = this.activeRoute.snapshot.params['stepId'];
        // alert(ps);
        this.activeRoute.queryParams.subscribe(params => {
            this.stepId = params['stepId'];
            this.oldInstanceId = params['instanceId'];
            this.instanceId = params['instanceId'];
            this.workflowId = params['workflowId'];
            this.stepName = params['stepName'];
            this.workflowName = params['workflowName'];
            //  alert('stepId: ' + this.stepId + '\n' + 'instanceId: ' + this.instanceId + '\nworkflowId: ' + this.workflowId);
        });
        // this.instanceNames = ['kim', 'law', 'fk', 'hel', 'dav', 'kim', 'law', 'fk', 'hel', 'dav'];
        this.getInstances2();
        // alert(this.instances);
        // this.instanceName = '';
        // this.templateService.getTemplates =


    }
    selectTemplate(event) {
        this.instanceName = event.target.innerText;
        this.instanceName2 = this.instanceName;
        //  alert(event);

        // alert(this.instanceName)
        this.showList = false;
        console.log(this.instanceName);
        this.showTable(this.instanceName, this.language.toString());
    }
    showTable(instanceName: String, lan: string) {
        const table = document.getElementById('mainTable');
        // -------------------------- fake data   -------------------- -----
        // const s: String = TemplateUtil.main();
        console.log(this.instances);
        this.instances.forEach((instance) => {
            console.log(instance.Name + '===' + instanceName);
            if (instance.Name === instanceName) {
                this.selectedInstance = instance;
                console.log(this.selectedInstance);
            }
        });
        console.log(this.selectedInstance + '-------------');


        let tempLan = '';
        if (lan === 'English') {
            tempLan = 'en';
        } else {
            tempLan = 'cn';
        }
        const s: String = TemplateUtil.getTable(this.selectedInstance.templateList[0], tempLan);

        table.innerHTML = s.toString();
    }
    getInstances() {
        this.instanceNames = [];
        this.instanceService.getInstances().subscribe((data: ResultBean) => {
            // this.instances = data.Data;
            console.log('-----------instances data ------');
            console.log(JSON.stringify(data));

            data.Data.forEach((instance) => {
                this.instanceNames.push(instance.Name);
                if (this.instanceId === instance.Id) {
                    this.selectedInstance = instance;
                    this.instanceName = instance.Name;
                    this.showTable(this.instanceName, this.language.toString());
                }
                // this.instanceNames.push(instance.instanceName);
            });


        });


    }
    // 暂时的方法，将来会被上面的getInstances替换
    getInstances2() {
        this.instanceNames = [];
        this.instanceService.getInstances().subscribe((data: ResultBean) => {
            // this.instances = data.Data;
            console.log('-----------instances data ------');
            console.log(JSON.stringify(data));

            data.Data.forEach((instance) => {
                this.instanceNames.push(instance.Name);
                if (this.instanceId === instance.Id) {
                    this.selectedInstance = instance;
                    this.instanceName = instance.Name;
                    // this.showTable(this.instanceName, this.language.toString());
                }
                // this.instanceNames.push(instance.instanceName);
            });
            this.instanceService.getDefaultInstance().subscribe((data2: ResultBean) => {
                console.log('---------------data2--------------------------');
                console.log(data2.Data);
                this.selectedInstance = { templateList: [data2.Data[0]] };
                if (this.oldInstanceId !== undefined) {
                    this.showTable(this.instanceName, this.language.toString());
                }


            });


        });


    }

    changeLanguage() {
        if (this.language === 'English') {
            this.language = 'Chinese';
        } else {
            this.language = 'English';
        }
        this.showTable(this.selectedInstance.name, this.language.toString());
    }

    addInstanceToStep() {
        // 发送时不区分大小写，接受时区分大小写，就stepid是小写的其他字段都大写
        console.log('-----------------start addtoStep---------------');
        if (this.oldInstanceId !== undefined) {
            console.log('-----------------start deleteinstance---------------');
            const ins2 = new Instance();
            ins2.stepid = this.stepId;
            ins2.id = this.oldInstanceId;
            this.instanceService.deleteInstance(ins2).subscribe((data: ResultBean) => {
                console.log(data.StatusCode);
            });
        }
        this.selectedInstance.stepid = this.stepId;
        const ins = new Instance();
        ins.id = this.selectedInstance.Id;
        ins.name = this.instanceName2;
        ins.stepid = this.stepId;
        console.log('-----------------ins' + JSON.stringify(ins) + '---------------');
        console.log('-----------------start addinstance---------------');
        this.instanceService.addInstanceToStep(ins).subscribe((data: ResultBean) => {
            console.log('-----------------return instance---------------');
            console.log('-----------------return instance' + data.StatusCode + '---------------');
            if (data.StatusCode === '01') {
                console.log('-----------------return instance' + data.StatusCode + '---------------');
                this.tipMessage = this.successMessage;
                this.tipClass = 'successColor';
                this.showTipFlag = true;
                setTimeout(() => {
                    // this.tipMessage = '';
                    this.showTipFlag = false;
                }, 2000);
                // this.router.navigate(['/exampledetail'],{queryParams:{'name':'yxman'}});
            } else if (data.StatusCode === '00') {
                this.tipMessage = this.failedMessage;
                this.tipClass = 'errorColor';
                this.showTipFlag = true;
                setTimeout(() => {
                    // this.tipMessage = '';
                    this.showTipFlag = false;
                }, 2000);
            } else if (data.StatusCode === '02') {
                this.tipMessage = this.duplicateMessage;
                this.tipClass = 'errorColor';
                this.showTipFlag = true;
                setTimeout(() => {
                    // this.tipMessage = '';
                    this.showTipFlag = false;
                }, 2000);
            }
            // this.router.navigate(['/exampledetail'],{queryParams:{'name':'yxman'}});
        });

    }
    historyBack() {
        this.router.navigate(['/app-steps-detail'], {
            queryParams: {
                'stepId': this.stepId,
                'workflowId': this.workflowId,
                'stepName': this.stepName,
                'workflowName': this.workflowName
            }
        });
    }
    testJSON() {
        console.log(TemplateUtil.main());
        // document.getElementById('mainTable').innerHTML = TemplateUtil.main().toString();
    }


}

