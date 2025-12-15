import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {addError, removeError} from './utils';

export const matchingFieldsValidator = (controlName: string, matchingControlName: string, errorName: string): ValidatorFn => {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    const error = control.value === matchingControl.value ? null : {[errorName]: true};

    if (error) {
      addError(control, errorName);
    } else {
      removeError(control, errorName);
    }

    return error;
  }
}
