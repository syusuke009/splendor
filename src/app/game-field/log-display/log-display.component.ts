import { Component, OnInit, ElementRef } from '@angular/core';
import { OperationLogService } from './operation-log.service';
import { OperationLogList } from './operation-log';

@Component({
  selector: 'app-log-display',
  templateUrl: './log-display.component.html',
  styleUrls: ['./log-display.component.less']
})
export class LogDisplayComponent implements OnInit {

  loglist: OperationLogList;
  element: HTMLElement;

  constructor(private service: OperationLogService,
    private elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit() {
    this.loglist = this.service.loglist;
  }

}
