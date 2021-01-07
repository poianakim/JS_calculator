import React, { useState } from "react";

function Calculator() {
  const [output, setOutput] = useState(0);

  const clearOutput = () => {
    setOutput(0);
  }
  const evaluateValue = () => {
    const operatorReg = /(\+|-|\*|\/){2,}/
    let formula 
    if(output) {
      formula = output
    } else {
      formula = ""
    }
    console.log('formula', formula)
    const opers = formula.match(operatorReg)
    console.log('opers', opers)

    if (opers === null) {
      setOutput(eval(formula))
    } else {
      if (opers[1] !== '-') {
        const fixedFormula = formula.replace(opers[0], opers[1])
        setOutput(eval(fixedFormula))
      } else if (opers[1] === '-'
        && opers[0].length < 3) {
        setOutput(eval(formula))
      } else {
        const excSubstract = formula.replace(opers[0], opers[0][opers.length - 1])
        console.log(excSubstract, formula, opers[0][opers.length - 1])
        setOutput(eval(excSubstract))
      }
    }
  }

  const inputNumber = (e) => {
    const nums = document.getElementById('display')
    const decimal = document.getElementById('decimal')
    const zero = document.getElementById('zero')
    const strNum = nums.value
    // const Operatorwithsubtract = /[\+\*\/]-$/
    // const Operatorwithoutsubtract = /[\+\*\/]&/
    if (output === 0) {
        if (e.target.value === zero.value) {
            setOutput(0)
        } else {
            setOutput(e.target.value)
        }
    } else {
        if (strNum[strNum.length - 1] === decimal.value
            && e.target.value === decimal.value) {
            setOutput(nums.value)
        } else if (nums.value.match(/(\d*\.)/) !== null
            && nums.value.match(/[+/*-]/) === null) {
            decimal.value = null
            setOutput(nums.value + e.target.value)
        }
        else {
            setOutput(nums.value + e.target.value)
        }
    }
}
  return (
    <div id='cal'>
      <div className='row first-row'>
        <input id='display' value={output} readOnly/>
        <input id='clear' type='button' value='AC'
          onClick={clearOutput} />
      </div>
      <div>
        <div className='row'>
          <input type='button' value='1' onClick={inputNumber} id='one' />
          <input type='button' value='2' onClick={inputNumber} id='two' />
          <input type='button' value='3' onClick={inputNumber} id='three' />
          <input type='button' value='+' onClick={inputNumber} id='add' />
        </div>
        <div className='row'>
          <input type='button' value='4' onClick={inputNumber} id='four' />
          <input type='button' value='5' onClick={inputNumber} id='five' />
          <input type='button' value='6' onClick={inputNumber} id='six' />
          <input type='button' value='-' onClick={inputNumber} id='subtract' />
        </div>
        <div className='row'>
          <input type='button' value='7' onClick={inputNumber} id='seven' />
          <input type='button' value='8' onClick={inputNumber} id='eight' />
          <input type='button' value='9' onClick={inputNumber} id='nine' />
          <input type='button' value='*' onClick={inputNumber} id='multiply' />
        </div>
        <div className='row'>
          <input type='button' value='/' onClick={inputNumber} id='divide' />
          <input type='button' value='0' onClick={inputNumber} id='zero' />
          <input type='button' value='.' onClick={inputNumber} id='decimal' />
          <input id='equals' type='button' value='='
          onClick={evaluateValue} />
        </div>
      </div>
    </div>
  )
}

export default Calculator;