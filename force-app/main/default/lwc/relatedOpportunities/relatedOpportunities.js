// *********************
// IMPORTS
// *********************

import { LightningElement, wire, api, track } from 'lwc';
// Import Record Information
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';


// *********************
// CONSTANTS
// *********************


// Related Opportunity Fields
const FIELDS = [
    'Opportunity.Previous_Opportunity__c',
    'Opportunity.Previous_Opportunity__r.Name',
    'Opportunity.Previous_Opportunity__r.Amount_Doc_d__c',
    'Opportunity.Previous_Opportunity__r.Actual_Daily_Payment__c',
    'Opportunity.Previous_Opportunity__r.Docs_Term__c',
    'Opportunity.Previous_Opportunity__r.Balance_Remaining__c',
    'Opportunity.Previous_Opportunity__r.Payments_Bounced__c',
    'Opportunity.Previous_Opportunity__r.Payments_Behind__c',
    'Opportunity.Previous_Opportunity__r.Balance_Paid__c',
    'Opportunity.Previous_Opportunity__r.Actual_Points_Earned__c',
    'Opportunity.Previous_Opportunity__r.Payments_Collected__c',
    'Opportunity.Previous_Opportunity__r.Origination_Fee__c',
    'Opportunity.Previous_Opportunity__r.NF_Maturity_Date__c',
]


// *********************
// EXPORT
// *********************

export default class RelatedOpportunities extends LightningElement {

    @track activeSections = ['A', 'B']; //Default Open Accordion Sections 
    @api recordId; // Grab the Record Id
    @api objectApiName; // Grab the Objects API Name


    // *********************
    // GET DATA
    // *********************

    @wire(getRecord, {recordId: '$recordId', fields: FIELDS})
    relatedOpportunity;

    get prevOpp(){
        return getFieldValue(this.relatedOpportunity.data, 'Opportunity.Previous_Opportunity__c');
    }

    get prevOppName(){
        return getFieldValue(this.relatedOpportunity.data, 'Opportunity.Previous_Opportunity__r.Name');
    }

    get prevOppAD(){
        return getFieldValue(this.relatedOpportunity.data, 'Opportunity.Previous_Opportunity__r.Amount_Doc_d__c');
    }

    get prevOppADP(){
        return getFieldValue(this.relatedOpportunity.data, 'Opportunity.Previous_Opportunity__r.Actual_Daily_Payment__c');
    }

    get prevOppDT(){
        return getFieldValue(this.relatedOpportunity.data, 'Opportunity.Previous_Opportunity__r.Docs_Term__c');
    }

    get prevOppBR(){
        return getFieldValue(this.relatedOpportunity.data, 'Opportunity.Previous_Opportunity__r.Balance_Remaining__c');
    }

    get prevOppPB(){
        return getFieldValue(this.relatedOpportunity.data, 'Opportunity.Previous_Opportunity__r.Payments_Bounced__c');
    }

    get prevOppPBehind(){
        return getFieldValue(this.relatedOpportunity.data, 'Opportunity.Previous_Opportunity__r.Payments_Behind__c');
    }

    get prevOppBP(){
        return getFieldValue(this.relatedOpportunity.data, 'Opportunity.Previous_Opportunity__r.Payments_Behind__c');
    }

    get prevOppAPE(){
        return getFieldValue(this.relatedOpportunity.data, 'Opportunity.Previous_Opportunity__r.Actual_Points_Earned__c');
    }

    get prevOppPC(){
        return getFieldValue(this.relatedOpportunity.data, 'Opportunity.Previous_Opportunity__r.Payments_Collected__c');
    }

    get prevOppOF(){
        return getFieldValue(this.relatedOpportunity.data, 'Opportunity.Previous_Opportunity__r.Origination_Fee__c');
    }

    get prevOppMD(){
        return getFieldValue(this.relatedOpportunity.data, 'Opportunity.Previous_Opportunity__r.NF_Maturity_Date__c');
    }

    connectedCallback(){
        console.log("RELATED OPPORTUNITY LOGGING:");
        console.log(this);
    }

    // *********************
    // ACCORDION HANDLER
    // *********************

    // Handle Accordion
    handleSectionToggle(event) {
        const openSections = event.detail.openSections;
    }
}