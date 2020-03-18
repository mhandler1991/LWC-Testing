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
var count = 0;
var openOpportunityRecords = [];

export default class OpportunitiesOpenV2 extends NavigationMixin(LightningElement) {

        // Grab Record Id
        @api recordId;
        // Grab Objects API Name
        @api objectApiName;
        // Track Fields
        @track nameField;
        @track accId;
        @track count;
        @track openOpportunityRecords;
        @track activeSections = openOpportunityRecords; //Default Open Accordion Sections 
        @track title;
    
        name;
        accountId;
    
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
            // console.log("Number of Opps:");
            // console.log(_.size(opportunities));
            // console.log(this);
            // console.log(this.opportunities);
            // console.log(JSON.stringify(this, null, '\t'));
            console.log('Title:');
            console.log(this.title);
            console.log(this);
        }

        // Grab related Opportunities
        @wire(getOppList, {recordId: '$accId'}) 
        result({error, data}) {
            if(data){
                console.log('Returned Open Opportunities:');
                console.log(data);
                console.log(JSON.stringify(data, null, '\t'));
                var i;
                count = 0;
                for (i = 0; i < data.length; i++) {
                    console.log(data[i].Id);
                    openOpportunityRecords.push(data[i].Id);
                    count ++;
                }
                console.log(openOpportunityRecords);
                console.log(count);
                this.title = count + " Open Opportunities";
                console.log(this.title);
            }
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