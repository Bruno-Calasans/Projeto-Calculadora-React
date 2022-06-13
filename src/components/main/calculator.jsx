/* eslint-disable no-eval */

    import { Component } from "react";
    import { Display } from "../display/display";
    import { Button } from "../button/button";
    import './calculator.css'

    const defaultState = {
        expression: '0',
        result: '0',
    }
    const opChars = ['+', '-', '*', '/']
  
    export class Calculator extends Component {

        state = {
            expression: '0',
            result: '0',
        }

        updateExpression = (content) => {
            this.setState({...this.state, expression: content})
        }

        clearLast = () => {

            let {expression} = this.state

            // se tiver apenas um caractere
            if(expression.length === 1) {
                this.clearAll()

            }else{
                let newDisplay = expression
                    .slice(0, expression.length - 1)
                this.updateExpression(newDisplay)
            }
            
        }

        clearAll = () => {this.setState({...defaultState})}

        insertChar = (char) => {

            let {expression} = this.state

            let lastChar = expression.charAt(expression.length - 1)
            let lastTerm = expression.match(/[\d.()]+/gi).pop() 

            //se for um caractere de operação
            if(opChars.includes(char)) {

                if (lastChar === '(') { return }

                // se o último char for um caractere de operação ou ponto
                if(opChars.includes(lastChar) || lastChar === '.') {
                    let newExpression = expression
                        .replace(/(.+)(.)/gi, `$1${char}`)

                    this.updateExpression(newExpression)

                    
                // caso seja um número
                } 
                else {this.updateExpression(expression + char) }
            }

            // ponto
            else if(char === '.'){

                // se o último termo for um caractere de operação
                if (opChars.includes(lastChar)) { return }

                // se já tiver um ponto
                if (lastChar === char) { return }

                // se tiver ujm parânteses
                if (lastChar === '(' || lastChar === ')') { return }

                // outros casos
                this.updateExpression(expression + char)
            }

            // parênteses
            else if (char === '(' || char === ')'){

                let abertos = expression.match(/\(/gi) ?? []
                let fechados = expression.match(/\)/gi) ?? []

                // caso seja a primeira expressão
                if(expression === defaultState.expression) { expression = ''}

                // se o último char for um ponto
                if (lastChar === '.') { return }

                // se o último termo já tiver um parânteses
                //if (lastTerm.includes(char)) { return }

                if (char === ')') {

                    // se a quantidade de abertos for menor que a de fechados
                    if (fechados.length === abertos.length ) { return }

                    // se o último caractere for um de operação
                    if (opChars.includes(lastChar)) { return }

                    // se o último caractere tiver parânteses aberto
                    if (lastChar === '(') { return }

                    // se não tiver nenhum parânteses aberto
                    //if (!lastTerm.includes('(')) { return }
                }

                if (char === '(') {

                    // se o último caractere for um número
                    if (lastChar.match(/\d/) && expression !== ''){ 
                        expression += '*'
                    }
                }

                this.updateExpression(expression + char)
            }

            // se for um número
            else {

                // se o char inicial for igual à expressão padrão
                if(lastTerm === defaultState.expression && char === defaultState.expression) { return }

                // caso o último caractere seja um parânteses fechado
                if (lastChar === ')') { expression += '*' }

                // tirar o valor padrão na primeira vez
                if(expression === defaultState.expression) { expression = ''}

                this.updateExpression(expression + char)
            }
        }

        showResult = () => {

            let {expression} = this.state

            // removendos operadores e pontos do final -------------------------
            expression = expression.replace(/^(.+)([+\-*/])$/, `$1`)

            // removendo prânteses ---------------------------------------------
            let abertos = expression.match(/\(/gi) ?? []
            let fechados = expression.match(/\)/gi) ?? []
            
            // se tiver apenas parânteses abertos
            if (abertos.length > 0 && fechados.length === 0) { 
                expression = expression.replace(/\(/gi, '')
            }

            // se tiver mais parânteses abertos que fechados
            else if (abertos.length > fechados.length) {

                let diferenca = abertos.length - fechados.length
                
                for(let cont = 1; cont <= diferenca; cont++) {
                    expression = expression.replace('(', '')
                }
            }

            // resultado em si
            let result = eval(expression)

            // arredondadno números decimais -----------------------------------
            if(String(result).match(/\d+\.\d+/gi)) result = result.toFixed(2)

            this.setState({...this.state, expression, result})
        }
 
        render () {

            let {expression, result} = this.state

            return (
                
                <div className='calculator'>
                    
                <Display 
                expression={expression} 
                result={result}
                />

                <Button label='AC' action={this.clearAll} />
                <Button simb='backspace' action={this.clearLast} />
                <Button label='.' action={this.insertChar} />
                <Button label='+' action={this.insertChar} operation />

                <Button label='1' action={this.insertChar} />
                <Button label='2' action={this.insertChar} />
                <Button label='3' action={this.insertChar} />
                <Button label='-' action={this.insertChar} operation />
 
                <Button label='4' action={this.insertChar} />
                <Button label='5' action={this.insertChar} />
                <Button label='6' action={this.insertChar} />
                <Button label='*' action={this.insertChar} operation />

                <Button label='7' action={this.insertChar} />
                <Button label='8' action={this.insertChar} />
                <Button label='9' action={this.insertChar} />
                <Button label='/' action={this.insertChar} operation />

                <Button label='0' action={this.insertChar} />
                <Button label='(' action={this.insertChar} />
                <Button label=')' action={this.insertChar} />
                <Button simb='=' action={this.showResult} operation />
                
                </div>
            )
        }

    }