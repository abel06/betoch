import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import * as $ from 'jquery'; // Import jQuery
import 'slick-carousel/slick/slick.min.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('dynamicTemplate') dynamicTemplate!: TemplateRef<any>;
 properties:any;
 isMobile = true;
 cols: number = 4;

  constructor(private homeService: HomeService,private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.homeService.getHouses().subscribe(properties => {
      // console.log(houses)
      this.properties = properties
    })
  }



  ngAfterViewInit(): void {
    // Initialize the Slick slider
    // jQuery(this.elementRef.nativeElement).find('.slider').slick();


    
  }

  getGridCols() {
    if (window.innerWidth <= 600) {
      // For mobile screens (up to 600px wide), show 1 column
      return 1;
    } else if (window.innerWidth <= 960) {
      // For medium-sized screens (up to 960px wide), show 2 columns
      return 2;
    } else {
      // For desktop screens, show 4 columns
      return 4;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Update the number of columns when the window is resized
    this.cols = this.getGridCols();
  }

  slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ];
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e:any) {
    console.log('slick initialized');
  }
  
  breakpoint(e:any) {
    console.log('breakpoint');
  }
  
  afterChange(e:any) {
    console.log('afterChange');
  }
  
  beforeChange(e:any) {
    console.log('beforeChange');
  }
}

