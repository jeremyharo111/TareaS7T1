import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LayoutComponent } from './components/layout/layout';
import { ProductosComponent } from './components/productos/productos';
import { ProductoFormModalComponent } from './components/modals/producto-form-modal/producto-form-modal';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal';
import { ErrorModalComponent } from './components/modals/error-modal/error-modal';

@NgModule({
  declarations: [
    App,
    LayoutComponent,
    ProductosComponent,
    ProductoFormModalComponent,
    ConfirmModalComponent,
    ErrorModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
