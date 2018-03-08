import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ParentComponent } from './parent.component';
import { BoyComponent } from './boy/boy.component';
import { GirlComponent } from './girl/girl.component';
import { BabyComponent } from './baby/baby.component';


@NgModule({
  imports: [
    CommonModule,
    
    // otherwise the <router-outlet></router-outlet> will have error in parent.component
    RouterModule	
  ],
  declarations: [
  	ParentComponent,
  	BoyComponent,
  	GirlComponent,
  	BabyComponent
  ]
})
export class ParentModule { }
