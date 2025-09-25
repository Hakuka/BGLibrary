import { Component } from '@angular/core';
import { BorrowedDetails } from './borrowed-details/borrowed-details';
import { TopSearch } from './top-search/top-search';

@Component({
  selector: 'borrowed-view',
  imports: [BorrowedDetails, TopSearch],
  templateUrl: './borrowed-view.html',
  styleUrl: './borrowed-view.css',
})
export class BorrowedView {}
