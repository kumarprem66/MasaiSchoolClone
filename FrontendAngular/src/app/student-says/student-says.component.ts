import { Component,ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-student-says',
  templateUrl: './student-says.component.html',
  styleUrls: ['./student-says.component.css']
})
export class StudentSaysComponent{


  // @ViewChild('wrapper', { static: true }) wrapper: ElementRef;

  // imageIndex = 1;
  // intervalId: any;
  // images = ''
  // carousel: any;

  // constructor(private renderer: Renderer2) { }

  // ngOnInit(): void {
  //   this.autoSlide();
  // }

  // autoSlide(): void {
  //   this.intervalId = setInterval(() => this.slideImage(++this.imageIndex), 2000);
  // }

  // slideImage(): void {
  //   this.imageIndex = this.imageIndex === this.images.length ? 0 : this.imageIndex < 0 ? this.images.length - 1 : this.imageIndex;
  //   const translateValue = `translate(-${this.imageIndex * 100}%)`;
  //   this.renderer.setStyle(this.carousel.nativeElement, 'transform', translateValue);
  // }

  // updateClick(e: Event): void {
  //   clearInterval(this.intervalId);
  //   this.imageIndex += (e.target as HTMLButtonElement).id === "next" ? 1 : -1;
  //   this.slideImage();
  //   this.autoSlide();
  // }

  // onMouseOver(): void {
  //   clearInterval(this.intervalId);
  // }

  // onMouseLeave(): void {
  //   this.autoSlide();
  // }
}
