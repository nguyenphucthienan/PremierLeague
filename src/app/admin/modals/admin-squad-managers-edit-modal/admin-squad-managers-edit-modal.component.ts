import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { concat, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Manager } from 'src/app/core/models/manager.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManagerService } from 'src/app/core/services/manager.service';
import { SquadService } from 'src/app/core/services/squad.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-squad-managers-edit-modal',
  templateUrl: './admin-squad-managers-edit-modal.component.html',
  styleUrls: ['./admin-squad-managers-edit-modal.component.scss']
})
export class AdminSquadManagersEditModalComponent implements OnInit {

  title: string;
  squadId: number;
  rowData: TableRow;
  managerEdited = new EventEmitter();

  editForm: FormGroup;
  managers: Manager[];
  managerSearch$ = new Subject<string>();

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private managerService: ManagerService,
    private squadService: SquadService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      managerId: [this.rowData.cells['id'].value, Validators.required],
    });

    this.getManagers();
  }

  editManager() {
    this.squadService.editManagerInSquad(
      this.squadId,
      this.editForm.value)
      .subscribe(() => {
        this.bsModalRef.hide();
        this.alertService.success('Edit manager successfully');
        this.managerEdited.emit();
      },
        error => this.alertService.error('Edit manager failed')
      );
  }

  private getManagers() {
    this.managerService.getManagers()
      .subscribe((response: any) => this.managers = response.items);

    concat(
      of([]),
      this.managerSearch$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(value => this.managerService.getManagers(
          undefined, undefined, { name: value })
          .pipe(catchError(() => of([]))))
      )
    ).subscribe((response: any) => this.managers = response.items);
  }

}
