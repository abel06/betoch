import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import KeenSlder, { KeenSliderInstance } from 'keen-slider'
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>
  @Input() template!: TemplateRef<any>;
  currentSlide: number = 1
  dotHelper: Array<Number> = []
  slider!: KeenSliderInstance;

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlder(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel
        },
      })
      this.dotHelper = [
        ...Array(this.slider.track.details.slides.length).keys(),
      ]
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}