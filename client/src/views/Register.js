import React,{useState} from 'react';
// import './LoginRegister.css';
import './Login.css'
// import Button from '../components/Button';
// import Input from '../components/Input';
import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


function Register() {
  const [isMainSelected, setIsMainSelected] = useState(true);
    const [type, setType] = useState('User');

    function FilteredMenu(menu){
        setType(menu);
    }

    function IsMainSelected(){
        setIsMainSelected(!isMainSelected);
        if (isMainSelected === false) {
          FilteredMenu('General User');
        } else {
          FilteredMenu('Server Provider');
        }
    }
    
    const [contact, setContact] = useState({
      fName:'',
      lName:'',
      email: '',
      password: '',
      confirmPass:'',
      fNameError: '',
      lNameError: '',
      emailError: '',
      passwordError: '',
      confirmPassError: '',
      role:'general'
    })

    // validatefName = () => {
    //     const { fName } = this.state;
    //     this.setState({
    //         fNameError:
    //         fName.length > 3 ? null : 'Email must be longer than 3 characters'
    //     });
    // }

    // add this in the submit button
    const handleRegister = ()=>{
      fetch('http://localhost:8080/register', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body : JSON.stringify({
              role:contact.role,
          })
          })
      
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => {
          console.log("Error:" + err)
      })
    }
    const handleChange = (event)=>{
      const {name, value} = event.target
      setContact ((preValue)=>{  
      return {
      ...preValue,
      [name]: value
      }
      })
    }

  return (
    <form className='form-div' action="http://localhost:8080/register" method="post">
      <h1 className="login-title">Register</h1>
      {/* User input */}
      {/* <div className='login-in-line-name'>
        <label/> First Name 
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
        <label/> Last Name
      </div> */}
      <div className='login-in-line'>
        {/* <label className='login-label'/>First Name  */}
        <input
          required={true}
          name='fName'
          className={`form-control login-input 'is-invalid' : ''}`}
          id='fName'
          placeholder= 'First Name'
        />
        {/* <label className='login-label'/>Last Name  */}
        <input
          required={true}
          name='lName'
          className={`form-control login-input 'is-invalid' : ''}`}
          id='lName'
          placeholder= 'Last Name'
        />
      </div>
      <input
        required={true}
        name='email'
        className={`form-control login-input 'is-invalid' : ''}`}
        id='email'
        placeholder= 'you@example.com'
      />
      <input
        required={true}
        type="password"
        name='password'
        className={`form-control  login-input 'is-invalid' : ''}`}
        id='password'
        placeholder='Password'
      />
      <input
        required={true}
        type="password"
        name='confirmPass'
        className={`form-control  login-input 'is-invalid' : ''}`}
        id='confirmPass'
        placeholder='Confirm Password'
      />
      {/* Radio button selection */}
      <div className="login-in-line">
        <Form.Field
        label='General User'
        control='input'
        type='radio'
        name='role'
        onChange={handleChange}
        checked={contact.role=='General User'}
        value='General User'
        />
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  
        <Form.Field
          label='Server Provider'
          control='input'
          type='radio'
          name='role'
          onChange={handleChange}
          checked={contact.role=='Server Provider'}
          value='Server Provider'
        />
      </div>
      <button onSubmit={handleRegister} className='login-button' type='submit'>submit</button>
      {/* Footer section */}
      <div className='footer-div' > 
        <a className="underlineHover aFooter" href="#">Already have account</a>
      </div>
        <a className="underlineHover aFooter bk-option" href="/">BACK</a>
    </form>
  );
}

export default Register;