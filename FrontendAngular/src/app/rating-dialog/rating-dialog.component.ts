import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.css']
})
export class RatingDialogComponent implements OnInit {

  ratings: number[] = [1, 2, 3, 4, 5];
  activeItem:string = ""
  selectedRating: any;
  //   selectedRating: number;
  constructor(public dialogRef: MatDialogRef<RatingDialogComponent>) { }

  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

 
}



