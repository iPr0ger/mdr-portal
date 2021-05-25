import {Component, Injectable, OnInit} from '@angular/core';
import {States} from '../../../../core/states/states';
import {StudyFilters} from '../../../../core/filters/study.filters';
import {DataObjectFilters} from '../../../../core/filters/object.filters';
import {StatesService} from '../../../../core/services/state/states.service';
import {SubscriptionEvents} from '../../../../core/states/subscription-events';


@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
})
@Injectable({providedIn: 'root'})
export class FiltersListComponent implements OnInit {
  filtersList: Array<any>;
  studyFilters: Array<any> = StudyFilters;
  dataObjectFilters: Array<any> = DataObjectFilters;

  constructor(
    private states: States,
    private statesService: StatesService,
    private subscriptionEvents: SubscriptionEvents,
  ) {
  }

  clearAll(){

    this.statesService.clearFilters();

    this.studyFilters.forEach((filter) => {
      filter['subgroups'].forEach((subgroup: any) => {
        subgroup['values'].forEach((param: any) => {
          param.isSelected = true;
        });
      });
    });

    this.dataObjectFilters.forEach((filter) => {
      filter['subgroups'].forEach((subgroup: any) => {
        subgroup['values'].forEach((param: any) => {
          param.isSelected = true;
        });
      });
    });

    this.filtersList = [];
    this.states.filtersList.next(this.filtersList);
    this.states.isFiltered.next(false);

    this.subscriptionEvents.sendClearFilterEvent();
  }

  ngOnInit(): void {
    this.states.filtersList.subscribe(value => this.filtersList = value);
  }
}
