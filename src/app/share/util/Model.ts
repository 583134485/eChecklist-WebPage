import { convertToParamMap } from '@angular/router';
export class Template {
    TemplateId: String;
    TemplateName: String; // user  edit
    TemplateType: String; // news or PE or IT
    Clazz: String = ''; // css style
    RowNum: number; //
    X: number;	// x position
    Y: number;	// y position
    CreatedUserId: String;
    ModifiedUserId: String;
    ActiveFlag: Boolean; // 能否被查询,alse dexice how to jiexi
    Key: String; // 表示是否是body还是head，title
    Type: number; // 表示是label还是field（可输入的）

    Value: any; // 内容，根据type decide use label or field     when label: Texts is a Map key is language value is content
    // field   : type example:input.text  input.button  select input.checkbox   datasource:String
    CreateTime: Number;
    ModifiedTime: Number;
    TemplateList: Array<Template>;
    constructor(rowNum: number) {
        this.RowNum = rowNum;
    }
    public toString(lan: string): string {// 0
        let con = '';

        if (this.Type === 1) {
            if (lan === 'cn') {
                con = '<label>' + this.Value.Texts.cn + '</label>';
            } else if (lan === 'en') {
                con = '<label>' + this.Value.Texts.en + '</label>';
            }
        } else if (this.Type === 2) {
            if (this.Value.Type === 'text') {
                con = '<input type="text" value="' + this.Value.DataSource + '"</input>';
            } else if (this.Value.Type === 'select') {
                con = '<select></select>';
            }
        }
        return '<td style="display:table-cell; vertical-align:middle"  rowSpan="' + this.RowNum + '" >' + con + '</td>';
    }
    public addToList(template: Template): Template {
        if (this.TemplateList === undefined) {
            this.TemplateList = new Array<Template>();
        }
        this.TemplateList.push(template);
        return this;

    }


}
export class TemplateUtil {
    public static toString(template: Template, lan: string): string {// 0
        let con = '';

        if (template.Type === 1) {
            con = '<label>' + TemplateUtil.getContent(template.Value.Texts, lan) + '</label>';
        } else if (template.Type === 2) {
            if (template.Value.Type === 'input.text') {
                let v = '';
                if (template.Value.DataSource !== null) {
                    v = template.Value.DataSource;
                }
                con = '<input type="text" value="' + v + '"</input>';
            } else if (template.Value.Type === 'select') {
                con = '<select></select>';
            }
        }
        return '<td   rowSpan="' + template.RowNum + '" class="' + template.Clazz + '" >' + con + '</td>';
    }
    public static getContent(Texts: Array<{ Language: String, Content: String }>, lan: String): String {
        if (Texts === undefined) {
            return '';
        }
        let x = '';
        Texts.forEach(t => {
            if (t.Language === lan) {
                x = t.Content.toString();
                return;
            }
        });
        return x;
    }
    public static getTable(template: Template, lan: string): String {
        TemplateUtil.setIndex2(template);

        const templateArray: Template[][] = TemplateUtil.get2DArray(template);
        let s: String = '<table style="margin:0px;" class="table table-striped">';
        const TemplatesWith: number = TemplateUtil.getWith(template);
        const TemplatesHeight: number = TemplateUtil.getHeight(template);
        for (let i = 0; i < TemplatesHeight; i++) {
            s += '<tr>';
            for (let j = 0; j < TemplatesWith; j++) {
                if (templateArray[i][j] != null) {
                    s += TemplateUtil.toString(templateArray[i][j], lan);
                }
            }
            s += '</tr>';
        }
        s += '</table>';
        return s;

    }

    public static setIndex2(template: Template) {
        console.log('遍历每个列');
        for (let i = 0; i < template.TemplateList.length; i++) {// 遍历每个列

            let n = 0;
            for (let j = 0; j < template.TemplateList[i].TemplateList.length; j++) {
                template.TemplateList[i].TemplateList[j].X = i;
                template.TemplateList[i].TemplateList[j].Y = n;
                n = n + template.TemplateList[i].TemplateList[j].RowNum;
            }

        }
    }
    public static getHeight(template: Template): number {

        let height = 0;
        template.TemplateList[0].TemplateList.forEach(t => {
            height += t.RowNum;
        });
        console.log('height ：' + height);
        return height;
    }
    public static getWith(template: Template): number {
        //  System.out.println('width '+topTemplate.TemplateList.size());
        return template.TemplateList.length;

    }
    public static get2DArray(template: Template): Template[][] {

        const h = TemplateUtil.getHeight(template);
        const w = TemplateUtil.getWith(template);
        console.log('h=' + h);
        console.log('w=' + w);

        const templateArray = new Array();         // 先声明一维
        for (let i = 0; i < h; i++) {          // 一维长度为h 为几行
            templateArray[i] = new Array();    // 再声明二维
            for (let j = 0; j < w; j++) {      // 二维长度为5 为几列
                templateArray[i][j] = undefined;
            }
        }


        for (let i = 0; i < template.TemplateList.length; i++) { // 遍历每列
            for (let j = 0; j < template.TemplateList[i].TemplateList.length; j++) { // 遍历每列的每行
                const t = template.TemplateList[i].TemplateList[j];
                templateArray[t.Y][t.X] = t;
            }

        }
        return templateArray;
    }

    public static print2D(templateArray: Template[][]) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                console.log(templateArray[i][j] + ' ');
            }
            console.log('\n');
        }
    }
    public static main(): String {


        const topTemplate: Template = new Template(0);
        const template1: Template = new Template(0);
        template1.Type = 1;

        template1.Value = {
            Texts: [{
                'Language': 'en',
                'Content': 'hello~'
            },
            {
                'Language': 'cn',
                'Content': '你好~'
            }]

        };
        template1.Type = 1;
        const template2: Template = new Template(0);
        template2.Value = template1.Value;
        template2.Type = 1;
        const template3: Template = new Template(0);
        template3.Value = template1.Value;
        template3.Type = 1;


        const template4 = new Template(3);
        template4.Value = template1.Value;
        template4.Type = 1;
        template4.Clazz = 'td-center';

        const template5 = new Template(1);
        template5.Value = template1.Value;
        template5.Type = 1;

        const template6 = new Template(1);
        template6.Value = template1.Value;
        template6.Type = 1;

        const template8 = new Template(1);
        template8.Value = template1.Value;
        template8.Type = 1;

        const template7 = new Template(3);
        template7.Value = {
            _t: 'Field',
            Type: 'text',
            DataSource: 'hello'
        };
        template7.Type = 2;
        template7.Clazz = 'td-center';


        template1.addToList(template4);
        template2.addToList(template5).addToList(template6).addToList(template8);
        template3.addToList(template7);
        topTemplate.addToList(template1);
        topTemplate.addToList(template2);
        topTemplate.addToList(JSON.parse(JSON.stringify(template2)));
        topTemplate.addToList(JSON.parse(JSON.stringify(template2)));
        topTemplate.addToList(template3);


        // const s: String = TemplateUtil.getTable(topTemplate, 'cn');
        const s: String = TemplateUtil.getTable(<Template>(JSON.parse(JSON.stringify(topTemplate))), 'cn');
        console.log(s);

        //  FileWriter fw=new FileWriter(new File('src/table.html'));
        //  fw.write(s);
        //  fw.flush();
        //  fw.close();
        console.log('-------JSON ----------');
        console.log(JSON.stringify(topTemplate));

        return s;

    }

}
