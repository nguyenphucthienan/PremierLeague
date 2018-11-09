import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  @Input() filters: any;
  @Output() filtered = new EventEmitter();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.filters = [
      {
        name: 'id',
        text: 'ID',
        values: [
          { text: 'One', value: 1 },
          { text: 'Two', value: 2 },
          { text: 'Three', value: 3 }
        ]
      },
      {
        name: 'code',
        text: 'Code',
        values: [
          { text: 'Four', value: 4 },
          { text: 'Five', value: 5 }
        ]
      }
    ];

    this.initForm();
  }

  filter() {
    console.log(this.filterForm.value);
    this.filtered.emit(this.filterForm.value);
  }

  private initForm() {
    const formControls = this.filters.reduce((controls, filter) => {
      controls[filter.name] = this.fb.control('', Validators.required);
      return controls;
    }, {});

    this.filterForm = this.fb.group(formControls);
  }

}
