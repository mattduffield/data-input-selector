/**
 * Name:  data-input-selector
 * Desc:  This custom element provides a nice themable alternative to the 
 *        browser default select element.
 * Usage: 
 *  <data-input-selector
 *    items.bind="genders"
 *    value.bind="currentItem.gender"
 *    display-member="name"
 *    value-member="value">
 *  </data-input-selector>
 * 
 *  <data-input-selector
 *    lookups.bind="lookups"
 *    lookup-collection="Genders"
 *    value.bind="currentItem.gender"
 *    display-member="name"
 *    value-member="value">
 *  </data-input-selector>
 * 
 * Reference:
 *  https://codepen.io/wallaceerick/pen/ctsCz
 */
import {customElement, bindable, bindingMode, BindingEngine} from 'aurelia-framework';

export class DataInputSelector {
  static inject() {
    return [Element, BindingEngine];
  }
  constructor(element, bindingEngine) {
    this.element = element;
    this.bindingEngine = bindingEngine;
    this.items = [];
    this.lookups = [];
    this.lookupCollection = '';
    this.display;
    this.value;
    this.valueBinding;
    this.displayMember = '';
    this.valueMember = '';
  }
  attached() {
    this.valueBinding = this.element.getAttribute('value.bind');

    if (this.lookupCollection) {
      const lookup = this.lookups.find(l => l.name === this.lookupCollection);
      if (lookup && lookup.fields) {
        this.items = lookup.fields;
      } else {
        this.items = [];
      }
    }

    if (this.items) {
      const found = this.items.find(i => i.value === this.value);
      if (found) {
        this.selectedItem = found;
      }
    }
  }
  onSelectOption(e, item) {
    e.stopPropagation();
    if (item === this.selectedItem) return;
    const el = this.element.querySelector('.select-styled');
    this.selectedItem = item;
    this.value = this.selectedItem[this.valueMember] || this.selectedItem;
    this.display= this.selectedItem[this.displayMember];
    const event = new CustomEvent('change', {bubbles: true, detail:this.value});
    this.element.dispatchEvent(event);
  }
}
customElement('data-input-selector')(DataInputSelector);
bindable('items')(DataInputSelector);
bindable('lookups')(DataInputSelector);
bindable('lookupCollection')(DataInputSelector);
bindable('value')(DataInputSelector);
bindable('displayMember')(DataInputSelector);
bindable('valueMember')(DataInputSelector);
