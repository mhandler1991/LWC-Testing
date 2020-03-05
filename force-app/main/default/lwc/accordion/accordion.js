import { LightningElement, track } from 'lwc';

export default class Accordion extends LightningElement {
    @track activeSections = ['A', 'B', 'C'];

    handleSectionToggle(event) {
        const openSections = event.detail.openSections;
    }
}