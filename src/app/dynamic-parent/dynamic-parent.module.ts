import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicParentRoutingModule } from './dynamic-parent-routing.module';
import { DynamicParentComponent } from './dynamic-parent.component';
import { BabyComponent } from './baby/baby.component';
import { BoyComponent } from './boy/boy.component';
import { GirlComponent } from './girl/girl.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicParentRoutingModule
  ],
  declarations: [
  	DynamicParentComponent,
  	BabyComponent, 
  	BoyComponent, 
  	GirlComponent
  ]
})
export class DynamicParentModule { }
