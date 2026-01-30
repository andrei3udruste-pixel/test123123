import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { List } from '../../../shared/components/list/list';
import {
  UserViewAdminDTO,
  UserService,
  UserUpdateAdminDTO
} from '../../../openapi';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IPageResponse } from '../../../shared/models/page-response';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list-page',
  standalone: true,
  imports: [

    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatCardModule,
    MatExpansionModule,


    ReactiveFormsModule,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './user-list-page.html',
  styleUrl: './user-list-page.scss',
})
export class UserListPage
  extends List<UserViewAdminDTO, Record<string, unknown>>
  implements OnInit {

  private userService = inject(UserService);

  displayedColumns = ['id', 'username', 'email', 'enabled', 'locked', 'actions'];

  filterForm = new FormGroup({
    username: new FormControl<string>(''),
    email: new FormControl<string>(''),
    id: new FormControl<string>(''),
    enabled: new FormControl<boolean | null>(null),
    locked: new FormControl<boolean | null>(null),
  });

  ngOnInit(): void {
    this.initialize();
  }

  override get entityRootPath(): string[] {
    return ['user'];
  }

  override get searchRequestData(): Record<string, unknown> {
    return {
      username: this.filterForm.value.username || undefined,
      email: this.filterForm.value.email || undefined,
      id: this.filterForm.value.id || undefined,
      enabled: this.filterForm.value.enabled ?? undefined,
      locked: this.filterForm.value.locked ?? undefined,
    };
  }


  override sort(): string[] {
    const pred = this.predicate();
    const mappedPredicate = pred === 'idUser' ? 'id' : pred;

    return [mappedPredicate + ',' + (this.ascending() ? this.ascendingSort : this.descendingSort)];
  }

  override getSearchRequest(
    pageToLoad: number
  ): Observable<HttpResponse<IPageResponse<UserViewAdminDTO>>> {
    const data = this.searchRequestData;

    return this.userService.searchAdmin1(
      pageToLoad,
      this.pageSize(),
      this.sort(),
      data['username'] as string | undefined,
      data['email'] as string | undefined,
      data['id'] as string | undefined,
      data['enabled'] as boolean | undefined,
      data['locked'] as boolean | undefined,
      'response'
    ) as unknown as Observable<HttpResponse<IPageResponse<UserViewAdminDTO>>>;
  }

  clearFilters(): void {
    this.filterForm.reset({
      username: '',
      email: '',
      id: '',
      enabled: null,
      locked: null,
    });
    this.loadPage(0);
  }

  toggleEnabled(user: UserViewAdminDTO): void {
    const body: UserUpdateAdminDTO = {
      enabled: !user.enabled,
      locked: user.locked,
      roles: user.roles,
    };

    this.userService.updateUserAdmin(user.id, body).subscribe(() => {
      user.enabled = !user.enabled;
    });
  }

  toggleLocked(user: UserViewAdminDTO): void {
    const body: UserUpdateAdminDTO = {
      enabled: user.enabled,
      locked: !user.locked,
      roles: user.roles,
    };

    this.userService.updateUserAdmin(user.id, body).subscribe(() => {
      user.locked = !user.locked;
    });
  }
}
