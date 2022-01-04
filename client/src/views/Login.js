import React from 'react';
import './Login.css';

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          passwordError: '',
          emailError: ''
        };
    }

    handlePasswordChange = event => {
      this.setState({ password: event.target.value }, () => {
          this.validatePassword();
      });
    };

    handleEmailChange = event => {
      this.setState({ email: event.target.value }, () => {
        this.validateEmail();
        
      });
    };

    //Chcks email to contain @ for live validation
    validateEmail = () => {
      let emailError = "";
      const { email } = this.state;

      if (!this.state.email.includes("@")) {
        emailError = "Invalid Email: Missing '@'";
      }else{
        this.setState({
          emailError:
          email.includes("@") ? null: 'invalid email'
        });
      }  
      if (!this.state.email.includes(".com")) {
        emailError = "Invalid Email: Missing '.com'";
      }else{
        this.setState({
          emailError:
          email.includes(".com") ? null: 'invalid email'
        });
      }
      if (!this.state.email) {
        emailError = "Email cannot be left blank"
      }
      if (emailError){
        this.setState({emailError});
        return false;
      }
      return true;
    }

    validatePassword = () => {
      let passwordError = "";

      const { password } = this.state;
      
      if (!this.state.password){
        passwordError = "Password cannot be left blank"
      }
      {
        this.setState({
          passwordError:
          password.length >= 8 ? null : 'Password must be longer than or equal to 8 characters'
        });
      }
      if (passwordError){
        this.setState({passwordError});
        return false;
      }
      return true;
    }
    //form input and errors are cleared after submitting
    handleSubmit = event => {
      event.preventDefault();
      const isValid = this.validateEmail();
      this.validateEmail();
      if (isValid){
        const { emailError, passwordError } = "";

        this.setState({emailError, passwordError})
      }
    };

    render() {
        return (
          <form className='form-div' action="http://localhost:8080/login" method="post">
                <h1 className="login-title">Login</h1>
                {/* Email section */}
                <input
                  required={true}
                  name='email'
                  className={`form-control login-input ${this.state.emailError ? 'is-invalid' : ''}`}
                  id='email'
                  placeholder= 'you@example.com'
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  onBlur={this.validateEmail}
                />
                <div className='invalid-feedback '>{this.state.emailError}</div>
                  {/* Password section */}
                <input
                  required={true}
                  type="password"
                  name='password'
                  className={`form-control  login-input ${this.state.passwordError ? 'is-invalid' : ''}`}
                  id='password'
                  placeholder='Password'
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  onBlur={this.validatePassword}
                />
                <div className='invalid-feedback'>{this.state.passwordError}</div>
                <button onSubmit={this.handleSubmit} className='login-button' type='submit'>submit</button>
                
                {/* Footer section */}
                <div className='footer-div' > 
                <a className="underlineHover aFooter" href="#">Forgot Password?</a>
                &nbsp;&nbsp;&nbsp;   
                <a className="underlineHover aFooter" href="/Register">Don't have account?</a>
                </div>
                <a className="underlineHover aFooter bk-option" href="/">BACK</a>

            </form>
        );
    }
}
