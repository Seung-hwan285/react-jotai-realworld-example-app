import React from 'react';
import Button from '../common/Button';
import useRegister from './hook/register';

function RegisterForm() {
  const { user, handleChange, handleSubmit } = useRegister();

  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <a href="">Have an account?</a>
              </p>

              <ul className="error-messages">
                {/*<span>{state.isValid ? '' : `${state.error}`}</span>*/}
              </ul>

              <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                  <input
                    type="text"
                    name="username"
                    className="form-control form-control-lg"
                    placeholder="UserName"
                    value={user.username}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    name="email"
                    placeholder="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    name="password"
                    placeholder="Password"
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
    </>
  );
}
export default RegisterForm;
