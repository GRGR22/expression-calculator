function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {  
    let operator = {'+': 1, '-': 1, '(':0, ')':0, '*':2, '/':2}; 
    let isPairedBrackets = countBrackets (expr);
    function countBrackets (expr) {
        let openBracket = 0;
        let closeBracket = 0;
        for (const key of expr) {  
            console.log(key)          
            if (key == '(') { openBracket++}
            else if (key == ')') { closeBracket++}
        }
        return openBracket == closeBracket
    };
    console.log(isPairedBrackets)
    let exprArr = normalizeString(expr);    
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
        return;
    }
    function normalizeString(str) {
        let newStr = '';
        str = str.replace(/\s/g, '');
        for (i=0; i<str.length; i++) {            
            operator.hasOwnProperty(str[i]) ? newStr+=' '+str[i]+' ' : newStr+=str[i];
            //console.log(newStr);
        }
        return newStr.split(' ');        
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
    try {
        if(isPairedBrackets) throw new Error ("ExpressionError: Brackets must be paired");
        //if(!Number.isFinite(calculate(outArr))) throw new TypeError ("Division by zero.");        
    }
    catch(err) {
        //console.error(err);
        //return err;
    }
    
    return calculate(outArr);
}

module.exports = {
    expressionCalculator
}
//console.log(expressionCalculator("((1 + 2 * 3"))