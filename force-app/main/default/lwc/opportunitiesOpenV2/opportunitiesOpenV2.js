import { LightningElement, wire, api, track } from 'lwc';
// Import APEX Class Requirements
import getOppList from '@salesforce/apex/RelatedOpportunities.getOpportunityList';
// Import Record Information
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';
// Import Navigatoins
import { NavigationMixin } from 'lightning/navigation';
// Import Fields from the Salesforce Schema
import OPP_NAME from '@salesforce/schema/Opportunity.Name';
import ACC_ID from '@salesforce/schema/Opportunity.AccountId';

// Define Variables
var name;
var accountId;
var count;

export default class OpportunitiesOpenV2 extends NavigationMixin(LightningElement) {

        // Grab Record Id
        @api recordId;
        // Grab Objects API Name
        @api objectApiName;
        // Track Fields
        @track nameField;
        @track accId;
        @track count;
    
        name;
        accountId;
        count;
    
        @wire(getRecord, {recordId: '$recordId', fields: [OPP_NAME, ACC_ID] })
        account({error, data}) {
            if(data) {
                this.nameField = getFieldValue(data, OPP_NAME);
                this.accId = getFieldValue(data, ACC_ID);
    
                // Log Values for Opportunity Name
                console.log("Open Opportunity Name:");
                console.log(this.nameField);
                name = this.nameField;
                console.log(name);
    
                // Log Values for Account Id of Opportunity
                console.log("Open Opportunities Acc Id:")
                console.log(this.accId);
                accountId = this.accId;
                console.log(accountId);

            } else if (error) {
    
                // Log Error
                console.log(error);
            }
        }
    
        // Grab related Opportunities
        @wire(getOppList, {recordId: '$accId'}) 
        opportunities;

        // Call After Component Render
        renderedCallback(){
            console.log("Number of Opps:");
            // console.log(_.size(opportunities));
            console.log(this);
            console.log(this.opportunities);
            console.log(JSON.stringify(this, null, '\t'));
        }

        // *********************
        // ACCORDION HANDLER
        // *********************

        // Handle Accordion
        handleSectionToggle(event) {
            const openSections = event.detail.openSections;
        }

        // *********************
        // Open SubTab
        // *********************
        navigateToRecord(event) {
            console.log('Clicked! - Closed Won LWC');
            console.log(event.target.dataset.id);
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: event.target.dataset.id,
                    objectApiName: 'Opportunity',
                    actionName: 'view'
                },
            });
        }
}   