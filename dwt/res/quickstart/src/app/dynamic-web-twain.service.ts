import { Injectable, Optional } from '@angular/core';
import Dynamsoft from 'dwt';

@Injectable({
  providedIn: 'root'
})
export class DynamicWebTWAINService {

  constructor() {
    Dynamsoft.DWT.ProductKey = "LICENSE-KEY";
    Dynamsoft.DWT.ResourcesPath = "assets/dynamic-web-twain";
  }
}
