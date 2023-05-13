// webmoon
// thingamajig to compile lua to javascript just like 🫰
// intended to be used with fetch()
// uses some stuff from https://github.com/fstirlitz/luaparse

const TOKENS = [
    "local", "function", "return", "end",
    "if", "elseif", "else", "then",
    "for", "in", "do"
]

const LUA_BASE = {
    '__add__': function (params) {
        let total = 0
        params.forEach((number) => {
            total += number
        })
        return total
    },
    '__sub__': function (params) {
        let total = params[0].pop()
        params.forEach((number) => {
            total -= number
        })
        return total
    },
    '__mul__': function (params) {
        let total = 0
        params.forEach((number) => {
            total *= number
        })
        return total
    },
    '__div__': function (params) {
        let total = params[0].pop()
        params.forEach((number) => {
            total /= number
        })
        return total
    },
    'print': function (params) {
        params.forEach((paramstring) => {
            console.log(finalString, end=" ")
        })
    },
    'tostring': function (params) {
        
    },
    'tonumber': function (params) {
        
    }
}

export function compile(lua, requirements, method) {
    let jsString = ""
    
    let lines = lua.split("\n")
    for (const line in lines) {
        
    }
    
    if (method == 'string') {
        return jsString
    } else if (method == '') {
        
    } else {
        throw MethodNotGivenError
    }
}

class MethodNotGivenError {
    constructor() {
        this.explanation = "The method of returning was not given"
    }
}
