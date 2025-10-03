import assert from 'assert';
import nock from 'nock';
import path from 'path';

const client = require('./client');

describe('Batch Update', () => {
  describe('#batchUpdate()', () => {
    it('should batch update multiple records.', async () => {
      const recordIds = [
        'abc-123',
        'def-456',
        'ghi-789'
      ];

      const attributes = {
        status: 'reviewed',
        project_id: 'project-123'
      };

      const expectedResponse = {
        records: [
          {
            id: 'abc-123',
            status: 'reviewed',
            project_id: 'project-123',
            form_values: {}
          },
          {
            id: 'def-456',
            status: 'reviewed',
            project_id: 'project-123',
            form_values: {}
          },
          {
            id: 'ghi-789',
            status: 'reviewed',
            project_id: 'project-123',
            form_values: {}
          }
        ]
      };

      const expectedBody = {
        records: [
          { id: 'abc-123' },
          { id: 'def-456' },
          { id: 'ghi-789' }
        ],
        attributes: attributes
      };

      nock('https://api.fulcrumapp.com')
        .put('/api/v2/records/batch', expectedBody)
        .reply(200, expectedResponse, {'Content-Type': 'application/json'});

      const records = await client.records.batchUpdate(recordIds, attributes);

      assert(Array.isArray(records), 'records should be an array.');
      assert.equal(records.length, 3, 'Should return 3 updated records.');
      assert.equal(records[0].id, 'abc-123', 'First record ID is incorrect.');
      assert.equal(records[0].status, 'reviewed', 'First record status is incorrect.');
      assert.equal(records[1].id, 'def-456', 'Second record ID is incorrect.');
      assert.equal(records[2].id, 'ghi-789', 'Third record ID is incorrect.');
    });

    it('should batch update records with form values.', async () => {
      const recordIds = ['record-1', 'record-2'];

      const attributes = {
        form_values: {
          'field-key-1': 'new value',
          'field-key-2': 100
        }
      };

      const expectedResponse = {
        records: [
          {
            id: 'record-1',
            form_values: {
              'field-key-1': 'new value',
              'field-key-2': 100
            }
          },
          {
            id: 'record-2',
            form_values: {
              'field-key-1': 'new value',
              'field-key-2': 100
            }
          }
        ]
      };

      const expectedBody = {
        records: [
          { id: 'record-1' },
          { id: 'record-2' }
        ],
        attributes: attributes
      };

      nock('https://api.fulcrumapp.com')
        .put('/api/v2/records/batch', expectedBody)
        .reply(200, expectedResponse, {'Content-Type': 'application/json'});

      const records = await client.records.batchUpdate(recordIds, attributes);

      assert(Array.isArray(records), 'records should be an array.');
      assert.equal(records.length, 2, 'Should return 2 updated records.');
      assert.equal(records[0].form_values['field-key-1'], 'new value', 'Field value incorrect.');
      assert.equal(records[0].form_values['field-key-2'], 100, 'Field value incorrect.');
    });
  });
});
