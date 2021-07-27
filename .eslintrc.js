module.exports = {
  "parser": "@babel/eslint-parser",
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "eqeqeq": ["warn", "always"],
    "curly": ["error", "all"],
    // Quotes
    "quotes": [
      "error", 
      "single", 
      {"avoidEscape": true, "allowTemplateLiterals": true}
    ],
    "jsx-quotes": "warn",
    // Spacing & Spaces
    "block-spacing": ["warn", "always"],
    "no-irregular-whitespace": "error",
    "no-multi-spaces": "error",
    "no-mixed-spaces-and-tabs": "warn",
    "no-trailing-spaces": [
      "warn", 
      {"ignoreComments": true}
    ],
    "no-whitespace-before-property": "error",
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", "never"],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "spaced-comment": "warn",
    "comma-spacing": ["error", {"before": false, "after": true,}],
    "computed-property-spacing": ["error", "never"],
    "keyword-spacing": ["error", {"before": true}],
    "object-curly-spacing": ["error", "always"],
    "semi-spacing": ["error", {"before": false, "after": true}],
    "arrow-spacing": ["error", {"before": true, "after": true}],
    "rest-spread-spacing": ["error", "never"],
    "template-curly-spacing": ["error", "never"],
  }
}