"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const oas_generation_1 = require("./oas-generation");
const test_utils_1 = require("./test-utils");
describe('external reference rewrites', () => {
    it('rewrites a configured external path and preserves the fragment', () => {
        const input = oas_generation_1.toOAS({}, {
            schemas: {
                OperationType: {
                    $ref: '../contracts/contracts.yaml#/components/schemas/OperationType',
                    format: 'OwnID.Auth.Contracts.Model.OperationType',
                    type: 'string'
                }
            }
        });
        const output = oas_generation_1.toOAS({}, {
            schemas: {
                OperationType: {
                    $ref: '../console-server.openapi.yaml#/components/schemas/OperationType'
                }
            }
        });
        test_utils_1.expectMergeResult(__1.merge([{
                oas: input,
                externalReferenceRewrites: [{
                        source: '../contracts/contracts.yaml',
                        target: '../console-server.openapi.yaml'
                    }]
            }]), { output });
    });
});
