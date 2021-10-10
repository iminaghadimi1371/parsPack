import {Observable} from 'rxjs';

export interface ActionItem {
  name?: string;
  icon?: string;
  customClass?: string;
  onclick?: Function;
}

/**
 * column  each column have header and value
 */
export class Column {
  public headerTableCell!: string | Observable<string>;
  public value: string | any;
  public customWidth?: number;
  public sortAble ? = true;
  public sortableName?: string;
}

export class TextColumn extends Column {
  public type!: 'Text';
}

export class ActionColumn extends Column {
  public type!: 'Action';
  public position?: 'left' | 'right' | 'center';
  public buttonItems?: ActionItem[];

}
