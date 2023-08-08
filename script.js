let buttonNumbers = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", ".", "0", "=", "+"];
let deleteButtons = ["AC", "C"];
let didCalculation = false;
let output = document.getElementById("output");


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
    let delButtons = document.getElementsByClassName("deleteButtons");
    
    buttonArray.forEach(element => {
        let button = document.createElement("button");
        let div = document.getElementsByClassName("buttonContainer");
        button.textContent = element;
        button.value = element;

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
}

function checkCalculation(button) 
{
    let operands = ["*", "/", "-", "+"];
    let lastCharacter = document.getElementById("output").textContent[document.getElementById("output").textContent.length - 1];

    if (output.textContent === "0") 
    {
        output.textContent = "";    
    }

    if(button.value === "=")   
    {
        calculation(); 
    } 
    else if(button.value === "C")
    {
        clearOutput();
    }
    else 
    {
        if (!operands.includes(lastCharacter) || !operands.includes(button.value)) 
        {
            output.textContent += button.value;
        }
    }    
}

function addNumber(e) 
{
    let button = e.target;

    if (output.textContent === "0" && button.value === "*") 
    {
        return;
    }
    else
    {
        if (didCalculation) 
        {
            checkCalculation(button);
            didCalculation = false;   
        }
        else
        {             
            checkCalculation(button);
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
    document.getElementById("output").textContent = numb.toString();
  }

createCalcButtons(buttonNumbers, deleteButtons);