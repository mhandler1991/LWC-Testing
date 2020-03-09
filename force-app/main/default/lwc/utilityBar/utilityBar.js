import { LightningElement, wire, api, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const FIELDS = [
    'Opportunity.StageName'
];

export default class UtilityBar extends LightningElement {

    @api recordId;
    show;
    sfo=false;

    // accepted parameters
    get acceptedFormats() {
        return ['.pdf', '.png', '.jpg', '.jpeg'];
    }

    handleUploadFinished(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Document Uploaded',
                message: 'The provided document(s) have been successfully uploaded',
                variant: 'success',
            })
        );
        // Refresh Page
        eval("$A.get('e.force:refreshView').fire();");
    }

// Conditional Buttons

    @wire(getRecord, {recordId: '$recordId', fields: FIELDS})
    opportunity;

    get oppStage(){
        return getFieldValue(this.opportunity.data, 'Opportunity.StageName');
    }

}