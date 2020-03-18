// *********************
// IMPORTS
// *********************

import { LightningElement, wire, api, track } from 'lwc';
// Import APEX Class Requirements
import getContactList from '@salesforce/apex/ContactList_Opp.getContactList';
// V2 w/ Contact Role Information
import getContactList2 from '@salesforce/apex/ContactList2.getContactList';

// Import Record Information
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';


// import sendMessage from '@salesforce/apex/TwilioSendSMS';


// // CREATE CONTACT RECORD
// import { createRecord } from 'lightning/uiRecordApi';
// // import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import CONTACT_OBJECT from '@salesforce/schema/Contact';
// // import NAME_FIELD from '@salesforce/schema/Account.Name';

// *********************
// CONSTANTS
// *********************

// DataTable Columns
// const columns = [
//     { label: 'Id', fieldName: 'Id' },
//     { label: 'Name', fieldName: 'Name'},
//     { label: 'Title', fieldName: 'Title'},
//     { label: 'Phone', fieldName: 'Phone', type: 'phone' },
//     { label: 'Email', fieldName: 'Email', type: 'email' },
//     { label: 'Mobile', fieldName: 'MobilePhone', type: 'phone'}
// ];

import ACC_ID from '@salesforce/schema/Opportunity.AccountId';

var accountId;

// *********************
// EXPORT
// *********************

export default class ContactInformation extends NavigationMixin(LightningElement) {

    @track activeSections = ['A', 'B']; //Default Open Accordion Sections 
    @api recordId; // Grab the Record Id
    @api objectApiName; // Grab the Objects API Name
    //@track columns = columns; // ASSIGN COLUMNS VAR

    @track openmodel = false; //Default Model Closed - Model Button has to be clicked
    @track sendMssg = false; //Default Model Closed - Model Button has to be clicked

    @track accId;
    accountId;

    @wire(getRecord, {recordId: '$recordId', fields: [ACC_ID] })
    account({error, data}) {
        if(data) {

            this.accId = getFieldValue(data, ACC_ID);

            // Log Values for Account Id of Opportunity
            console.log("Account Id from Contact List:")
            console.log(this.accId);
            accountId = this.accId;
            console.log(accountId);

        } else if (error) {

            // Log Error
            console.log(error);
        }
    }

    // ORIGINAL
    
    @wire(getContactList, {recordId: '$recordId'}) 
    contacts;

    // NEW

    // @wire(getContactList2, {accountId: '$accountId', opportunityId: '$recordId' }) 
    // contacts({error, data}){
    //     if(data) {
    //         console.log('Contact Query Data:');
    //         console.log(data);
    //     } else if(error) {
    //         console.log('Contact Query ERROR:');
    //         console.log(error);
    //     } else {
    //         console.log('Contact Query UNKNOWN')
    //     }
    // }

    // *********************
    // Modal Actions - Create Contact
    // *********************

    // Open Modal - Create Contact
    openmodal() {
        this.openmodel = true
    }

    // Close Modal - Creat Contact
    closeModal() {
        this.openmodel = false
    } 

    // *********************
    // Modal Actions - Send Message
    // *********************

    // Open Modal - Create Contact
    openMssg() {
        this.sendMssg = true
    }

    // Close Modal - Creat Contact
    closeMssg() {
        this.sendMssg = false
    } 

    
    // *********************
    // Open SubTab
    // *********************
    navigateToRecordViewPage(event) {
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: event.target.dataset.id,
            objectApiName: 'Contact',
            actionName: 'view'
        },
    });
}

}

