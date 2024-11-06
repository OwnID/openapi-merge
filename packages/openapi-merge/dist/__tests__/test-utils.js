"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMergeInputs = exports.expectMergeResult = exports.expectErrorType = void 0;
const data_1 = require("../data");
function expectErrorType(result, type) {
    if (data_1.isErrorResult(result)) {
        expect(result.type).toEqual(type);
    }
    else {
        fail(`Expected an error, but instead got: ${JSON.stringify(result, null, 2)}`);
    }
}
exports.expectErrorType = expectErrorType;
function expectMergeResult(actual, expected) {
    if (data_1.isErrorResult(actual)) {
        fail(`We expected to have a successful merge and instead got: ${JSON.stringify(actual, null, 2)}`);
    }
    expect(actual).toEqual(expected);
}
exports.expectMergeResult = expectMergeResult;
function toMergeInputs(oass) {
    return oass.map(oas => ({ oas }));
}
exports.toMergeInputs = toMergeInputs;
