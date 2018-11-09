import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FilterOption } from './models/filter-option.interface';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  @Input() filterOptions: FilterOption[];
  @Output() filtered = new EventEmitter();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  filter() {
    this.filtered.emit(this.filterForm.value);
  }

  private initForm() {
    const formControls = this.filterOptions.reduce((controls, filter) => {
      controls[filter.name] = this.fb.control(null, Validators.required);
      return controls;
    }, {});

    this.filterForm = this.fb.group(formControls);
  }

}
