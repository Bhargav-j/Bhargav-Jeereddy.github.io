const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

let input = "";

for (let key of keys){
    const value = key.dataset.key;
    key.addEventListener('click', ()=>{
        handlebuttonClick(value);
    })
}

document.addEventListener('keydown', (event) => {
    const keyboard_item = event.key;
    if (/[0-9=\/+*%().\-]/.test(keyboard_item)) {
        const key_item = keyboard_item;
        handlebuttonClick(key_item);
    } else if (keyboard_item == "Enter"){
        handlebuttonClick("=");
    } else if (keyboard_item == "Backspace"){
        handlebuttonClick("<");
    } else if (keyboard_item == "Delete"){
        handlebuttonClick("clear");
    }
    event.preventDefault();
})

function handlebuttonClick(value){
    if (value == "clear"){
        input = "";
        display_input.innerHTML = "";
        display_output.innerHTML = "";
    } else if (value == "backspace"){
        input = input.slice(0, -1);
        display_input.innerHTML = Cleaninput(input);
    } else if (value == "="){
        let result = eval(prepareInput(input));

        display_output.innerHTML = Cleanoutput(result);
    } else if (value == "brackets"){
        if  (
            input.indexOf("(") == -1 ||   /*no starting bracket at all till now or */
            input.indexOf("(") != -1 && 
            input.indexOf(")") != -1  &&      /* if we have starting bracket and ending bracket*/
            input.lastIndexOf("(") < input.lastIndexOf(")")){       /* if lastindexof starting bracket is greater than lastinddexof closing bracket*/
            input += "(";
        } else if (
            input.indexOf("(") != -1 && 
            input.indexOf(")") == -1 ||
            input.indexOf("(") != -1 && 
            input.indexOf(")") != -1 &&
            input.lastIndexOf("(") > input.lastIndexOf(")")
            ) {
            input += ")";
        }
        display_input.innerHTML = Cleaninput(input);
    } else {
        if (ValidateInput(value)) {
            input += value;
            display_input.innerHTML = Cleaninput(input);
        }
    }
}

function Cleaninput(input){
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for (i = 0; i < input_array_length; i++){
        if (input_array[i] == "*") {
            input_array[i] = ` <span class="operator">X</span> `;
        } else if (input_array[i] == "/") {
            input_array[i] = ` <span class="operator">/</span> `;
        } else if (input_array[i] == "-") {
            input_array[i] = ` <span class="operator">-</span> `;
        } else if (input_array[i] == "+") {
            input_array[i] = ` <span class="operator">+</span> `;
        } else if (input_array[i] == "(") {
            input_array[i] = ` <span class="brackets">(</span> `;
        } else if (input_array[i] == ")") {
            input_array[i] = ` <span class="brackets">)</span> `;
        } else if (input_array[i] == "%") {
            input_array[i] = ` <span class="percent">%</span> `;
        }
    }

    return input_array.join("");
}

function Cleanoutput(output){
    let output_string = output.toString();   
    let decimal = output_string.split(".")[1];
    let before_deciaml = output_string.split(".")[0];

    let output_array = before_deciaml.split("");

    if (output_array.length > 3){
        for (let i = output_array.length-3; i > 0; i -= 3){
            output_array.splice(i,0, ",");
        }
    }

    if (decimal){
        output_array.push(".");
        output_array.push(decimal);
    }

    return output_array.join("");
}

function ValidateInput(value){
    let last_input = input.slice(-1);
    let operators = ['+', '-', '*', '/', '%'];

    if (value == "." && last_input == "."){
        return false;
    }

    if (value == ".") {
        if (operators.some(value => input.includes(value))){
            var last_dot = input.lastIndexOf(".");
            for (let i = input.length-1; i>0 ; i--){
                if (operators.includes(input[i])){
                    var last_operator = i;
                    break;
                }
            }
            if (last_dot > last_operator){
                return false;
            } else {
                return true;
            }

        } else if (input.includes(value)){
            return false;
        } else {
            return true;
        }
    }

    if (operators.includes(value)){
        if (operators.includes(last_input)){
            return false;
        } else {
            return true;
        }
    }

    return true;
}

function prepareInput(input) {
    let input_array = input.split("");

    for (let i = 0; i < input_array.length; i++){
        if (input_array[i] == "%"){
            input_array[i] = "/100";
        }
    }

    return input_array.join("");
}