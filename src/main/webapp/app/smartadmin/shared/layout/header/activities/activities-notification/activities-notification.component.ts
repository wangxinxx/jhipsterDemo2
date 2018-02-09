import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: '[activitiesNotification]',
  templateUrl: './activities-notification.component.html',
})
export class ActivitiesNotificationComponent implements OnInit {

  @Input() item: any;

  constructor() {}

  ngOnInit() {
  }

  setClasses() {
    const classes = {
      'fa fa-fw fa-2x': true
    };
    classes[this.item.icon] = true;
    return classes;
  }

}
