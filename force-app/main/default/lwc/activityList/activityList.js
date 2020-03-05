import { LightningElement, wire, api, track } from 'lwc';

import getActivityList from '@salesforce/apex/viewAllActivityNotesOnAccount.getActivityList';

const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Description', fieldName: 'Description'},
];

export default class ActivityList extends LightningElement {

    @api recordId; // Grab the Record Id
    @api objectApiName; // Grab the Objects API Name
    @track columns = columns;

    @wire(getActivityList, {recordId: '$recordId'}) tasks;

}


    
