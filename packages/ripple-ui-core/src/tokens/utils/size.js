import StyleDictionary from 'style-dictionary';
StyleDictionary.registerFormat({
    name: 'utilities/sizeClasses',
    formatter: ({ dictionary }) => {
        let output = `/**
 * Size util
 *
 * This file is automatically generated, do not edit directly!
 */
.rpl-u-size {
`;
        for (let i = 0; i < dictionary.properties.steps.value; i++) {
            output += `  &-${i + 1} {
    width: var(--rpl-sp-${i + 1});
    height: var(--rpl-sp-${i + 1});
  }

`;
        }
        output += `}
`;
        return output;
    }
});
StyleDictionary.extend({
    properties: {
        steps: {
            value: 14
        }
    },
    platforms: {
        css: {
            buildPath: 'src/styles/generated/',
            transformGroup: 'css',
            files: [
                {
                    destination: '_size.css',
                    format: 'utilities/sizeClasses'
                }
            ]
        }
    }
}).buildAllPlatforms();
//# sourceMappingURL=size.js.map