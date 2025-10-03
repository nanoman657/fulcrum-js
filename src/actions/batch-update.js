import Mixin from 'mixmatch';

export default class BatchUpdate extends Mixin {
  async batchUpdate(ids, attributes) {
    const options = {
      body: {
        [`${this.resourcesName}`]: ids.map(id => ({ id })),
        attributes: attributes
      }
    };

    const body = await this.client.api.put(this.actionPath('batch'), options);

    return body[this.resourcesName];
  }
}
