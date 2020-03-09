
// *********************
// IMPORTS
// *********************

import { LightningElement, wire, api, track } from 'lwc';
// Import APEX Class Requirements
import getContactList from '@salesforce/apex/ContactList_Opp.getContactList';
// Import Record Information
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';


// // CREATE CONTACT RECORD
// import { createRecord } from 'lightning/uiRecordApi';
// // import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import CONTACT_OBJECT from '@salesforce/schema/Contact';
// // import NAME_FIELD from '@salesforce/schema/Account.Name';

// *********************
// CONSTANTS
// *********************

// DataTable Columns
const columns = [
    // { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name'},
    { label: 'Title', fieldName: 'Title'},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Mobile', fieldName: 'MobilePhone', type: 'phone'}
];

const FIELDS = [
    'Opportunity.Account__r.Website',
    'Opportunity.Account__r.Phone',
    'Opportunity.Account__r.BillingAddress',
];


// *********************
// EXPORT
// *********************

export default class ContactSheet1 extends LightningElement {

    @track activeSections = ['A', 'B']; //Default Open Accordion Sections 
    @api recordId; // Grab the Record Id
    @api objectApiName; // Grab the Objects API Name
    @track columns = columns; // ASSIGN COLUMNS VAR
    @track openmodel = false; //Default Model Closed - Model Button has to be clicked

    @wire(getContactList, {recordId: '$recordId'}) contacts;

    // *********************
    // Get Opportunity Record Information
    // *********************
    @wire(getRecord, {recordId: '$recordId', fields: FIELDS})
    opportunity;

    get accWebsite() {
        return getFieldValue(this.opportunity.data, 'Opportunity.Account__r.Website');
    }

    get accPhone() {
        return getFieldValue(this.opportunity.data, 'Opportunity.Account__r.Phone');
    }

    get accBillingAddress() {
        return getFieldValue(this.opportunity.data, 'Opportunity.Account__r.BillingAddress');
    }

    // *********************
    // Modal Actions
    // *********************

    // Open Modal
    openmodal() {
        this.openmodel = true
    }

    // Close Modal
    closeModal() {
        this.openmodel = false
    } 

    // Handle Accordion
    handleSectionToggle(event) {
        const openSections = event.detail.openSections;
    }

    // Contact Record Open Handler
    handleOpenRecordClick() {
        console.log("Clicked!")
        console.log(target.value);
        const selectEvent = new CustomEvent('contactView', {
            detail: target.value
        });
        this.dispatchEvent(selectEvent);
    }

}