import { merge } from '..';
import { toOAS } from './oas-generation';
import { expectMergeResult } from './test-utils';

describe('external reference rewrites', () => {
  it('rewrites a configured external path and preserves the fragment', () => {
    const input = toOAS({}, {
      schemas: {
        OperationType: {
          $ref: '../contracts/contracts.yaml#/components/schemas/OperationType',
          format: 'OwnID.Auth.Contracts.Model.OperationType',
          type: 'string'
        }
      }
    });
    const output = toOAS({}, {
      schemas: {
        OperationType: {
          $ref: '../console-server.openapi.yaml#/components/schemas/OperationType'
        }
      }
    });

    expectMergeResult(merge([{
      oas: input,
      externalReferenceRewrites: [{
        source: '../contracts/contracts.yaml',
        target: '../console-server.openapi.yaml'
      }]
    }]), { output });
  });
});
