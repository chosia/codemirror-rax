/* Simple Rax mode for codemirror editor
 */
(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../../addon/mode/simple"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../../addon/mode/simple"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineSimpleMode("rax", {
  start: [
    {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
    {regex: /project|select|fold|import|`export|attach|`persist|`print|`log/, token: "keyword"},
    {regex: /\/(sum|average|mean|count|min|max|stddev)/, token: "keyword"},
    {regex: /true|false/, token: "atom"},
    {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i, token: "number"},
    {regex: /\/\/.*/, token: "comment"},
    {regex: /[-+\/*<>!]/, token: "operator"}, // single-character operators
    {regex: /[<>=:]=|>>|<</, token: "operator"}, // double-character operators
    {regex: /@[&\?]@|@!?\?|@\\\/|@\/\\|@\|-/, token: "operator"}, // temporal operators
    {regex: /[\{\}\[\]\(\)]/, token: "bracket"},
    {regex: /[\{\[\(]/, indent: true},
    {regex: /[\}\]\)]/, dedent: true},
    {regex: /[a-z$][\w$]*/, token: "variable-2"},
    {regex: /%(help|csv|epsilon|digits|raxpath|include|logfile|missing|order|outfile|remove|sql|symtab|time|tree|warn)/, token: "tag"},
    {regex: /%sql $ "/, token: "meta", mode: {spec: "sql", end: /"/}}
  ],
  meta: {
    lineComment: "//"
  }
});

CodeMirror.defineMIME("text/x-rax", "rax");
});
