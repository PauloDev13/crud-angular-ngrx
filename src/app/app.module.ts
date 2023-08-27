import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAssociateComponent } from './component/add-associate/add-associate.component';
import { AssociateListingComponent } from './component/associate-listing/associate-listing.component';
import { MaterialModule } from './shared/material.module';
import { AssociateEffects } from './store/associate/associate.effects';
import { AssociateReducer } from './store/associate/associate.reducer';
import { AppEffects } from './store/common/app.effects';

@NgModule({
  declarations: [
    AppComponent,
    AssociateListingComponent,
    AddAssociateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ associate: AssociateReducer }, {}),
    EffectsModule.forRoot([AssociateEffects, AppEffects]),
    // StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
