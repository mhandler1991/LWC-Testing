// *********************
// IMPORTS
// *********************

import { LightningElement, wire, api, track } from 'lwc';
// Import APEX Class Requirements
import getContactList from '@salesforce/apex/ContactList_Opp.getContactList';
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

// *********************
// EXPORT
// *********************

export default class ContactInformation extends LightningElement {

    @track activeSections = ['A', 'B']; //Default Open Accordion Sections 
    @api recordId; // Grab the Record Id
    @api objectApiName; // Grab the Objects API Name
    //@track columns = columns; // ASSIGN COLUMNS VAR

    @track openmodel = false; //Default Model Closed - Model Button has to be clicked
    @track sendMssg = false; //Default Model Closed - Model Button has to be clicked

    @wire(getContactList, {recordId: '$recordId'}) contacts;

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
    // Open SubTab -- NOT WORKING
    // *********************

    // Contact Record Open Handler
    // handleOpenRecordClick() {
    //     console.log("Clicked!")
    //     console.log(target.value);
    //     const selectEvent = new CustomEvent('contactView', {
    //         detail: target.value
    //     });
    //     this.dispatchEvent(selectEvent);
    // }

    navigateToRecordViewPage(event) {
        console.log("CLICKED!");
        console.log(event.target.dataset.id);
        console.log(this);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.dataset.id,
                actionName: 'view'
            }
        });
    }

    // Send SMS Message through Twilio
    // sendMessageClick() {
    //     sendMessage({
    //         Message: "123",
    //         ToMobileNumber: "6507592961"
    //     })
    //     .then({

    //     })
    //     .catch({

    //     });
    // }
}

