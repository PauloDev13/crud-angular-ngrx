import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';

import { loadAssociate } from '../../store/associate/associate.action';
import { getAssociateList } from '../../store/associate/associate.selectors';
import { Associate } from '../../store/model/associate.model';
import { AddAssociateComponent } from '../add-associate/add-associate.component';

@Component({
  selector: 'app-add-associate-listing',
  templateUrl: './associate-listing.component.html',
  styleUrls: ['./associate-listing.component.css'],
})
export class AssociateListingComponent implements OnInit {
  // associateList$: Observable<Associate[]> = of([]);
  associateList: Associate[] = [];
  dataSource!: any;
  displayedColumns = [
    'code',
    'name',
    'email',
    'phone',
    'address',
    'type',
    'associateGroup',
    'status',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly store = inject(Store);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // this.associateList$ = this.store.select(getAssociateList);
    this.store.dispatch(loadAssociate());
    this.store.select(getAssociateList).subscribe({
      next: data => {
        this.associateList = data;
        this.dataSource = new MatTableDataSource<Associate>(this.associateList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  functionAdd() {
    this.openPopUp(0, 'Create Associate');
  }

  openPopUp(code: number, title: string) {
    this.dialog.open(AddAssociateComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
      data: { code: code, title: title },
    });
  }
}
