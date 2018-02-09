import {NgModule, ApplicationRef, Injector} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

/*
 * Platform and Environment providers/directives/pipes
 */
import { smartAdminRoutes } from './smart-admin.routing';
// App is our top level component
import { SmartAdminComponent } from './smart-admin.component';
import { APP_RESOLVER_PROVIDERS } from './smart-admin.resolver';
import { AppState, InternalStateType } from './smart-admin.service';

// Core providers
import {CoreModule} from './core/core.module';
import {SmartadminLayoutModule} from './shared/layout/layout.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import {RouterModule} from '@angular/router';
import {AuthExpiredInterceptor} from '../blocks/interceptor/auth-expired.interceptor';
import {ErrorHandlerInterceptor} from '../blocks/interceptor/errorhandler.interceptor';
import {JhiEventManager} from 'ng-jhipster';
import {AuthInterceptor} from '../blocks/interceptor/auth.interceptor';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {NotificationInterceptor} from '../blocks/interceptor/notification.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ SmartAdminComponent ],
  declarations: [
      SmartAdminComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ModalModule.forRoot(),
    CoreModule,
    SmartadminLayoutModule,
    RouterModule.forChild(smartAdminRoutes)
  ],
  exports: [
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    // ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class SmartAdminModule {
  // constructor(public appRef: ApplicationRef, public appState: AppState) {}

}
