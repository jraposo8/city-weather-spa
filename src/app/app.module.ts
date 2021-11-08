import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {CityWeatherComponent} from './city-weather/city-weather.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {NgxsModule} from '@ngxs/store';
import {environment} from 'src/environments/environment.prod';
import {NgChartsModule} from 'ng2-charts';
import {CityWeatherState} from './state/city-weather.state';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
@NgModule({
  declarations: [
    AppComponent,
    CityWeatherComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    NgxsModule.forRoot(
        [
          CityWeatherState,
        ],
        {
          developmentMode: true,
          selectorOptions: {
          // These Selector Settings are recommended in preparation for NGXS v4
          // (See https://www.ngxs.io/concepts/select#selector-options)
            suppressErrors: false,
            injectContainerState: false,
          },
        },
    ),
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
