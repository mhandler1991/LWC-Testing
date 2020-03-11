import { LightningElement, wire, api, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import OPP_STAGE from '@salesforce/schema/Opportunity.StageName';

// const FIELDS = [
//     'Opportunity.StageName'
// ];

stage0;
stage1;
stage2;
stage3;
stage4;

export default class UtilityBar extends LightningElement {

    @api recordId;
    show;
    sfo=false;
    @track stageName

    // Variables:
    stage0;
    stage1;
    stage2;
    stage3;
    stage4;

    // accepted parameters
    get acceptedFormats() {
        return ['.pdf', '.png', '.jpg', '.jpeg'];
    }

    // Handle Post Document Upload
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
    // @wire(getRecord, {recordId: '$recordId', fields: FIELDS})
    // opportunity;

    // get oppStage(){
    //     return getFieldValue(this.opportunity.data, 'Opportunity.StageName');
    // }

    @wire(getRecord, {recordId: '$recordId', fields: [OPP_STAGE] })
    opportunity({error, data}) {
        if(data) {
            this.stageName = getFieldValue(data, OPP_STAGE);

            // Log Values for Opp Stage
            console.log("Opportunity Stage Values:");
            console.log(this.stageName);
            console.log(this);

            // Define Appropriate Variable for Button Conditional Rendering
            if(this.stageName == "0: Contact"){
                console.log("STAGE = 0");
                this.stage0 = "1";
                //Add Window Reload
            } 
            else if (this.stageName == "1: Submit"){
                console.log("STAGE = 1");
                this.stage1 = "1";
                //Add Window Reload
            }
            else if (this.stageName == "2: Underwrite"){
                console.log("STAGE = 2");
                this.stage2 = "2";
                //Add Window Reload
            }
            else if (this.stageName == "3: Sell"){
                console.log("STAGE = 3");
                this.stage3 = "3";
                //Add Window Reload
            }
            else if (
                this.stageName == "4: Fund"){
                console.log("STAGE = 4");
                //Add Window Reload
            } else {
                console.log("Stage Unknown");
            }

        } else if (error) {

            // Log Error
            console.log(error);
        }
    }
}