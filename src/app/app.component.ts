import {Component} from '@angular/core';
import {Grid} from './models/grid';
import {ActionColumn, ActionItem, TextColumn} from './models/column';
import {UserService} from './services/user.service';
import {UserModel} from './models/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'pars-pack';
  public userGrid!: Grid;
  public searchOfGrid: { placeHolder: string };
  public isVisible = false;
  public user: UserModel;
  public width = window.innerWidth * 0.8;


  constructor(private userService: UserService) {
    this.initUserGrid();
  }


  initUserGrid(): void {
    this.searchOfGrid = {
      placeHolder: 'Search...',
    };
    this.userGrid = {
      columns: [
        {
          headerTableCell: 'Id',
          value: 'id',
          type: 'Text',
          customWidth: 10,
          sortAble: false,
        } as TextColumn,
        {
          headerTableCell: 'Name',
          value: 'name',
          type: 'Text',
          customWidth: 20,
          sortAble: true,
          sortableName: 'name',
        } as TextColumn,
        {
          headerTableCell: 'Email',
          value: 'email',
          type: 'Text',
          customWidth: 20,
          sortAble: false,
        } as TextColumn,
        {
          headerTableCell: 'Username',
          value: 'username',
          type: 'Text',
          customWidth: 20,
          sortAble: true,
          sortableName: 'username',
        } as TextColumn,
        {
          headerTableCell: 'Phone',
          value: 'phone',
          type: 'Text',
          customWidth: 20,
          sortAble: false,
        } as TextColumn,
        {
          headerTableCell: 'Actions',
          value: 'type',
          type: 'Action',
          position: 'center',
          customWidth: 10,
          buttonItems: [
            {
              icon: 'fa fa-location text-color-1',
              onclick: (row: UserModel) => {
                this.user = row;
                this.isVisible = true;
              },
            } as ActionItem,
          ],
          sortAble: false,
        } as ActionColumn,
      ],
      method: 'getUsers',
      service: this.userService,
      noDataMessage: 'No user',
      searchBy: 'name'
    };
  }

  handleCancel(): void {
    this.isVisible = false;
  }


}
