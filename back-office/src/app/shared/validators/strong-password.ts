import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const strongPasswordValidator = (): ValidatorFn => {
  // at least 8 characters, 1 uppercase, 1 lowercase, 1 digit and 1 special
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string | null;

    if (!value) {
      return null;
    }

    const isStrong = strongPasswordRegex.test(control.value);
    return isStrong ? null : {weakPassword: true};
  }
}
