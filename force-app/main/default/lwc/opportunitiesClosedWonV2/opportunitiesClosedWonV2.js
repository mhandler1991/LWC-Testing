import { LightningElement, wire, api, track } from 'lwc';
// Import APEX Class Requirements
import getOppList from '@salesforce/apex/RelatedOpportunitySearch.getOpportunityInfo';
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
var opportunityRecords = [];

export default class OpportunitiesClosedWonV2 extends NavigationMixin(LightningElement) {
    
    // Grab Record Id
    @api recordId;
    // Grab Objects API Name
    @api objectApiName;
    // Track Fields
    @track nameField;
    @track accId;
    @track opportunityRecords;
    @track activeSections = opportunityRecords; //Default Open Accordion Sections 

    name;
    accountId;

    @wire(getRecord, {recordId: '$recordId', fields: [OPP_NAME, ACC_ID] })
    account({error, data}) {
        if(data) {
            this.nameField = getFieldValue(data, OPP_NAME);
            this.accId = getFieldValue(data, ACC_ID);

            // Log Values for Opportunity Name
            console.log("Opportunity Name Values:");
            console.log(this.nameField);
            name = this.nameField;
            console.log(name);

            // Log Values for Account Id of Opportunity
            console.log("Account Id Values:")
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

    // Grab related Opportunities
    @wire(getOppList, {recordId: '$accId'}) 
    result({error, data}) {
        if(data){
            console.log('Returned Funded Opportunities:');
            console.log(data);
            console.log(JSON.stringify(data, null, '\t'));
            var i;
            for (i = 0; i < data.length; i++) {
                console.log(data[i].Id);
                opportunityRecords.push(data[i].Id);
            }
            console.log(opportunityRecords);
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
    navigateToRecordViewPage(event) {
        console.log('Clicked!');
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