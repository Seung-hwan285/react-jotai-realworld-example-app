import React from 'react';
import Button from '../common/Button';
import useSetting from './hook/useSetting';
import InputField from '../common/InputField';

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
                  <InputField
                    type="text"
                    placeholder="URL of profile picture"
                    name="images"
                    value={state.images}
                    onChange={handleChange}
                  />

                  <InputField
                    type="text"
                    placeholder="Your Name"
                    name="username"
                    value={state.username}
                    onChange={handleChange}
                  />

                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                      name="bio"
                      value={state.bio}
                      onChange={handleChange}
                    ></textarea>
                  </fieldset>

                  <InputField
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                  />

                  {errorEmail && (
                    <span style={{ color: 'red' }}>{errorEmail}</span>
                  )}

                  <InputField
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={state.password}
                    onChange={handleChange}
                  />

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
