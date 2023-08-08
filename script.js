let buttonNumbers = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", ".", "0", "=", "+"];
let deleteButtons = ["AC", "C"];
let operands = ["*", "/", "-", "+", "."];
let didCalculation = false;
let output = document.getElementById("output");
let buttons = document.getElementsByClassName("numberButtons");
let delButtons = document.getElementsByClassName("deleteButtons");


window.addEventListener("keydown", addNumber);

window.addEventListener("keydown", (e) =>
{
    buttons = Array.from(buttons);
    delButtons = Array.from(delButtons);

    buttons.forEach(element => 
    {
        if (element.value === e.key || element.value === "=" && e.key === "Enter") 
        {
            element.classList.add("keyDown");
        }
    });

    delButtons.forEach(element =>
    {
        if (element.value === "AC" && e.key === "Backspace" || element.value === "C" && e.key === "Delete") 
        {
            element.classList.add("keyDownDelBut");
        }
    });
})

window.addEventListener("keyup", () =>
{
    buttons = Array.from(buttons);
    delButtons = Array.from(delButtons);

    buttons.forEach(element => 
    {
        element.classList.remove("keyDown");
    });

    delButtons.forEach(element =>
        {
            element.classList.remove("keyDownDelBut");
        });
})

function createCalcButtons(buttonArray, deleteButtons) 
{
    deleteButtons.forEach(element => {
        let button = document.createElement("button");
        let div = document.getElementsByClassName("buttonContainer");
        button.textContent = element;
        button.value = element;

        button.className = "deleteButtons";
        
        div[0].appendChild(button);
    })
    
    buttonArray.forEach(element => {
        let button = document.createElement("button");
        let div = document.getElementsByClassName("buttonContainer");
        button.textContent = element;
        button.value = element;
        button.classList = "numberButtons";

        button.addEventListener("click", addNumber);

        div[0].appendChild(button);
    });

    delButtons[0].addEventListener("click", clearOutput);
    delButtons[1].addEventListener("click", clearSingleValue);
}

function clearSingleValue() 
{  
    var newTextContent = output.textContent.substring(0, output.textContent.length - 1);
    
    output.textContent = newTextContent;

    if (output.textContent === "") 
    {
        output.textContent = "0";
    }
}

function checkCalculation(button, key) 
{
    let lastCharacter = document.getElementById("output").textContent[document.getElementById("output").textContent.length - 1];

    if (output.textContent === "0" && buttonNumbers.includes(key) || output.textContent === "0" && buttonNumbers.includes(button.value)) 
    {
        output.textContent = "";    
    }

    if(button.value === "=" || key === "Enter")   
    {
        calculation(); 
    } 
    else if(button.value === "C" || key === "Backspace")
    {
        clearSingleValue();
    }
    else if(button.value === "AC" || key === "Delete")
    {
        clearOutput();
    }
    else 
    { 
        if (buttonNumbers.includes(key)) 
        {
            if (!operands.includes(lastCharacter) && key !== undefined || !operands.includes(key) && key !== undefined)
            {
                output.textContent += key;
            }
        }
        else
        {
            if (!operands.includes(lastCharacter) && button.value !== undefined || !operands.includes(button.value) && button.value !== undefined) 
            {
                output.textContent += button.value;
            }
        }
    }    
}

function addNumber(e) 
{
    let button = e.target;
    let key = e.key;

    if (output.textContent === "0" && operands.includes(button.value) ||
        output.textContent === "0" && operands.includes(key)) 
    {
        return;
    }
    else
    {
        if (didCalculation) 
        {
            checkCalculation(button, key);
            didCalculation = false;   
        }
        else
        {             
            checkCalculation(button, key);
        }
    }
}

function clearOutput() 
{
    document.getElementById("output").textContent = "0";    
}

function calculation()
  {
    let text = document.querySelector("p").textContent; 
    let tempText = "";
    let newText = [];
    let op = ["+", "-", "/", "*"];
    let numb = 0;

    if(text === "0")
    {
      text = "0";
    }
    else
    {
      for(let i = 0; i < text.length; i++)
      {
        if(op.includes(text[i]))
          {
            tempText += "@"+text[i]+"@";
          }
          else
          {
            tempText += text[i];
          }
      }
      newText = tempText.split('@', text.length);

      let i = 0;
      while(i < newText.length)
      {
        if(newText[i] === op[0])
        {
          let first = +newText.splice(i - 1, 1);
          newText.splice(i - 1, 1);
          let second = +newText.splice(i - 1, 1);
          numb = first + second;
          newText.unshift(numb.toString());
          i = 0;
        }
        else if(newText[i] === "-")
        {
          let first = +newText.splice(i - 1, 1);
          newText.splice(i - 1, 1);
          let second = +newText.splice(i - 1, 1);
          numb = first - second;
          newText.unshift(numb.toString());
          i = 0;
        }
        else if(newText[i] === "*")
        {
          let first = +newText.splice(i - 1, 1);
          newText.splice(i - 1, 1);
          let second = +newText.splice(i - 1, 1);
          numb = first * second;
          newText.unshift(numb.toString());
          i = 0;
        }
        else if(newText[i] === "/")
        {
          let first = +newText.splice(i - 1, 1);
          newText.splice(i - 1, 1);
          let second = +newText.splice(i - 1, 1);
          numb = first / second;
          newText.unshift(numb.toString());
          i = 0;
        }
        else
        {
          i++;
        }
      }
    }
    didCalculation = true;
    console.log(newText);
    newText = [];
    tempText = "";
    output.textContent = numb.toString();
  }

createCalcButtons(buttonNumbers, deleteButtons);