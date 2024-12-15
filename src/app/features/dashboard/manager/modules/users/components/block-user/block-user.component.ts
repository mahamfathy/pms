<<<<<<< HEAD
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../interfaces/IUser';
=======
import { Component } from '@angular/core';
>>>>>>> 2ece285 ([feat] block-user component : create the component)

@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
<<<<<<< HEAD
  styleUrls: ['./block-user.component.scss'],
})
export class BlockUserComponent {
  constructor(
    public dialogRef: MatDialogRef<BlockUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: IUser
  ) {}
=======
  styleUrls: ['./block-user.component.scss']
})
export class BlockUserComponent {

>>>>>>> 2ece285 ([feat] block-user component : create the component)
}
