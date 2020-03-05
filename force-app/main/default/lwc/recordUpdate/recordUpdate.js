import { LightningElement, api } from 'lwc';

export default class RecordUpdate extends LightningElement {
    @api recordId;

    // Submit Changes
    handleSubmit(event) {
        console.log('onsubmit: '+ event.detail.fields);
    }

    // On Success - Console Log Sucess
    handleSuccess(event) {
        const updateRecord = event.detail.id;
        console.log('onsucess: ', updatedRecord);
    }

}
