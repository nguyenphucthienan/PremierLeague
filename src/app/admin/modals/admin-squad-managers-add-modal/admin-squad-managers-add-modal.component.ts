import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { concat, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Manager } from 'src/app/core/models/manager.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManagerService } from 'src/app/core/services/manager.service';
import { SquadService } from 'src/app/core/services/squad.service';

@Component({
  selector: 'app-admin-squad-managers-add-modal',
  templateUrl: './admin-squad-managers-add-modal.component.html',
  styleUrls: ['./admin-squad-managers-add-modal.component.scss']
})
export class AdminSquadManagersAddModalComponent implements OnInit {

  title: string;
  squadId: number;
  managerAdded = new EventEmitter();

  addForm: FormGroup;
  managers: Manager[];
  managerSearch$ = new Subject<string>();

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private managerService: ManagerService,
    private squadService: SquadService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      managerId: [null, Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [null]
    });

    this.getManagers();
  }

  addManager() {
    this.squadService.addManagerToSquad(
      this.squadId,
      this.addForm.value)
      .subscribe(() => {
        this.bsModalRef.hide();
        this.alertService.success('Add manager successfully');
        this.managerAdded.emit();
      },
        error => this.alertService.error('Add manager failed')
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
