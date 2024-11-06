"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const __1 = require("..");
const test_utils_1 = require("./test-utils");
const oas_generation_1 = require("./oas-generation");
describe('merge', () => {
    describe('simple cases', () => {
        it('should return an error if no inputs are provided', () => {
            test_utils_1.expectErrorType(__1.merge([]), 'no-inputs');
        });
        it('should result in a no-op on a simple swagger file', () => {
            test_utils_1.expectMergeResult(__1.merge(test_utils_1.toMergeInputs([oas_generation_1.toOAS({})])), { output: oas_generation_1.toOAS({}) });
        });
    });
});
