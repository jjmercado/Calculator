let buttonNumbers = ["C", "()", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "+/-", "0", ",", "="];
let didCalculation = false;
let multipleOperants = false;
let id = document.getElementById("output");


function createCalcButtons(buttonArray) 
{
    buttonArray.forEach(element => {
        let button = document.createElement("button");
        let div = document.getElementsByClassName("buttonContainer");
        button.textContent = element;
        button.value = element;

        button.addEventListener("click", addNumber);

        div[0].appendChild(button);
    });
}

function addNumber(e) 
{
    let button = e.target;
    
    if (didCalculation) 
    {
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
            id.textContent += button.value;
            multipleOperants = false;   
        }
        didCalculation = false;   
    }
    else
    {
        if (id.textContent === "0") 
        {
            id.textContent = "";    
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
            id.textContent += button.value;
            multipleOperants = false;   
        }
          
    }
    console.log(id.textContent);
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

createCalcButtons(buttonNumbers);