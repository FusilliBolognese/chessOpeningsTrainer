import { Pipe, PipeTransform } from '@angular/core';
import { ChessOpeningTree } from './models/chess-opening-tree.model';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(dateString: string, ...args: unknown[]): string {
    return formatDate(dateString, 'medium', 'fr-FR', 'FR');
  }
}

@Pipe({
  name: 'openingNameFormat'
})
export class ChessOpeningNameFormatPipe implements PipeTransform {

  transform(value: ChessOpeningTree, ...args: unknown[]): string {
    return '[' + value.eco_code + '] - ' + value.opening_name;
  }
}
