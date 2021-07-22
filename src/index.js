// function eval() {
//     // Do not use eval!!!
//     return;
// }

function expressionCalculator(expr) {
    let exprArr = expr.split(' ');
    let operator = {'+': 1, '-': 1, '(':0, ')':0, '*':2, '/':2};
    let outArr = [];
    let operStack = [];
    console.log(exprArr)
    for (i=0; i<exprArr.length; i++) {
        if (!exprArr[i].length) continue;
        if (!isNaN(exprArr[i])) {
            outArr.push(exprArr[i])
        } else if (operator.hasOwnProperty(exprArr[i])) {
            sortOperStack(exprArr[i])
        }        
    }
    if (operStack.length>0) {
        for (let index = 0; index < operStack.length; index++) {
            outArr.push(operStack.pop());            
        }
    } 

    function sortOperStack (arg) {
        if (arg == ")") {
            for (let index = operStack.length-1; index >= 0; index--) {
                let remove = operStack.pop();
                if (remove !="(") {
                    outArr.push(remove)
                } else break;            
            }
        } else if (operStack.length==0 || operator[operStack[operStack.length-1]] < operator[arg]) {            
            operStack.push(arg);
        } else if (operator[operStack[operStack.length-1]] >= operator[arg]) {
            outArr.push(operStack.pop());
            operStack.push(arg);
        }
        return;
    }

    function calculate(arr) {
        let stack = [];
        let n1, n2, res = 0;
        for(i = 0; i<arr.length; ++i) {
            if(!isNaN(arr[i])) { stack.push(+arr[i]);
            } else { n2 = stack.pop(); 
                     n1 = stack.pop();
                switch(arr[i]) {
                case '+': res = n1 + n2; break;
                case '-': res = n1 - n2; break;
                case '*': res = n1 * n2; break;
                case '/': res = n1 / n2; break;
                }
                stack.push(res);
            } 
                      
        console.log (stack, n1, n2, res)
        }
        return res;
    }
    console.log (outArr, operStack) 
    return calculate(outArr);
}

// module.exports = {
//     expressionCalculator
// }
console.log(expressionCalculator(" 77 + 79 / 25 * (  64 * 63 - 89 * 14  ) * 49 "))