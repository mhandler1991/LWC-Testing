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
name;
accountId;

const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name'},
];

export default class OpportunitiesClosedWon extends LightningElement {

    // Grab Record Id
    @api recordId;
    // Grab Objects API Name
    @api objectApiName;
    // Track Fields
    @api nameField;
    @api accId;
    @track columns;

    @wire(getRecord, {recordId: '$recordId', fields: [OPP_NAME, ACC_ID] })
    opportunity({error, data}) {
        if(data) {

            // Define Values
            this.nameField = getFieldValue(data, OPP_NAME);
            this.accId = getFieldValue(data, ACC_ID);

            // Log Values for Opportunity Name
            console.log(this.nameField);
            name = this.nameField;
            console.log(name);

            // Log Values for Account Id of Opportunity
            console.log(this.accId);
            accountId = this.accId;
            console.log(accountId);

        } else if (error) {

            // Log Error
            console.log(error);
        }
    }

    // Grab related Opportunities
    // @wire(getOppList, {recordId: '0016g00000AhoV1AAJ'}) 
    // opportunities({error, data}){

    //     if(data){

    //         console.log(data);

    //     } else if(error){

    //         console.log(error);

    //     } else {

    //         console.log("Account ID:");
    //         console.log(accountId);
    //         console.log(this);
    //         console.log(JSON.stringify(that, undefined, '\t'));

    //     }
    // }

    @wire(getOppList, {recordId: '$accountId'}) 
    opportunities({error, data}){

    if(data){

        console.log(data);

    } else if(error){

        console.log(error);
        
    } else {
        console.log("Account ID:");
        console.log(this);
        // console.log(accountId);
        // console.log(accId);
        // console.log(this.nameField);
        // console.log(nameField);
    }
}

}