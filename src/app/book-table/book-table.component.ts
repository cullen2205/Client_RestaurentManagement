import { Component, NgModule, OnInit } from '@angular/core';
import { SelectItem } from '../components/api/selectitem';
import { SelectItemGroup } from '../components/api/selectitemgroup';

interface City {
    name: string,
    code: string
}

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: [
    './book-table.component.scss',
    './book-table.component.css',
  ]
})

export class BookTableComponent implements OnInit {

  selectedCountry: City;
  countries: any[];
  groupedCities: SelectItemGroup[];
  items: SelectItem[];
  item: string;

  constructor() {
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];
  }
  ngOnInit(): void {
  }
}
