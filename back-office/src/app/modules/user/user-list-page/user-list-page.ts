import {Component, inject, OnInit} from '@angular/core';
import {List} from '../../../shared/components/list/list';
import {UserListViewDTO, UserSearchAdminDTO, UserService} from '../../../openapi';
import {Observable} from 'rxjs';
import {IPageResponse} from '../../../shared/models/page-response';
import {HttpResponse} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {MatCard, MatCardContent} from '@angular/material/card';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-user-list-page',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    TranslatePipe,
    MatSort,
    MatIcon,
    MatSortHeader,
    MatIconButton,
    MatMiniFabButton,
    RouterLink,
    MatProgressBar,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatSelect,
    MatOption,

  ],
  templateUrl: './user-list-page.html',
  styleUrl: './user-list-page.scss',
})
export class UserListPage extends List<UserListViewDTO, UserSearchAdminDTO> implements OnInit {
  userService = inject(UserService);

  displayedColumns = ['idUser', 'email', 'username', 'firstName', 'lastName', 'enabled', 'actions'];

  filterForm = new FormGroup({
    username: new FormControl<string>(''),
    email: new FormControl<string>(''),
    id: new FormControl<string>(''),
    enabled: new FormControl<boolean | null>(null),
    locked: new FormControl<boolean | null>(null),
  })

  override get searchRequestData(): UserSearchAdminDTO {
    return {
      username: this.filterForm.controls.username.value ? this.filterForm.controls.username.value : undefined,
      email: this.filterForm.controls.email.value ? this.filterForm.controls.email.value : undefined,
      id: this.filterForm.controls.id.value ? this.filterForm.controls.id.value : undefined,
      enabled: this.filterForm.controls.enabled.value !== null ? this.filterForm.controls.enabled.value : undefined,
      locked: this.filterForm.controls.locked.value !== null ? this.filterForm.controls.locked.value : undefined,
    } satisfies UserSearchAdminDTO;
  }

  override get entityRootPath(): string[] {
    return ['/user'];
  }

  ngOnInit(): void {
    this.initialize();
  }

  clearFilters(): void {
    this.filterForm.reset();
  }

  override getSearchRequest(pageToLoad: number): Observable<HttpResponse<IPageResponse<UserListViewDTO>>> {
    return this.userService.searchAdmin(this.searchRequestData, pageToLoad, this.pageSize(), this.sort(), "response"
    );
  }
}
