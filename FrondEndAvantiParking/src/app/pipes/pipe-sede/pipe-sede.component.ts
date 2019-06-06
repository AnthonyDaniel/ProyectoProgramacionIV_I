import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterS'
})
export class FilterPipeS implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const sedes = [];
    for (const u of value) {
      var id = u.idSede + "";
      if (u.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 || u.provincia.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        id.toLowerCase().indexOf(arg.toLowerCase()) > -1 || u.canton.toLowerCase().indexOf(arg.toLowerCase()) > -1 || u.direccion.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        sedes.push(u);
      };
    };
    return sedes;
  }
}