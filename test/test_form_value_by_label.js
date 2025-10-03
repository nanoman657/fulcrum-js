import assert from 'assert';
import client from './client';

describe('Form Value By Label', () => {
  describe('#getFieldKeyByLabel()', () => {
    it('should return the field key for a given label', () => {
      const form = {
        elements: [
          { type: 'TextField', key: 'e659', label: 'Feature Type' },
          { type: 'PhotoField', key: 'b799', label: 'Photos' },
          { type: 'VideoField', key: '9bda', label: 'Videos' }
        ]
      };

      const key = client.forms.getFieldKeyByLabel(form, 'Feature Type');
      assert.equal(key, 'e659', 'Key should be e659');
    });

    it('should return null if label is not found', () => {
      const form = {
        elements: [
          { type: 'TextField', key: 'e659', label: 'Feature Type' }
        ]
      };

      const key = client.forms.getFieldKeyByLabel(form, 'Non-existent Label');
      assert.equal(key, null, 'Key should be null');
    });

    it('should return null if form is invalid', () => {
      const key1 = client.forms.getFieldKeyByLabel(null, 'Feature Type');
      assert.equal(key1, null, 'Key should be null for null form');

      const key2 = client.forms.getFieldKeyByLabel({}, 'Feature Type');
      assert.equal(key2, null, 'Key should be null for empty form');

      const key3 = client.forms.getFieldKeyByLabel({ elements: 'not-array' }, 'Feature Type');
      assert.equal(key3, null, 'Key should be null for invalid elements');
    });
  });

  describe('#setValuesByLabel()', () => {
    it('should convert label-based values to key-based values', () => {
      const form = {
        elements: [
          { type: 'TextField', key: 'e659', label: 'Feature Type' },
          { type: 'PhotoField', key: 'b799', label: 'Photos' },
          { type: 'VideoField', key: '9bda', label: 'Videos' }
        ]
      };

      const labelValues = {
        'Feature Type': 'Tree',
        'Photos': 'photo123.jpg'
      };

      const formValues = client.forms.setValuesByLabel(form, labelValues);
      
      assert.equal(formValues['e659'], 'Tree', 'Feature Type value should be set');
      assert.equal(formValues['b799'], 'photo123.jpg', 'Photos value should be set');
      assert.equal(Object.keys(formValues).length, 2, 'Should have 2 values');
    });

    it('should throw error if label is not found in form', () => {
      const form = {
        elements: [
          { type: 'TextField', key: 'e659', label: 'Feature Type' }
        ]
      };

      const labelValues = {
        'Non-existent Label': 'value'
      };

      assert.throws(
        () => client.forms.setValuesByLabel(form, labelValues),
        /Field with label "Non-existent Label" not found in form/,
        'Should throw error for non-existent label'
      );
    });

    it('should throw error if form is invalid', () => {
      const labelValues = { 'Feature Type': 'value' };

      assert.throws(
        () => client.forms.setValuesByLabel(null, labelValues),
        /Invalid form object/,
        'Should throw error for null form'
      );

      assert.throws(
        () => client.forms.setValuesByLabel({}, labelValues),
        /Invalid form object/,
        'Should throw error for empty form'
      );
    });

    it('should throw error if labelValues is invalid', () => {
      const form = {
        elements: [
          { type: 'TextField', key: 'e659', label: 'Feature Type' }
        ]
      };

      assert.throws(
        () => client.forms.setValuesByLabel(form, null),
        /Invalid labelValues/,
        'Should throw error for null labelValues'
      );

      assert.throws(
        () => client.forms.setValuesByLabel(form, 'not-an-object'),
        /Invalid labelValues/,
        'Should throw error for invalid labelValues'
      );
    });

    it('should handle empty labelValues object', () => {
      const form = {
        elements: [
          { type: 'TextField', key: 'e659', label: 'Feature Type' }
        ]
      };

      const formValues = client.forms.setValuesByLabel(form, {});
      assert.equal(Object.keys(formValues).length, 0, 'Should return empty object');
    });

    it('should work with complex form from test fixture', () => {
      const form = {
        elements: [
          {
            type: 'ChoiceField',
            key: 'e659',
            label: 'Feature Type',
            data_name: 'feature_type'
          },
          {
            type: 'PhotoField',
            key: 'b799',
            label: 'Photos',
            data_name: 'photos'
          },
          {
            type: 'VideoField',
            key: '9bda',
            label: 'Videos',
            data_name: 'videos'
          }
        ]
      };

      const labelValues = {
        'Feature Type': 'Tree',
        'Videos': 'video456.mp4'
      };

      const formValues = client.forms.setValuesByLabel(form, labelValues);
      
      assert.equal(formValues['e659'], 'Tree');
      assert.equal(formValues['9bda'], 'video456.mp4');
      assert.equal(Object.keys(formValues).length, 2);
    });
  });
});
