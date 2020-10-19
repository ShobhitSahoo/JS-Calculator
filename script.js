window.addEventListener("DOMContentLoaded", init);

// All the keys to be used
const numbers = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0'];
const operators = ['/', '*', '-', '+']

// All the function keys
const spec = ['*', '/', '+', '-'];

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
    console.log("Ready");
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
    
    const del = document.createElement('div');
    del.setAttribute('class', 'row')
    btnMaker('C', clrOutput, del);
    btnMaker('Del', backSpace, del);
    main.appendChild(del);

    let row
    let colNums
    numbers.forEach(function(val, index) {
        if (index%3===0){
            row = document.createElement('div');
            row.setAttribute('class', 'row')
            row.setAttribute('role', 'toolbar')
            colNums = document.createElement('div');
            colNums.setAttribute('class', 'btn-group mr-2 col-9')
            colNums.setAttribute('role', 'group')
            colNums.setAttribute('aria-label', 'group1')
            row.appendChild(colNums);
            row.style.margin = '5px 0';
            let colOperator = document.createElement('div');
            colOperator.setAttribute('class', 'btn-group  col')
            colOperator.setAttribute('role', 'group')
            colOperator.setAttribute('aria-label', 'group2')
            let btn = document.createElement('button');
            btn.setAttribute('type', 'button');
            btn.setAttribute('class', 'btn btn-warning')
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
        let btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.style.width = '23%';
        btn.style.lineHeight = '35px';
        btn.style.margin = '1%';
        btn.style.fontSize = '1.8em';
        btn.val = txt;
        btn.textContent = txt;
        btn.addEventListener('click', outputFunc);
        switch (txt) {
            case 'C':
            case "Del":
                btn.setAttribute('class', 'btn btn-danger')
                break;
            case '=':
                btn.setAttribute('class', 'btn btn-success')
                break;
            default:
                btn.setAttribute('class', 'btn')
                break;
        }
        row.appendChild(btn);
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
        eva = spec.includes(char);
        if (eva) {
            dec = false;
        }
        output.value += char;
    }
}