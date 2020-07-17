window.addEventListener("DOMContentLoaded", init);

// All the keys to be used
const keys = ['*', '/', '+', '-', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '.'];

// All the function keys
const spec = ['*', '/', '+', '-'];

function init() {
    console.log("Ready");
    let dec = false;
    let eva = false;

    const container = document.createElement('div');
    container.classList.add('container');
    container.style.maxWidth = '600px';
    container.style.margin = 'auto';
    document.body.appendChild(container);

    const output = document.createElement('input');
    output.setAttribute('type', 'text');
    output.classList.add('output');
    output.style.width = '100%';
    output.style.lineHeight = '50px';
    output.style.fontSize = '3em';
    output.style.textAlign = 'right';
    container.appendChild(output);

    const main = document.createElement('div');
    main.classList.add('main');
    main.style.width = '100%';
    container.appendChild(main);

    keys.forEach(function(val) {
        btnMaker(val, addOutput);
    })

    btnMaker('=', evalOutput);
    btnMaker('<<', backSpace);
    btnMaker('C', clrOutput);

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

    function btnMaker(txt, outputFunc) {
        let btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.style.width = '23%';
        btn.style.lineHeight = '50px';
        btn.style.margin = '1%';
        btn.style.fontSize = '1.8em';
        btn.val = txt;
        btn.textContent = txt;
        btn.addEventListener('click', outputFunc);
        main.appendChild(btn);
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