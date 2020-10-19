window.addEventListener("DOMContentLoaded", init);

// All the keys to be used
const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0'];
// All the function keys
const operators = ['/', '*', '-', '+']

function outputDoc() {
    const output = document.createElement('input');
    output.setAttribute('type', 'text');
    output.setAttribute('class', 'form-control')
    output.classList.add('output');
    output.style.width = '100%';
    output.style.lineHeight = '40px';
    output.style.fontSize = '3em';
    output.style.textAlign = 'right';
    return output
}

function init() {
    let dec = false;
    let eva = false;

    const container = document.createElement('div');
    container.classList.add('container');
    container.style.maxWidth = '600px';
    container.style.margin = 'auto';
    document.body.appendChild(container);

    const output = outputDoc()
    container.appendChild(output);

    const main = document.createElement('div');
    main.setAttribute('class', 'container')
    container.appendChild(main);
    
    const conRow = document.createElement('div');
    conRow.setAttribute('class', 'row')
    const conCol = colClass('col')
    const conCol2 = colClass('col')
    btnMaker('C', clrOutput, conCol);
    btnMaker('Del', backSpace, conCol2);
    conRow.appendChild(conCol);
    conRow.appendChild(conCol2);
    main.appendChild(conRow);

    let row
    let colNums
    numbers.forEach(function(val, index) {
        if (index%3===0){
            row = rowClass()
            colNums = colClass('col-9', 'group1')
            row.appendChild(colNums);
            row.style.margin = '5px 0';
            let colOperator = colClass('col', 'group2')
            let btn = buttonClass('btn-warning')
            btn.val = operators[index/3];
            btn.textContent = operators[index/3];
            btn.addEventListener('click', addOutput);
            colOperator.appendChild(btn);
            row.appendChild(colOperator);
            main.appendChild(row);
        }
        btnMaker(val, addOutput, colNums);
        if(index===numbers.length-1){
            btnMaker('=', evalOutput, colNums);
        }
    })

    function evalOutput() {
        output.style.border = '2px solid black';
        if (output.value === "") {
            output.style.border = '2px solid red';
        } else if (eva) {
            output.style.border = '2px solid red';
        } else {
            output.value = eval(output.value);
        }
        dec = output.value.includes('.');
    }

    function clrOutput() {
        output.style.border = '2px solid black';
        output.value = "";
        dec = false;
        eva = false;
    }

    function backSpace() {
        let a = output.value;
        if (a !== "") {
            a = a.slice(0, a.length - 1);
        }
        output.value = a;
        if (!a.includes('.')) {
            dec = false;
            eva = false;
        }
    }

    function btnMaker(txt, outputFunc, row) {
        let btn = buttonClass(btnColorSelector(txt))
        btn.style.width = '23%';
        btn.style.lineHeight = '35px';
        btn.style.margin = '1%';
        btn.style.fontSize = '1.8em';
        btn.val = txt;
        btn.textContent = txt;
        btn.addEventListener('click', outputFunc);
        row.appendChild(btn);
    }

    function btnColorSelector(txt) {
        let color = ""
        switch (txt) {
            case 'C':
            case "Del":
                color = 'btn-danger'
                break;
            case '=':
                color = 'btn-success'
                break;
            default:
                break;
        }
        return color
    }

    function addOutput(e) {
        // Do Something
        output.style.border = '2px solid black';
        //console.log(e.target.val);
        let char = e.target.val;
        if (char === '.') {
            if (dec) {
                char = '';
                output.style.border = '2px solid red';
            } else {
                dec = true;
            }
        }
        eva = operators.includes(char);
        if (eva) {
            dec = false;
        }
        output.value += char;
    }
}