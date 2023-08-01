import React from 'react';
import Button from '../common/Button';
import useRegister from './hook/useRegister';
import InputField from '../common/InputField';

function RegisterForm() {
  const { errorEmail, user, handleChange, handleSubmit } = useRegister();

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

              <form onSubmit={handleSubmit}>
                <InputField
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={user.username}
                  onChange={handleChange}
                />

                <InputField
                  type="text"
                  name="email"
                  placeholder="email"
                  value={user.email}
                  onChange={handleChange}
                />

                {errorEmail && (
                  <span style={{ color: 'red' }}>{errorEmail}</span>
                )}

                <InputField
                  type="text"
                  name="password"
                  placeholder="password"
                  value={user.password}
                  onChange={handleChange}
                />

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
