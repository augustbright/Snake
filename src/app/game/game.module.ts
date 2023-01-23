import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from './window/window.component';

@NgModule({
  declarations: [WindowComponent],
  imports: [CommonModule],
  exports: [WindowComponent],
})
export class GameModule {}
