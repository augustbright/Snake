import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from './window/window.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [WindowComponent],
  imports: [CommonModule, MatButtonModule, MatCardModule],
  exports: [WindowComponent],
})
export class GameModule {}
