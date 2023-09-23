import { Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { CellTemplateDirective } from 'src/app/directives/cell-template.directive';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @ContentChildren(CellTemplateDirective) cellTemplates!: QueryList<CellTemplateDirective>;
  cellTemplatesMap!: { [key: string]: TemplateRef<any> };
  @Input() template!: TemplateRef<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
