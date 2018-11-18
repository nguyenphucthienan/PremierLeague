import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { ClubService } from 'src/app/core/services/club.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

import { AdminClubManagerTableService } from '../../services/admin-club-manager-table.service';

@Component({
  selector: 'app-admin-club-manager',
  templateUrl: './admin-club-manager.component.html',
  styleUrls: ['./admin-club-manager.component.scss'],
  providers: [AdminClubManagerTableService]
})
export class AdminClubManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;

  constructor(public adminClubManagerTableService: AdminClubManagerTableService,
    private clubService: ClubService,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchClub(value))
      )
      .subscribe();
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.Edit:
        this.openEditModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openDeleteModal(tableCellChange.row.cells['id'].value);
        break;
    }
  }

  searchClub(value: string) {
    this.adminClubManagerTableService.filterMode['name'] = value;
    this.datatable.refresh();
  }

  openAddModal() {
    console.log('Add modal');
  }

  onClubAdded() {
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    console.log('Edit modal');
  }

  onClubEdited() {
    this.datatable.refresh();
  }

  openDeleteModal(id: number) {
    console.log('Delete modal');
  }

  confirmDeleteClub(id: number) {
    this.clubService.deleteClub(id)
      .subscribe(
        () => {
          this.alertService.success('Delete club successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete club failed')
      );
  }

  cancelDeleteClub() {
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
