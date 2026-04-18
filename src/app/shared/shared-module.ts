import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonTheme } from './button-theme/button-theme';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ButtonTheme
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  exports: [
    ButtonTheme
  ]
})
export class SharedModule {

}
