import { LightningElement, wire, api, track } from 'lwc';

import getActivityList from '@salesforce/apex/viewAllActivityNotesOnAccount.getActivityList';

const columns = [
    // { label: 'Id', fieldName: 'Id', type: 'text', sortable: true},
    { label: 'Subject', fieldName: 'Subject', type: 'text', sortable: true},
    { label: 'Comments', fieldName: 'Description', type: 'text', sortable: false},
    { label: 'Activity Date', fieldName: 'ActivityDate', type: 'date', sortable: true},
];

export default class ActivityList extends LightningElement {

    @api recordId; // Grab the Record Id
    @api objectApiName; // Grab the Objects API Name
    @track columns = columns;
    @track error;
    @track data;

    @wire(getActivityList, {recordId: '$recordId'}) tasks
        ({error, data}){

        if(data){

            // Log Values for Returned Opp Data
            this.data = data[0].Tasks
            console.log("Returned Data:")
            console.log(data);
            console.log(JSON.stringify(data, null, '\t'));
            console.log(data[0].Tasks);
            
            // Add Events?
            // this.data.push(data[0].Events)
        } 
        else if(error){

            // Log Error
            console.log(error);
        } 

    }

}

// APEX SOQL QUERY
// public class viewAllActivityNotesOnAccount {
//     @AuraEnabled(cacheable=true)
//     public static List<Opportunity> getActivityList(string recordId) {
//         String record = recordId;
//         return [
//             SELECT (Select Id, Subject, Description, ActivityDate From Tasks), (Select Id, Subject From Events)
//             From Opportunity
//             WHERE id = :record
//             ORDER BY ActivityDate DESC
//         ];
//     }
// }
    
