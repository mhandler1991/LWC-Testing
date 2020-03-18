// *********************
// IMPORTS
// *********************

import { LightningElement, wire, api, track } from 'lwc';
// Import Record Information
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// Import Nav
import { NavigationMixin } from 'lightning/navigation';


// *********************
// CONSTANTS
// *********************


// Related Opportunity Fields
const FIELDS = [
    'Opportunity.AccountId',
    'Opportunity.Account.Name',
    'Opportunity.Account.Phone',
    'Opportunity.Account.Website',
    // 'Opportunity.Account.BillingAddress',
]

export default class AccountInformation extends NavigationMixin(LightningElement) {

// export default class ContactInformation extends NavigationMixin(LightningElement) {

    @api recordId; // Grab the Record Id
    @api objectApiName; // Grab the Objects API Name

    // *********************
    // GET DATA
    // *********************

    @wire(getRecord, {recordId: '$recordId', fields: FIELDS})
    opportunity;

    get accountId(){
        return getFieldValue(this.opportunity.data, 'Opportunity.AccountId');
    }

    get accountName(){
        return getFieldValue(this.opportunity.data, 'Opportunity.Account.Name');
    }

    get accountPhone(){
        return getFieldValue(this.opportunity.data, 'Opportunity.Account.Phone');
    }

    get accountWebsite(){
        return getFieldValue(this.opportunity.data, 'Opportunity.Account.Website');
    }

    // get accountAdd(){
    //     return getFieldValue(this.opportunity.data, 'Opportunity.Account.BillingAddress');
    // }

    connectedCallback(){
        console.log("Account Information Logging:")
        console.log(this);
    }

    // *********************
    // Open SubTab
    // *********************
    navigateToRecordViewPage(event) {
        console.log('Account Edit Button Clicked!');
        console.log(event.target.dataset.id);s
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.dataset.id,
                objectApiName: 'Account',
                actionName: 'view'
            },
        });
    }

}