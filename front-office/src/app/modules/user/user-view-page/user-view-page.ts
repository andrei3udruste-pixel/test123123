import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserViewDTO} from '../../../openapi';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from '@angular/material/list';
import {DatePipe} from '@angular/common';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {BackButton} from '../../../shared/components/back-button/back-button';

@Component({
  selector: 'app-user-view-page',
  imports: [
    TranslatePipe,
    MatCard,
    MatCardContent,
    MatList,
    MatListItem,
    MatListItemLine,
    MatListItemTitle,
    DatePipe,
    MatChip,
    MatChipSet,
    BackButton,
  ],
  templateUrl: './user-view-page.html',
  styleUrl: './user-view-page.scss',
})
export class UserViewPage implements OnInit {
  activatedRoute = inject(ActivatedRoute);

  user: UserViewDTO | null = null;

  ngOnInit() {
    this.activatedRoute.data.subscribe(({user}) => {
      this.user = user as UserViewDTO;
    });
  }
}
