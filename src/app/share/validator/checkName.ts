export class CheckName {
    errInstanceName: boolean;
    public checkInputName(reg: RegExp, inputNameS: String): CheckResult {
        let inputName = inputNameS.toString();
        if (reg.test(inputName)) {
            if (inputName === ' ') {
                inputName = inputName.slice(0, inputName.length - 1);
            }
            this.errInstanceName = true;
        } else {
            while (!reg.test(inputName) && inputName !== '') {
                inputName = inputName.slice(0, inputName.length - 1);
            }
            if (inputName === '') {
                console.log(inputName);
                this.errInstanceName = true; // hide
            } else {
                this.errInstanceName = false; // show
            }
        }
        return { flag: this.errInstanceName, inputName: inputName };
    }
}
class CheckResult {
    flag: boolean;
    inputName: string;
}
