import List from '../actions/list';
import Find from '../actions/find';
import Create from '../actions/create';
import Update from '../actions/update';
import Delete from '../actions/delete';
import Resource from './base';
import Page from '../page';

export default class Form extends Resource {
  get resourceName() {
    return 'form';
  }

  get resourcesName() {
    return 'forms';
  }

  async history(id, version = null) {
    let options = null;

    if (version != null) {
      options = { qs: { version: version } };
    }

    const body = await this.client.api.get(this.memberActionPath(id, 'history'), options);
    return new Page(body, this.resourcesName);
  }

  /**
   * Get the field key for a given field label
   * @param {Object} form - The form object containing elements
   * @param {string} label - The field label to search for
   * @returns {string|null} The field key if found, null otherwise
   */
  getFieldKeyByLabel(form, label) {
    if (!form || !form.elements || !Array.isArray(form.elements)) {
      return null;
    }

    const element = form.elements.find(el => el.label === label);
    return element ? element.key : null;
  }

  /**
   * Set form values using field labels instead of keys
   * @param {Object} form - The form object containing elements
   * @param {Object} labelValues - Object mapping field labels to values
   * @returns {Object} Object mapping field keys to values for use in record.form_values
   */
  setValuesByLabel(form, labelValues) {
    if (!form || !form.elements || !Array.isArray(form.elements)) {
      throw new Error('Invalid form object: must contain an elements array');
    }

    if (!labelValues || typeof labelValues !== 'object') {
      throw new Error('Invalid labelValues: must be an object');
    }

    const formValues = {};

    Object.keys(labelValues).forEach((label) => {
      const value = labelValues[label];
      const key = this.getFieldKeyByLabel(form, label);

      if (key) {
        formValues[key] = value;
      } else {
        throw new Error(`Field with label "${label}" not found in form`);
      }
    });

    return formValues;
  }
}

List.includeInto(Form);
Find.includeInto(Form);
Create.includeInto(Form);
Update.includeInto(Form);
Delete.includeInto(Form);
