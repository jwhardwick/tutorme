import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, map, tap } from 'rxjs/operators';

export interface FilterOption {
  props: string|string[];
  label: string;
}


@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  @Input() filterOptions: FilterOption[];
  @Output() formChange = new EventEmitter<{query: any, filterOption: FilterOption}>();
  @Output() priceChange = new EventEmitter<{type: 'any' | 'low' | 'medium' | 'high'}>();

  searchForm: FormGroup;

  public uniExpanded = false;
  public priceExpanded = false;

  constructor() { }

  ngOnInit() {
    this._createForm();
  }

  private _createForm(): void {
    this.searchForm = new FormGroup({
      query: new FormControl(''),
      filterOption: new FormControl(this.filterOptions[0])
    });

    this.searchForm.valueChanges.pipe(
      debounceTime(200),
      tap(_ => {
        const filterOption: FilterOption = {
          props: this.searchForm.value.filterOption.props,
          label: this.searchForm.value.filterOption.label
        };
        const query: string = this.searchForm.value.query;
        this.formChange.emit({ query, filterOption });
      })

    ).subscribe();
  }

  selectPrice(type: 'any' | 'low' | 'medium' | 'high') {
    this.priceExpanded = false;
    this.priceChange.emit({type})
  }

}
