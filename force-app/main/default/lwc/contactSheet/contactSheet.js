
// *********************
// IMPORTS
// *********************

import { LightningElement, wire, api, track } from 'lwc';
// Import APEX Class Requirements
import getContactList from '@salesforce/apex/ContactList_Opp.getContactList';

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
];

// *********************
// EXPORT
// *********************

export default class ContactSheet extends LightningElement {

    
    @api recordId; // Grab the Record Id
    @api objectApiName; // Grab the Objects API Name
    @track columns = columns;

    @wire(getContactList, {recordId: '$recordId'}) contacts;

}