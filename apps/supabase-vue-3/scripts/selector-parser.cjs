const path = require('path')
const fs = require('fs')
const postcss = require('postcss')
const parser = require('postcss-selector-parser');
const transform = selectors => {
    selectors.walk(selector => {
        // do something with the selector
        console.log(String(selector))
    });
};
const transformed = postcss([
    {
        postcssPlugin: true,
        Rule: (rule, help) => {
            parser(transform).processSync(rule.selector)
        }
    }
]).process(fs.readFileSync(path.resolve(__dirname, 't.css'), 'utf8'))

console.log(transformed.css)