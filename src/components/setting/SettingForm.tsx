import React from 'react';
import Button from '../common/Button';
import useSetting from './hook/useSetting';

function SettingForm() {
  const {
    error,
    handleChange,
    handleSubmit,
    state,
    errorEmail,
    disabled,
    handleLogout,
  } = useSetting();

  return (
    <>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              {error.error && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                  {error.error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      name="images"
                      onChange={handleChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      name="username"
                      onChange={handleChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                      name="bio"
                      onChange={handleChange}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      value={state.email}
                      name="email"
                      onChange={handleChange}
                    />
                  </fieldset>
                  {errorEmail && (
                    <span style={{ color: 'red' }}>{errorEmail}</span>
                  )}
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      name="password"
                      placeholder="New Password"
                      value={state.password}
                      onChange={handleChange}
                    />
                  </fieldset>
                  <Button
                    disabled={disabled}
                    className="btn btn-lg btn-primary pull-xs-right"
                  >
                    Update Settings
                  </Button>
                </fieldset>
              </form>
              <hr />
              <Button onClick={handleLogout} className="btn btn-outline-danger">
                Or click here to logout.
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SettingForm;
