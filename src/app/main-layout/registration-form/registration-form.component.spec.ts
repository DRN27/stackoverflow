import {RegistrationFormComponent} from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;

  beforeEach(() => {
    component = new RegistrationFormComponent(null, null);
  });

  it ('should create form with 2 controls', () => {
    expect( component.form.contains('email') ).toBeTruthy();
    expect( component.form.contains('password') ).toBeTruthy();
  });

  it('should mark email as invalid if value is empty', () => {
    const control = component.form.get('email');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should mark email as invalid if value is invalid', () => {
    const control = component.form.get('email');

    control.setValue('email123');

    expect(control.valid).toBeFalsy();
  });

  it('should mark password as invalid if value is empty', () => {
    const control = component.form.get('password');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should mark password as invalid if value is invalid', () => {
    const control = component.form.get('password');

    control.setValue('12345');

    expect(control.valid).toBeFalsy();
  });

});
