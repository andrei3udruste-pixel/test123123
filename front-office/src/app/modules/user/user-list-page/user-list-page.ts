import {Component, inject, OnInit} from '@angular/core';
import {List} from '../../../shared/components/list/list';
import {UserControllerService, UserListSearchDTO, UserListViewDTO} from '../../../openapi';
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
import {MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {RouterLink} from '@angular/router';

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
    MatProgressSpinner,
    RouterLink,
  ],
  templateUrl: './user-list-page.html',
  styleUrl: './user-list-page.scss',
})
export class UserListPage extends List<UserListViewDTO, UserListSearchDTO> implements OnInit {
  userControllerService = inject(UserControllerService);

  displayedColumns = ['idUser', 'email', 'username', 'firstName', 'lastName', 'enabled', 'actions'];

  override get searchRequestData(): UserListSearchDTO {
    return {};
  }

  override get entityRootPath(): string[] {
    return ['/user'];
  }

  ngOnInit(): void {
    this.initialize();
  }

  override getSearchRequest(pageToLoad: number): Observable<HttpResponse<IPageResponse<UserListViewDTO>>> {
    return this.userControllerService.getUserListUsingPOST(
      this.searchRequestData,
      pageToLoad,
      this.pageSize(),
      this.sort().join(","),
      "response"
    );
  }
}
