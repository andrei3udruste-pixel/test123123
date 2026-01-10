import {Component, computed, inject, model} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from '@angular/material/chips';
import {FormsModule} from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import {RoleDataService} from '../../services/role/role';
import {MatIcon} from '@angular/material/icon';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-role-selector',
  imports: [
    MatFormField,
    MatLabel,
    MatChipGrid,
    MatChipInput,
    FormsModule,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    MatChipRow,
    MatChipRemove,
    MatIcon,
    TranslatePipe,
    MatButton
  ],
  templateUrl: './role-selector.html',
  styleUrl: './role-selector.scss',
})
export class RoleSelector {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  roleService = inject(RoleDataService);

  currentRole = model<any>('');
  roles = model<string[]>([]);
  filteredRoles = computed(() => {
    const currentRole =  this.currentRole();
    const currentRoleText = typeof currentRole === "string" ? currentRole.toLowerCase() : '';

    const allRoles = this.roleService.allRoles;
    return allRoles
      .filter((role) => !this.roles().includes(role))
      .filter(currentRole !== '' ?
        (role) => role.toLowerCase().includes(currentRoleText) :
        () => true
      );
  });

  remove(role: string): void {
    this.roles.update(roles => {
      for (let index = 0; index < roles.length; index++) {
        if (roles[index] === role) {
          roles.splice(index, 1);
          return [...roles];
        }
      }
      return roles;
    });
  }

  removeAll(): void {
    this.roles.set([]);
    this.currentRole.set('');
  }

  addAll(): void {
    this.roles.set(this.roleService.allRoles);
    this.currentRole.set('');
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.roles.update(roles =>
      [...roles, event.option.value as string]
    );

    this.currentRole.set('');
    event.option.deselect();
  }
}
