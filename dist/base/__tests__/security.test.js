"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const oas_generation_1 = require("./oas-generation");
const test_utils_1 = require("./test-utils");
describe('OAS Security', () => {
    it('if the first file has a security definition then only that should be taken', () => {
        const first = oas_generation_1.toOAS({}, {
            securitySchemes: {
                firstScheme: {
                    type: 'apiKey',
                    name: 'first scheme',
                    in: 'query'
                }
            }
        });
        first.security = [{ "first scheme": [] }];
        const second = oas_generation_1.toOAS({}, {
            securitySchemes: {
                secondScheme: {
                    type: 'apiKey',
                    name: 'second scheme',
                    in: 'query'
                }
            }
        });
        second.security = [{ "second scheme": [] }];
        const output = oas_generation_1.toOAS({}, {
            securitySchemes: {
                firstScheme: {
                    type: 'apiKey',
                    name: 'first scheme',
                    in: 'query'
                }
            }
        });
        output.security = [{ "first scheme": [] }];
        test_utils_1.expectMergeResult(__1.merge(test_utils_1.toMergeInputs([first, second])), {
            output
        });
    });
    it('should take the first available security scheme definition', () => {
        const first = oas_generation_1.toOAS({});
        first.security = [{ "first scheme": [] }];
        const second = oas_generation_1.toOAS({}, {
            securitySchemes: {
                secondScheme: {
                    type: 'apiKey',
                    name: 'second scheme',
                    in: 'query'
                }
            }
        });
        second.security = [{ "second scheme": [] }];
        const output = oas_generation_1.toOAS({}, {
            securitySchemes: {
                secondScheme: {
                    type: 'apiKey',
                    name: 'second scheme',
                    in: 'query'
                }
            }
        });
        output.security = [{ "first scheme": [] }];
        test_utils_1.expectMergeResult(__1.merge(test_utils_1.toMergeInputs([first, second])), {
            output
        });
    });
    it('shoud take the first top level security requirements definition', () => {
        const first = oas_generation_1.toOAS({}, {
            securitySchemes: {
                firstScheme: {
                    type: 'apiKey',
                    name: 'first scheme',
                    in: 'query'
                }
            }
        });
        const second = oas_generation_1.toOAS({}, {
            securitySchemes: {
                secondScheme: {
                    type: 'apiKey',
                    name: 'second scheme',
                    in: 'query'
                }
            }
        });
        second.security = [{ "second scheme": [] }];
        const output = oas_generation_1.toOAS({}, {
            securitySchemes: {
                firstScheme: {
                    type: 'apiKey',
                    name: 'first scheme',
                    in: 'query'
                }
            }
        });
        output.security = [{ "second scheme": [] }];
        test_utils_1.expectMergeResult(__1.merge(test_utils_1.toMergeInputs([first, second])), {
            output
        });
    });
    it('should have no security definitions if none are defined', () => {
        const first = oas_generation_1.toOAS({});
        const second = oas_generation_1.toOAS({});
        const output = oas_generation_1.toOAS({});
        test_utils_1.expectMergeResult(__1.merge(test_utils_1.toMergeInputs([first, second])), {
            output
        });
    });
});
