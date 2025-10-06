import Mixin from 'mixmatch';

export default class BulkUpdate extends Mixin {
  async bulkUpdate(ids, attributes, changesetOptions = {}) {
    // Create a changeset for this bulk operation
    const changesetObj = {
      form_id: attributes.form_id || changesetOptions.form_id,
      metadata: changesetOptions.metadata || {
        app: 'fulcrum-js',
        operation: 'bulk_update'
      }
    };

    const changeset = await this.client.changesets.create(changesetObj);

    // Update each record with the changeset_id
    const updatedRecords = [];
    
    for (const id of ids) {
      const recordAttributes = {
        ...attributes,
        changeset_id: changeset.id
      };
      
      const updated = await this.update(id, recordAttributes);
      updatedRecords.push(updated);
    }

    // Close the changeset
    await this.client.changesets.close(changeset.id);

    return updatedRecords;
  }
}
