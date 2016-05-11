var types = require('./types'),
    rlSync = require('./readline').readlineSync,
    reader = require('./reader'),
    printer = require('./printer')

var ns = {
    '=': types.equal_Q,
    'throw': function(e) { throw new Error(e) },

    'symbol?': function(a) { return a instanceof types.Symbol },

    'pr-str': function() {
        return Array.prototype.map.call(arguments, function(e) {
            return printer.pr_str(e, true)
        }).join(" ")
    },
    'str': function() {
        return Array.prototype.map.call(arguments, function(e) {
            return printer.pr_str(e, false)
        }).join("")
    },
    'prn': function() {
        console.log(Array.prototype.map.call(arguments, function(e) {
            return printer.pr_str(e, true)
        }).join(" "))
        return null
    },
    'println': function() {
        console.log(Array.prototype.map.call(arguments, function(e) {
            return printer.pr_str(e, false)
        }).join(" "))
        return null
    },
    'readline': function(p) { return rlSync(p) },
    'read-string': function(s) {
        return reader.read_str(s)
    },
    'slurp': function(a) {
        return require('fs').readFileSync(a, 'utf-8')
    },

    '<'  : function(a,b){return a<b},
    '<=' : function(a,b){return a<=b},
    '>'  : function(a,b){return a>b},
    '>=' : function(a,b){return a>=b},
    '+'  : function(a,b){return a+b},
    '-'  : function(a,b){return a-b},
    '*'  : function(a,b){return a*b},
    '/'  : function(a,b){return a/b},

    'list': function() { return Array.prototype.slice.call(arguments, 0) },
    'list?': function(a) { return Array.isArray(a) },

    'count': function(a) { return a === null ? 0 : a.length },
    'empty?': function(a) { return a.length === 0 },
    'apply': function(f) {
        var args = Array.prototype.slice.call(arguments, 1, arguments.length-1)
        return f.apply(f, args.concat(arguments[arguments.length-1]))
    },

    'atom': function(a) { return new types.Atom(a) },
    'atom?': function(a) { return a instanceof types.Atom },
    "deref": function(a) { return a.value },
    "reset!": function(a, v) { return a.value = v },
    "swap!": function(a, f) {
        var args = [a.value].concat(Array.prototype.slice.call(arguments, 2))
        return a.value = f.apply(f, args)
    },
}

exports.ns = ns
