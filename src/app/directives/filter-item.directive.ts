import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appFilterMatItem]'
})
export class FilterItemDirective {
  constructor() { }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    return false;
  }

}
