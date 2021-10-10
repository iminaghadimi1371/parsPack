import {Column} from './column';

/**
 * Column:array of columns
 */

export class Grid {
  public columns: Column[] = [];
  public service: any;
  public method: string;
  public noDataMessage = 'No data';
  public searchBy?: string = '';
}
