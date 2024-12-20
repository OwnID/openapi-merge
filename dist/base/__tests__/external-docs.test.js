"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oas_generation_1 = require("./oas-generation");
const test_utils_1 = require("./test-utils");
const __1 = require("..");
describe('OAS External Docs', () => {
    it('should always take the first docs definition', () => {
        const first = oas_generation_1.toOAS({});
        const second = oas_generation_1.toOAS({});
        first.externalDocs = {
            url: 'https://docs.example.com',
            description: 'My first documentation'
        };
        second.externalDocs = {
            url: 'https://docs.example.com',
            description: 'My second documentation'
        };
        const output = oas_generation_1.toOAS({});
        output.externalDocs = {
            url: 'https://docs.example.com',
            description: 'My first documentation'
        };
        test_utils_1.expectMergeResult(__1.merge(test_utils_1.toMergeInputs([first, second])), {
            output
        });
    });
    it('should take the first available docs definition', () => {
        const first = oas_generation_1.toOAS({});
        const second = oas_generation_1.toOAS({});
        second.externalDocs = {
            url: 'https://docs.example.com',
            description: 'My second documentation'
        };
        const output = oas_generation_1.toOAS({});
        output.externalDocs = {
            url: 'https://docs.example.com',
            description: 'My second documentation'
        };
        test_utils_1.expectMergeResult(__1.merge(test_utils_1.toMergeInputs([first, second])), {
            output
        });
    });
    it('should return no docs definition if none could be found', () => {
        const first = oas_generation_1.toOAS({});
        const second = oas_generation_1.toOAS({});
        const output = oas_generation_1.toOAS({});
        test_utils_1.expectMergeResult(__1.merge(test_utils_1.toMergeInputs([first, second])), {
            output
        });
    });
});
