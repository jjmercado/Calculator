let buttonText = ["C", "()", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "+/-", "0", ",", "="];

function createCalcButtons(buttonArray) 
{
    buttonArray.forEach(element => {
        let button = document.createElement("button");
        let div = document.getElementsByClassName("buttonContainer");
        button.textContent = element;

        div[0].appendChild(button);
    });
}

createCalcButtons(buttonText);