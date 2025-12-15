import {AbstractControl} from '@angular/forms';

export const addError = (control: AbstractControl, errorName: string) => {
  control.setErrors({
    ...(control.errors || {}),
    ...{[errorName]: true}
  });
}

export const removeError = (control: AbstractControl, errorName: string) => {
  if (control.errors && control.errors[errorName]) {
    let controlErrors = control.errors;
    delete control.errors[errorName];
    control.setErrors(controlErrors);
  }
  if (control.errors && Object.keys(control.errors).length === 0) {
    control.setErrors(null);
  }
}
