import {Component, input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {MatError} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
    selector: 'app-control-errors',
    imports: [
        MatError,
        TranslatePipe
    ],
    templateUrl: './control-errors.html',
    styleUrl: './control-errors.scss',
    standalone: true
})
export class ControlErrors {
  errors = input.required<string[]>();
  control = input.required<AbstractControl>();
}
