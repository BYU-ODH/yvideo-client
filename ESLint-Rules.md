# ESLint Rules

| Rule                          | Function                                                                                                                                                              |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `array-bracket-newline`       | Requires line breaks if there are line breaks inside elements or between elements                                                                                     |
| `array-bracket-spacing`       | Disallows spaces inside array brackets                                                                                                                                |
| `array-element-newline`       | Doesn't care if there are new lines in an array                                                                                                                       |
| `block-spacing`               | Requires one or more spaces after the opening curly brace of a code block, if the code is on the same line                                                            |
| `brace-style`                 | The opening brace of a block must be placed on the same line as its corresponding statement or declaration                                                            |
| `comma-dangle`                | Adds trailing comma when last item in list is on a new line                                                                                                           |
| `constructor-super`           | Constructors of derived classes must call `super()`                                                                                                                   |
| `curly`                       | Forces brace-less `if`, `else if`, `else`, `for`, `while`, or `do` if their body contains only one single-line statement                                              |
| `dot-location`                | When splitting a chained function call between lines, the dot will be on the new line with the chained function call                                                  |
| `eqeqeq`                      | Forces all comparisons to use triple equals, which checks type in addition to value                                                                                   |
| `func-call-spacing`           | Disallows space between the function name and the opening parenthesis                                                                                                 |
| `import-quotes/import-quotes` | Imports must use single quotes                                                                                                                                        |
| `indent`                      | Changes all indentations to tabs                                                                                                                                      |
| `jsx-quotes`                  | Disallows double quotes in JSX attributes                                                                                                                             |
| `no-extra-bind`               | Avoids unnecessary use of bind() and warns whenever an immediately-invoked function expression (IIFE) is using bind() and doesn’t have an appropriate `this` value    |
| `no-extra-parens`             | Disallows unnecessary parentheses around any non-jsx expression                                                                                                       |
| `no-multi-spaces`             | Disallows multiple whitespace around logical expressions, conditional expressions, declarations, array elements, object properties, sequences and function parameters |
| `no-multiple-empty-lines`     | Allows one empty line between lines of code, and one empty line at the end of the file                                                                                |
| `no-trailing-spaces`          | Disallows spaces at the end of a line                                                                                                                                 |
| `no-unneeded-ternary`         | Disallows unnecessary ternary conditional statements if they can be simplified                                                                                        |
| `no-var`                      | Disallows use of `var` when declaring variables in favor of `let` and `const`                                                                                         |
| `object-shorthand`            | Allows you to use `{ property }` instead of `{ property: property }` when defining object properties with pre-defined variables                                       |
| `prefer-arrow-callback`       | Enforces use of arrow function for any function expression for which the result would not change                                                                      |
| `prefer-const`                | Enforces use of `const` when no modification is detected                                                                                                              |
| `prefer-template`             | Changes any string concatenation to a template literal                                                                                                                |
| `quotes`                      | Changes all quotes to back-ticks except in import statements                                                                                                          |
| `react-hooks/exhaustive-deps` | Automatically sets dependencies for the `useEffect()` hook                                                                                                            |
| `react-hooks/rules-of-hooks`  | Enforces react hooks rules                                                                                                                                            |
| `semi`                        | Gets rid of unnecessary semicolons                                                                                                                                    |
| `spaced-comment`              | Enforces a whitespace character at the beginning of all comments                                                                                                      |
| `template-curly-spacing`      | Prevents spaces in template literal breakouts                                                                                                                         |
| `yoda`                        | Forces literals to come after variable when comparing them                                                                                                            |
