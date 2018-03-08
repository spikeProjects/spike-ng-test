import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Routes } from '@angular/router';

import { ParentComponent } from './parent.component';
import { BabyComponent } from './baby/baby.component';
import { BoyComponent } from './boy/boy.component';
import { GirlComponent } from './girl/girl.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'baby', pathMatch: 'full' },
	{
		path: 'baby',
		component: BabyComponent
	},
	{
		path: 'boy',
		component: BoyComponent
	},
	{
		path: 'girl',
		component: GirlComponent
	}
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  	BabyComponent,
  	BoyComponent,
  	GirlComponent
  ]
})
export class ParentRoutingModule { }
