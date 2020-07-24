import React, {PureComponent} from 'react';

const withLogin = (Component) => {
  class WithLogin extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``
      };

      this._handleEmailChange = this._handleEmailChange.bind(this);
      this._handlePasswordChange = this._handlePasswordChange.bind(this);
    }

    render() {
      const {email, password} = this.state;

      const isDisabled = email.length === 0 || password.length === 0;

      return (
        <Component
          email={email}
          password={password}
          onEmailChange={this._handleEmailChange}
          onPasswordChange={this._handlePasswordChange}
          isDisabled={isDisabled}/>
      );
    }

    _handleEmailChange({target: {value: email}}) {
      this.setState({email});
    }

    _handlePasswordChange({target: {value: password}}) {
      this.setState({password});
    }
  }

  return WithLogin;
};

export default withLogin;
