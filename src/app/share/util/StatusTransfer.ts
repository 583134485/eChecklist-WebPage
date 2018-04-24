export class StatusTransfer {
    public static getStatus(statusCode: string): string {
        switch (statusCode) {
            case  '00': {
                return  'Submit failed ';
            }
            case  '01': {
                return  'Save the instance successfully ';
            }
            case  '02': {
                return  'Instance name duplicated ';
            }
            case  '03': {
                break;
            }
            case  '04': {
                break;
            }
            case  '05': {
                break;
            }
            case  '000': {
                return  'Instance name length should be 1-100 ';
            }
            case  '001': {
                return  'InstanceName cannot be empty! ';
            }
            case  '002': {
                return  'Template name invaild ';
            }
            case  '003': {
                return  'Input not valid ';
            }
            case  '004': {
                break;
            }
            default: {
                return  'Unexpected StatusCode ';
            }

        }

    }
}
