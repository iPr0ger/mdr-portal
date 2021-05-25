import {Component, OnInit, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { LayoutService } from '../../../../_mdr/core';
import KTLayoutQuickPanel from '../../../../../assets/js/layout/extended/quick-panel';
import KTLayoutHeaderTopbar from '../../../../../assets/js/layout/base/header-topbar';
import { KTUtil } from '../../../../../assets/js/components/util';
import {StatesService} from '../../../../_mdr/core/services/state/states.service';
import {SubscriptionEvents} from '../../../../_mdr/core/states/subscription-events';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportModalComponent} from './modals/export-modal/export-modal.component';
import {SaveModalComponent} from './modals/save-modal/save-modal.component';
import {LoadModalComponent} from './modals/load-modal/load-modal.component';
import {SingleStudyExportModalComponent} from './modals/single-study-export-modal/single-study-export-modal.component';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, AfterViewInit {

  extrasQuickPanelDisplay: boolean;
  extrasLanguagesDisplay: boolean;

  constructor(
    private statesService: StatesService,
    private subscriptionEvents: SubscriptionEvents,
    private layout: LayoutService,
    public translate: TranslateService,
    public snackBar: MatSnackBar,
    public router: Router,
    private modal: NgbModal,
    private ref: ChangeDetectorRef,
  ) {
    ref.detach();

    setInterval(() => {
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    }, 1);
  }


  onClear(){

    this.statesService.setIsCleared(true);

    const searchType = '';
    const searchBody = {};

    this.statesService.setSearchEvent({searchType, searchBody});

    this.subscriptionEvents.sendClearEvent();

    let message = '';
    let close = '';

    this.translate.get('SNACKBAR.CLEAR.MESSAGE').subscribe((translation: string) => {
      message = translation;
    });

    this.translate.get('SNACKBAR.CLOSE').subscribe((translation: string) => {
      close = translation;
    });

    this.snackBar.open(message, close, {
      duration: 5000
    });
  }


  openExportModal() {
    this.modal.open(ExportModalComponent, {centered: true});
  }

  openLoadModal() {
    this.modal.open(LoadModalComponent, {centered: true});
  }

  openSaveModal() {
    this.modal.open(SaveModalComponent, {centered: true});
  }

  openSingleStudyModal() {
    this.modal.open(SingleStudyExportModalComponent, {centered: true});
  }


  ngOnInit(): void {
    this.extrasLanguagesDisplay = this.layout.getProp(
      'extras.languages.display'
    );
    this.extrasQuickPanelDisplay = this.layout.getProp(
      'extras.quickPanel.display'
    );
  }

  ngAfterViewInit(): void {
    KTUtil.ready(() => {
      // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      // Add 'implements AfterViewInit' to the class.
      if (this.extrasQuickPanelDisplay) {
        // Init Quick Offcanvas Panel
        KTLayoutQuickPanel.init('kt_quick_panel');
      }
      // Init Header Topbar For Mobile Mode
      KTLayoutHeaderTopbar.init('kt_header_mobile_topbar_toggle');
    });
  }
}