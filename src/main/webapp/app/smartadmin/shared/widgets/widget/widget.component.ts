import {Component, OnInit, ElementRef, Input, AfterViewInit, HostBinding} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'sa-widget,[sa-widget]',
  template: `<ng-content></ng-content>`
})
export class WidgetComponent implements OnInit, AfterViewInit {
    static counter = 0;

  @HostBinding('attr.id') public widgetId: string;

  @Input() public name: string;
  @Input() public colorbutton = true;
  @Input() public editbutton = true;
  @Input() public togglebutton = true;
  @Input() public deletebutton = true;
  @Input() public fullscreenbutton = true;
  @Input() public custombutton = false;
  @Input() public collapsed = false;
  @Input() public sortable = true;
  @Input() public hidden = false;
  @Input() public color: string;
  @Input() public load = false;
  @Input() public refresh = false;



  constructor(public el: ElementRef, private router: Router) {

  }

  ngOnInit() {
    this.widgetId = this.genId();

    const widget = this.el.nativeElement;
    widget.className += ' jarviswidget';
    if (this.sortable) {
      widget.className += ' jarviswidget-sortable';
    }

    if (this.color) {
      widget.className += (' jarviswidget-color-' + this.color);
    }

    ['colorbutton',
      'editbutton',
      'togglebutton',
      'deletebutton',
      'fullscreenbutton',
      'custombutton',
      'sortable'
    ].forEach((option) => {
      if (!this[option]) {
        widget.setAttribute('data-widget-' + option, 'false');
      }
    });

    [
      'hidden',
      'collapsed'
    ].forEach((option) => {
      if (this[option]) {
        widget.setAttribute('data-widget-' + option, 'true');
      }
    });

    // ['refresh', 'load'].forEach(function (option) {
    //   if (this[option])
    //     widgetProps['data-widget-' + option] = this[option]
    // }.bind(this));

  }

  private genId() {
    if (this.name) {
      return this.name;
    } else {
      const heading = this.el.nativeElement.querySelector('header h2');
      let id = heading ? heading.textContent.trim() : 'jarviswidget-' + WidgetComponent.counter++;
      id = id.toLowerCase().replace(/\W+/gm, '-');

      const url = this.router.url.substr(1).replace(/\//g, '-');
      id = url + '--' + id;

      return id;
    }

  }

  ngAfterViewInit(): any {
    const $widget = $(this.el.nativeElement);

    if (this.editbutton) {
      $widget.find('.widget-body').prepend('<div class="jarviswidget-editbox"><input class="form-control" type="text"></div>');
    }

    const isFiller = $widget.hasClass('sa-fx-col');

    if (isFiller) {
      $widget.attr('class', 'sa-fx-col');
    }
  }

}
