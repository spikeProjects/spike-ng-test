import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Routes, RouterModule } from '@angular/router';

import { DynamicParentComponent } from './dynamic-parent.component';
import { BabyComponent } from './baby/baby.component';
import { BoyComponent } from './boy/boy.component';
import { GirlComponent } from './girl/girl.component';

const routes: Routes = [
	{ 
		path: '', 
		component: DynamicParentComponent,
		children: [
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
			},
			{
				path: '', redirectTo: '/dynamic-parent/baby', pathMatch: 'full' 
			},
		]
	}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
  	RouterModule
  ]
})
export class DynamicParentRoutingModule { }
