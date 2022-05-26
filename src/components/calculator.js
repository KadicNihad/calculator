import React, {
    Component
} from "react";

export default class Calculator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            stack: [],
            valid: true,
            znak: [],
            invalidMessage: ''
        }
        this.Calculate = this.Calculate.bind(this)
        this.clear = this.clear.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    validanUnos() {
        let formula = document.getElementById('Formula').value;

        var operacije = ['+', '-', '*', '/','.', ','];
        for (var i = 0; i < formula.length; i++) {
            let char = formula.substring(i,i+1);
            if(isNaN(char)){
                let validChar = false;
                for (let j = 0; j < operacije.length; j++) {
                    if (operacije[j] === char) {
                        validChar = true;
                    break;
                    }
                }
                if(!validChar){
                    return false;
                }
            }
        }
        return true;
    }

    handleChange(e) {

        let formula = document.getElementById('Formula').value;
        
            this.setState({
                stack: [formula],
                invalidMessage:''
            })
    }

    clear (e) {
        e.preventDefault();

        this.setState({
            stack:[],
            invalidMessage:'',
            znak:[]
        })
    }

    Calculate(e) {
        e.preventDefault();

        let formula = document.getElementById('Formula').value;

        if (formula === '') {
            this.setState({
                invalidMessage: 'You did not enter anything',
                stack:[],
                znak:[]
            })
        } else if (!this.validanUnos()){
            this.setState({
                invalidMessage:'Only numbers and aritmetic operator are valid!',
                stack:[],
                znak:[]
            })
        }else {
            for (var i = 0; i < formula.length; i++) {
                  let char = formula.substring(i,i+1);
            
                if (isNaN(char) && char !== ',') {
                    this.state.znak.push(char)
                }
                if (!isNaN(char) && char !== ',') {
                   let broj = char;
                   for(let j = i+1;j<formula.length;j++) {
                        let tempChar = formula[j]
                        if(tempChar === ',') {
                            break;
                        }
                        if (tempChar === '.' || !isNaN(tempChar)) { 
                            broj += tempChar
                            i=j;
                        }
                   }
                   if(broj.indexOf('.') >= 0) {
                       broj = parseFloat(broj);
                   }else {
                       broj = parseInt(broj);
                   }
                   this.state.stack.push(broj);

                } else if (char === ',') {
                    continue;
                } else {
                    let num1 = this.state.stack[this.state.stack.length - 2];
                    let num2 = this.state.stack[this.state.stack.length - 1];
                    let result = null;

                    this.state.stack.splice(this.state.stack.length - 1, 1)
                    this.state.stack.splice(this.state.stack.length - 1, 1)

                    console.log(this.state.stack)

                    if(num1 === undefined || num2 === undefined) {
                        this.setState({invalidMessage:'Something went wrong! Check the number of OPERANDS', stack:[],znak:[]})
                        
                    } else {
                        switch (char) {
                            case '+':
                                result = num2 + num1
                               // console.log('adding' + num1 + '+' + num2);
                                break;
                            case '-':
                                result = num2 - num1
                                //console.log('Substracting' + num1 + '-' + num2);
                                break;
                            case '*':
                                result = num1 * num2
                                //console.log('Multiplaying' + num1 + '*' + num2);
                                break;
                            case '/':
                                result = num2 / num1
                                //console.log('Dividing' + num1 + '/' + num2);
                                break;
                            default:
                                console.log('molimo unesite operatora ')
                        }
                        this.state.stack.push(result)
                        
                        this.state.znak.splice(0, 1)
                    }
                }
            }
            if (this.state.stack.length - 2 === this.state.znak.length) {
                this.setState({
                    stack: [this.state.stack[0] + '         =' + this.state.stack[1]],
                    invalidMessage: '',
                    znak:[]
                })
            } else if (this.state.stack.length ) {
                this.setState({
                    stack: [],
                    invalidMessage: 'Something went wrong! Check the number of Operators!',
                    znak:[]
                })
            } 

        }
    }


    render() {
        return(
            <div>
                <input type='text' placeholder='Enter a operand and operator:  2,6,5.5,4,*,-,+ ' id="Formula" className="numbers" value={[...this.state.stack]} onChange={this.handleChange}/> &nbsp;
                <button type="button" className="btnClear" onClick={this.clear}>Clear</button>&nbsp;
                <button type="button" className="btnCalc" onClick={this.Calculate}>Compute</button> 
                <h3 style={{color:'red'}}>{this.state.invalidMessage}</h3>
            </div>
        )
      }
}