import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const users= [];
    for (const u of value) {
      var id = u.id + "";
      if (u.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 || u.email.toLowerCase().indexOf(arg.toLowerCase()) > -1 || 
      id.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        users.push(u);
      };
    };
    return users;
  }
}