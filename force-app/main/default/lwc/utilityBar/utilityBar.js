import { LightningElement, wire, api, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import OPP_STAGE from '@salesforce/schema/Opportunity.StageName';

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

                // Log stage & Update Variable
                console.log("STAGE = 0");
                this.stage0 = "0";

                //Clear Stage Values:
                this.stage1 = null;
                this.stage2 = null;
                this.stage3 = null;
                this.stage4 = null;
            } 
            else if (this.stageName == "1: Submit"){
                
                // Log stage & Update Variable
                console.log("STAGE = 1");
                this.stage1 = "1";

                //Clear Stage Values:
                this.stage0 = null;
                this.stage2 = null;
                this.stage3 = null;
                this.stage4 = null;

            }
            else if (this.stageName == "2: Underwrite"){
                
                // Log stage & Update Variable
                console.log("STAGE = 2");
                this.stage2 = "2";

                //Clear Stage Values:
                this.stage0 = null;
                this.stage1 = null;
                this.stage3 = null;
                this.stage4 = null;

            }
            else if (this.stageName == "3: Sell"){
               
                // Log stage & Update Variable
                console.log("STAGE = 3");
                this.stage3 = "3";

                //Clear Stage Values:
                this.stage0 = null;
                this.stage1 = null;
                this.stage2 = null;
                this.stage4 = null;

            }
            else if (this.stageName == "4: Fund"){

                console.log("STAGE = 4");
                this.stage4 = "4";

                //Clear Stage Values:
                this.stage0 = null;
                this.stage1 = null;
                this.stage2 = null;
                this.stage3 = null;

            } else {

                // Log Unknown StageName
                console.log("Stage Unknown");
                console.log(this.stageName);
            }

        } else if (error) {

            // Log Error
            console.log(error);
        }
    }
}