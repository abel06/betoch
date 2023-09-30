import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[appGridContainer]'
})
export class GridContainerDirective {
  @Input() set appGridContainer(properties: any[]) {
    this.viewContainerRef.clear();
    properties.forEach(property => {
      const context = { property };
      this.viewContainerRef.createEmbeddedView(this.templateRef, context);
    });
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }
}
