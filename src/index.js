function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let exprArr = expr[0] == ' ' ? expr.split(' ') : expr.split('');
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
        console.log(outArr, operStack) ;     
    }
    if (operStack.length>0) {
        for (let index = 0; index <= operStack.length; index++) {
            outArr.push(operStack.pop());            
        }
    } 

    function sortOperStack (arg) {
        if (arg == "(") {
            operStack.push(arg);
        } else if (arg == ")") {
            for (let index = operStack.length-1; index >= 0; index--) {
                let remove = operStack.pop();
                if (remove !="(") {
                    outArr.push(remove)
                } else break;            
            }
        } else if (operStack.length==0 || operator[operStack[operStack.length-1]] < operator[arg]) {            
            operStack.push(arg);
        } else if (operator[operStack[operStack.length-1]] >= operator[arg]) {
            for (let index = operStack.length-1; index >= 0; index--) {
                if (operator[operStack[index]] >= operator[arg]) {
                    outArr.push(operStack.pop());
                } else break;           
            }
            operStack.push(arg); 
        }
        console.log('sortOperStack'+ outArr, operStack) ;
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
        }
        return res;
    }
    console.log (outArr, operStack) 
    return calculate(outArr);
}

module.exports = {
    expressionCalculator
}
//console.log(expressionCalculator(" 31 * 21 + 14 / (  (  18 * 52 / (  43 - 74 / 89 - 12  ) + 8  ) + 3 / 0 + (  9 + 81 + 19 * 94 / (  0 * 71 + 53 - 20 * 94  )  )  ) "))