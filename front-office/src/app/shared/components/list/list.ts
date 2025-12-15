import {inject, signal} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {combineLatestWith, Observable, of} from 'rxjs';
import {DeleteConfirmation, DeleteConfirmationData} from '../delete-confirmation/delete-confirmation';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {IPageResponse} from '../../models/page-response';
import {MatSort, Sort} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export abstract class List<EntityType, EntitySearchType> {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(MatDialog);

  dataSource = signal(new MatTableDataSource<EntityType>([]));

  searchEntity = signal<EntitySearchType | null>(null);

  readonly pageSizeOptions = [10, 20, 50];
  readonly ascendingSort = 'asc';
  readonly descendingSort = 'desc';
  readonly sortParam = 'sort';

  isLoading = signal(false);
  totalItems = signal(0);
  page = signal(0);
  predicate = signal('');
  ascending = signal(true);
  pageSize = signal(this.pageSizeOptions[1]);

  abstract get displayedColumns(): string[];

  abstract get entityRootPath(): string[];

  initialize(): void {
    this.handleNavigation();
  }

  // delete entity logic deletion

  get afterDeleteAction(): () => void {
    return () => {
    };
  }

  getDeleteModalMessage(_entityId?: number): DeleteConfirmationData | null {
    return null;
  }

  getDeleteRequest(_entityId: number): Observable<HttpResponse<any>> {
    return of(new HttpResponse<any>());
  }

  openDeleteModal(entityId: number): void {
    const messageData = this.getDeleteModalMessage(entityId);
    if (messageData === null) {
      return;
    }

    const modalReference = this.dialog.open(DeleteConfirmation, {data: messageData});
    modalReference.afterClosed().subscribe(result => {
      if (result) {
        this.getDeleteRequest(entityId).subscribe(() => {
          this.afterDeleteAction();
        })
      }
    })
  }

  // paging and navigation logic

  abstract get searchRequestData(): EntitySearchType;

  abstract getSearchRequest(pageToLoad: number): Observable<HttpResponse<IPageResponse<EntityType>>>;

  setSort(sort: Sort): void {
    this.predicate.set(sort.active);
    this.ascending.set(sort.direction === 'asc');
    this.loadPage(0);
  }

  onPageChange(event: PageEvent): void {
    this.page.set(event.pageIndex);
    this.pageSize.set(event.pageSize!);
    this.loadPage(event.pageIndex);
  }

  sort(): string[] {
    return [this.predicate() + ',' + (this.ascending() ? this.ascendingSort : this.descendingSort)];
  }

  loadPage(page?: number, navigate?: boolean): void {
    this.isLoading.set(true);
    const pageToLoad = page ? page : this.page();

    this.getSearchRequest(pageToLoad).subscribe({
      next: (response: HttpResponse<IPageResponse<EntityType>>) => {
        this.isLoading.set(false);
        this.onSuccess(response.body, pageToLoad, navigate ?? true);
      },
      error: () => {
        this.isLoading.set(false);
      }
    })
  }

  protected handleNavigation(): void {
    this.activatedRoute.data
      .pipe(combineLatestWith(this.activatedRoute.queryParamMap))
      .subscribe(([data, params]) => {
        const page = params.get('page');
        const pageNumber = page ? Number(page) : 0;
        const sort = (params.get(this.sortParam) ?? data['defaultSort']).split(',');
        const predicate = sort[0];
        const ascending = sort[1] === this.ascendingSort;

        if (pageNumber !== this.page() ||
          predicate !== this.predicate() ||
          ascending !== this.ascending()) {
          this.predicate.set(predicate);
          this.ascending.set(ascending);
          this.page.set(pageNumber);
          this.loadPage(pageNumber);
        }
      });
  }

  protected onSuccess(
    responseBody: IPageResponse<EntityType> | null,
    page: number,
    navigate: boolean
  ): void {
    this.totalItems.set(responseBody?.totalElements ?? 0);
    this.page.set(page);

    const data = responseBody?.data ?? [];
    this.dataSource.set(new MatTableDataSource<EntityType>(responseBody?.data ?? []));

    if (navigate) {
      this.router.navigate(this.entityRootPath, {
        queryParams: {
          page: this.page(),
          size: this.pageSize(),
          sort: this.sort()
        }
      });
    }

  }
}
