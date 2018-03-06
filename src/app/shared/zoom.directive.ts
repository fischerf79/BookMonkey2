import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[bmZoom]'
})
export class ZoomDirective {

  @HostBinding('class.small')
  public isSmallClass = false;

  @HostBinding('class.tiny')
  public isTinyClass = true;

  constructor() { }

  @HostListener('mouseenter')
  public onMouseEnter() {
    // console.log('onMouseEnter');
    this.isSmallClass = true;
    this.isTinyClass = false;
  }

  @HostListener('mouseout')
  public onMouseOut() {
    // console.log('onMouseOut');
    this.isSmallClass = false;
    this.isTinyClass = true;
  }
}
