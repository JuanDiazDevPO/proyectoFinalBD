import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(array: any[], page: number, pageSize: number): any[] {
    return array.slice((page - 1) * pageSize, page * pageSize);
  }

}
