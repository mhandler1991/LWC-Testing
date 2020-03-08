import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const oppFields = [
    'opportunity.AccountId',
]

const relatedOpp = [
    'opportunity.Name',
]

const accFields = [
    'account.Name',
]

export default class RelatedOpportunities extends LightningElement {
    @api recordId; //Grab the Id of the record
    accountId;
    accName;

    @wire(getRecord, {recordId: '$recordId', oppFields})
    loadOpp({error, data}) {
        if(error) {
            // Error Handler
        } else if (data){
            this.accountId = data.fields.Name.value;
        }
    }

    @wire(getRecord, {recordId: accountId, accFields})
    loadAcc({error, data}){
        if(error){
            // Error Handler
        } else if(data){
            this.accName = data.fields.Name.value;
        }
    }

}