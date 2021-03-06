import mal_types as types
import reader
import printer


# String functions
def pr_str(*args):
    return " ".join(map(lambda exp: printer.pr_str(exp, True), args))

def do_str(*args):
    return "".join(map(lambda exp: printer.pr_str(exp, False), args))

def prn(*args):
    print(" ".join(map(lambda exp: printer.pr_str(exp, True), args)))

def println(*args):
    print(" ".join(map(lambda exp: printer.pr_str(exp, False), args)))

# Atom functions
def reset_BANG(atm, val):
    atm.val = val
    return atm.val
def swap_BANG(atm, f, *args):
    if type(f) == types.Function:
        atm.val = f.apply([atm.val] + list(args))
    else:
        atm.val = f(atm.val, *args)
    return atm.val

ns = {
        '=': types.equal_Q,

        'pr-str': pr_str,
        'str': do_str,
        'prn': prn,
        'println': println,
        'read-string': reader.read_str,
        'slurp': lambda f: open(f).read(),

        '<':  lambda a,b: a<b,
        '<=': lambda a,b: a<=b,
        '>':  lambda a,b: a>b,
        '>=': lambda a,b: a>=b,
        '+':  lambda a,b: a+b,
        '-':  lambda a,b: a-b,
        '*':  lambda a,b: a*b,
        '/':  lambda a,b: int(a/b),

        'list':   lambda *a: list(a),
        'list?':  lambda a: type(a) == list,

        'empty?': lambda a: True if len(a) == 0 else False,
        'count':  lambda a: 0 if a is None else len(a),

        'atom': lambda v: types.Atom(v),
        'atom?': lambda a: type(a) == types.Atom,
        'deref': lambda a: a.val,
        'reset!': reset_BANG,
        'swap!': swap_BANG,
    }
