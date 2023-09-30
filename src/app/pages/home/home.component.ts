import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import * as $ from 'jquery'; // Import jQuery
import 'slick-carousel/slick/slick.min.js';
import { PageEvent } from '@angular/material/paginator';
import { PageDetail, PaginationAndSort, SortSetting } from 'src/app/utils/pagination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('dynamicTemplate') dynamicTemplate!: TemplateRef<any>;

  // pageDetail:PageDetail= new PageDetail(0,20)
  paginationSort: PaginationAndSort = new PaginationAndSort(new SortSetting([{ field: 'start', order: -1 }]), new PageDetail(0, 20));
  properties: any;
  isMobile = true;
  cols: number = 4;
  // currentPage = 0;

  handlePageEvent(pageEvent: PageEvent) {
    this.paginationSort.pageDetail.perPage = pageEvent.pageSize
    this.paginationSort.pageDetail.page = pageEvent.pageIndex
    this.loadData()

  }
  
  slides = [
    { color: '#007bff', text: 'Slider 1' },
    { color: '#6c757d', text: 'Slider 2' },
    { color: '#17a2b8', text: 'Slider 3' },
    { color: '#28a745', text: 'Slider 4' },
    { color: '#dc3545', text: 'Slider 5' },
    { color: '#ffc107', text: 'Slider 6' }
  ]

  constructor(private homeService: HomeService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.homeService.getHouses({}, this.paginationSort).subscribe(paginatedResult => {
      this.properties = paginatedResult._embedded.elements
      this.paginationSort.pageDetail = { ...this.paginationSort.pageDetail, ...paginatedResult.page } as PageDetail;
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

  // slides = [
  //   {img: "http://placehold.it/350x150/000000"},
  //   {img: "http://placehold.it/350x150/111111"},
  //   {img: "http://placehold.it/350x150/333333"},
  //   {img: "http://placehold.it/350x150/666666"}
  // ];
  slideConfig = { "slidesToShow": 4, "slidesToScroll": 4 };

  addSlide() {
    // this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }
}

