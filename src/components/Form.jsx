import React,{Component} from 'react'
import { connect } from 'react-redux';
import InputComponent from './Input';
import {setFormResult} from '../actions/formAction';
// scss
import './Form.scss';
import { UserResult } from './UserResult';
class FormComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            formItems:this.props.formItems,
        }
    }
    handleValidation = () => {
        var isValid =  false;
        var {formItems} = this.state;
        formItems.map( (item,index) =>{
            if((item.value === 0 || item.value === '') && item.required){
                let arr = [...formItems]
                arr[index]["errorText"] = `${item.name} is Required`
                this.setState({
                    formItems:arr
                })
                isValid = false
            }else if(item.name === "email" && item.required){
                const re = /.+@.+\.[A-Za-z]+$/;
                if(!re.test(item.value)){
                    isValid = false;
                    let arr = [...formItems]
                    arr[index]["errorText"] = `Email is not valid`
                    this.setState({
                        formItems:arr
                    })
                }
            }
            else if(item.name === "age"){
                if(parseFloat(item.value) > 99){
                    isValid = false;
                    let arr = [...formItems]
                    arr[index]["errorText"] = `You are too old! Max allowed age 99`
                    this.setState({
                        formItems:arr
                    })
                }
            }
            else{
                isValid = true
            }
            return null;
        })
        return isValid
    }
    // sets base Focus
    handleFocusOnLoad = () => {
        var {formItems} = this.state;
        let focArr = [...formItems]
        formItems.map( (item,index) => {
            if(item.value !== '' ){
                focArr[index]["classes"] = "in-focus";
            }
            return null;
        })
        this.setState({
            formItems:focArr
        })
    }

    handleChange = index => e => {
        var {formItems} = this.state;
        let newArr = [...formItems]
        newArr[index]["value"] = e.target.value
        newArr[index]["errorText"] = ''
        this.setState({
            formItems:newArr
        })
    }

    // blur Focus
    handleFocus = index => () => {
        var {formItems} = this.state;
        let onFoc = [...formItems]
        onFoc[index]["classes"] = "in-focus"
        this.setState({
            formItems:onFoc
        })
    }

    // blur handler
    handleBlur = index => () => {
        var {formItems} = this.state;
        let onBlur = [...formItems]
        if(onBlur[index]["value"] !== ''){
            onBlur[index]["classes"] = "in-focus"
            this.setState({
                formItems:onBlur
            })
        }else{
            onBlur[index]["classes"] = ""
            this.setState({
                formItems:onBlur
            })
        }
        
    }

    //onReset
    handleReset = () => {
        const  {formItems} = this.state;
        // console.log(e.target)
        let clearArr = [...formItems]
        clearArr.map(item => {
            if(item.value !== ''){
                item.value = ''
                item.classes = ''
            }
        })
        this.setState({
            formItems:clearArr
        })
        // this.formRef.reset();
        // e.target.getElementsByTagName('input').value = '';
        // e.target.reset()

    }
    
    // onSubmit
    hadleSubmit = (e) => {
        e.preventDefault();
        if(this.handleValidation()){
            let submitResult = {};
            for(var i = 0; i < this.state.formItems.length; i++){
                submitResult[this.state.formItems[i].name] = this.state.formItems[i].value;
            }
            this.props.setFormResult(submitResult)
            setTimeout(()=>{
                this.handleReset()
            },100)
        }
        
    }

    componentDidMount(){
        this.handleFocusOnLoad(); // handle focus state
    }
    render(){
        return (
            <>
                <form className="form" ref={(el) => this.formRef = el} onSubmit={this.hadleSubmit} noValidate onReset={this.handleReset}>
                    {this.state.formItems.map( (formItem,index) => (
                        <InputComponent {...formItem} key={formItem.id} handleChange={this.handleChange(index)} handleFocus={this.handleFocus(index)} handleBlur={this.handleBlur(index)}/>
                    ))}
                    <button type="reset" className="form--submit reset">Reset</button>
                    <button type="submit" className="form--submit">Submit</button>
                    <div className="clearfix"></div>
                </form>
                <section className="result_wrapper">
                    <h2>Submissions</h2>
                    {this.props.formResults.length ? <UserResult results={this.props.formResults}></UserResult>:<span>No Submission Yet!</span>}
                </section>
            </>
        )
    }
}

const mapStateToProps = ({globalStore}) => {
    return ({
        ...globalStore
    })
}

export default connect(mapStateToProps,{setFormResult})(FormComponent)
