import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParallaxDirective } from './parallax.directive';
import { InViewportModule } from 'ng-in-viewport';
import { ScrollEventModule } from 'ngx-scroll-event';
import { WheelDirective } from './wheel.directive';

@NgModule({
  declarations: [
    AppComponent,
    ParallaxDirective,
    WheelDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InViewportModule,
    ScrollEventModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
