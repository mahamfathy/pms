import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent {
  imagePath: string = 'https://upskilling-egypt.com:3003/';
  constructor(
    public dialogRef: MatDialogRef<ViewUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: IUser
  ) {
    if (this.data.imagePath) {
      this.data.imagePath = this.imagePath + this.data.imagePath;
    } else {
      this.data.imagePath = 'assets/images/def-avatar.avif';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
