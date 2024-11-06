"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oas_generation_1 = require("./oas-generation");
const test_utils_1 = require("./test-utils");
const __1 = require("..");
describe('OAS Info', () => {
    it('should always take the first info block from the first definition', () => {
        const first = oas_generation_1.toOAS({});
        const second = oas_generation_1.toOAS({});
        first.info.title = 'first';
        second.info.title = 'second';
        const output = oas_generation_1.toOAS({});
        output.info.title = 'first';
        test_utils_1.expectMergeResult(__1.merge(test_utils_1.toMergeInputs([first, second])), {
            output
        });
    });
    it('should only take the first description if no DescriptionMergeBehaviour is set', () => {
        const first = oas_generation_1.toOAS({});
        const second = oas_generation_1.toOAS({});
        const third = oas_generation_1.toOAS({});
        second.info.description = 'Second description';
        third.info.description = 'Third description';
        const output = oas_generation_1.toOAS({});
        test_utils_1.expectMergeResult(__1.merge(test_utils_1.toMergeInputs([first, second, third])), {
            output
        });
    });
    it(`should only take the values with 'append' set to true if any DescriptionMergeBehaviour is set`, () => {
        const first = oas_generation_1.toOAS({});
        const second = oas_generation_1.toOAS({});
        const third = oas_generation_1.toOAS({});
        first.info.description = 'First description';
        second.info.description = 'Second description';
        third.info.description = 'Third description';
        const output = oas_generation_1.toOAS({});
        output.info.description = 'First description\n\nThird description';
        const mergeInputs = test_utils_1.toMergeInputs([first, second, third]);
        mergeInputs[0].description = {
            append: true
        };
        mergeInputs[2].description = {
            append: true
        };
        test_utils_1.expectMergeResult(__1.merge(mergeInputs), { output });
    });
    it('should append the title specified in DescriptionMergeBehaviour with the right heading level', () => {
        const first = oas_generation_1.toOAS({});
        const second = oas_generation_1.toOAS({});
        const third = oas_generation_1.toOAS({});
        first.info.description = 'First description';
        second.info.description = 'Second description';
        third.info.description = 'Third description';
        const mergeInputs = test_utils_1.toMergeInputs([first, second, third]);
        mergeInputs[0].description = {
            append: true,
            title: {
                value: 'First heading',
                headingLevel: 3
            }
        };
        mergeInputs[1].description = {
            append: true
        };
        mergeInputs[2].description = {
            append: true,
            title: {
                value: 'Third heading'
            }
        };
        const output = oas_generation_1.toOAS({});
        output.info.description = '### First heading\n\nFirst description\n\nSecond description\n\n# Third heading\n\nThird description';
        test_utils_1.expectMergeResult(__1.merge(mergeInputs), { output });
    });
    it('should skip descriptions even if they have headings', () => {
        const first = oas_generation_1.toOAS({});
        const second = oas_generation_1.toOAS({});
        const third = oas_generation_1.toOAS({});
        first.info.description = 'First description';
        third.info.description = 'Third description';
        const mergeInputs = test_utils_1.toMergeInputs([first, second, third]);
        mergeInputs[0].description = {
            append: true,
            title: {
                value: 'First heading',
                headingLevel: 3
            }
        };
        mergeInputs[1].description = {
            append: true,
            title: {
                value: 'Second heading',
                headingLevel: 2
            }
        };
        mergeInputs[2].description = {
            append: true,
            title: {
                value: 'Third heading'
            }
        };
        const output = oas_generation_1.toOAS({});
        output.info.description = '### First heading\n\nFirst description\n\n# Third heading\n\nThird description';
        test_utils_1.expectMergeResult(__1.merge(mergeInputs), { output });
    });
});
