import React from 'react';
import Button from '../common/Button';
import useLogin from './hook/useLogin';

function LoginForm() {
  const { user, handleChange, handleSubmit } = useLogin();

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <a href="">Have an account?</a>
            </p>

            <ul className="error-messages">
              {/*<span>{state.isValid ? '' : `${state.error}`}</span>*/}
            </ul>

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </fieldset>
              <Button className="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
