import { Injectable, Optional } from '@angular/core';
import Dynamsoft from 'dwt';

@Injectable({
  providedIn: 'root'
})
export class DynamicWebTWAINService {

  constructor() {
    Dynamsoft.DWT.ProductKey = "t01529gIAAEF7y96DFtTsdlAY26PrA+PaDHGza3MBVgONeEy5epB0gDaCfTXfDdj889kjxcmeUTqFggXqmXQiD6HCOpbc6nEbarlhTAxuLtq7kk0SDL/A3YEOgFhkD/yVH9D1czurEABnQBPg3fgDjkN+e8WTkBFwBjQBxyEDmHSy2TfJQ0HbCElTwBnQBIyQAdQqVJqUJymPngM=";
    Dynamsoft.DWT.ResourcesPath = "assets/dynamic-web-twain";
  }
}
