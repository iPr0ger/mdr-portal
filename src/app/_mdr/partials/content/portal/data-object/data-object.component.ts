import { Component, OnInit, Input } from '@angular/core';
import { OPEN_ACCESS, RESTRICTED_ACCESS, NO_ACCESS, UNKNOWN_ACCESS } from '../../../../core/types/object.access-types';


@Component({
  selector: 'app-data-object',
  templateUrl: './data-object.component.html',
})
export class DataObjectComponent implements OnInit {

  @Input() dataObjectId: number;
  @Input() dataObjectType: string;
  @Input() dataObjectTitle: string;
  @Input() dataObjectAccessUrl: string;
  @Input() dataObjectUrl: string;
  @Input() dataObjectYear: number;
  @Input() dataObjectAccessType: string;
  @Input() provenance: string;
  @Input() objectInstances: Array<any>;

  public showMore: boolean;

  public isSelected = true;

  public openAccess = OPEN_ACCESS;
  public restrictedAccess = RESTRICTED_ACCESS;
  public noAccess = NO_ACCESS;
  public unknownAccess = UNKNOWN_ACCESS;

  public citationUrl: string;

  constructor() {

  }

  showMoreToggle(){
    return this.showMore = !this.showMore;
  }

  ngOnInit(): void {
    if (this.dataObjectType === 'Journal article') {
      if (this.objectInstances !== null && this.objectInstances !== undefined) {
        if (this.objectInstances.length > 1) {
          for (const objInstance of this.objectInstances){
            if (objInstance.access_details !== null && objInstance.access_details !== undefined
              && objInstance.resource_details !== null && objInstance.resource_details !== undefined) {
              if (objInstance.resource_details.type_name === 'Web text with download' &&
                objInstance.access_details.direct_access === true) {

                this.citationUrl = objInstance.access_details.url;

              } else {

                this.citationUrl = null;

              }
            }
          }
        }
      }
    }
  }

}
