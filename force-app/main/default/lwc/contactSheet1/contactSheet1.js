
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
    'Opportunity.Name',
    'Opportunity.AccountId',
];

const ACCFIELDS = [
    'Account.Name'
]

// *********************
// EXPORT
// *********************

export default class ContactSheet1 extends LightningElement {

    @track activeSections = ['A', 'B', 'C']; //Default Open Accordion Sections 
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

    // Define Opportunity Name
    get name() {
        return getFieldValue(this.opportunity.data, 'Opportunity.Name');
    }

    // Define Account Id
    get accountId() {
        return getFieldValue(this.opportunity.data, 'Opportunity.AccountId');
    }

    // *********************
    // Get Account Record Information
    // *********************

    // @wire(getRecord, {recordId: accountId(), fields: ACCFIELDS})
    // Account;

    // //Define Account Name
    // get accountName() {
    //     return getFieldValue(this.opportunity.data, 'Account.Name')
    // }

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

}