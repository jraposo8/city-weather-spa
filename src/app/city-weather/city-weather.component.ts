import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CityWeatherService } from '../services/city-weather.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngxs/store';
import { CityWeatherState } from '../state/city-weather.state';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ICityWeather } from '../models/weather-api.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss'],
})
export class CityWeatherComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  chartData$: Observable<any> = this.store.select(
    CityWeatherState.getBarChartOptions,
  );
  displayedColumns: string[] = ['city', 'temperature', 'sunrise', 'sunset'];
  tableDataSource!: MatTableDataSource<ICityWeather>;
  @ViewChild('searchInput', { static: false })
  searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  destroy$ = new Subject<void>();

  constructor(
    private cityWeatherService: CityWeatherService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store
      .select(CityWeatherState.getCitiesWeather)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.tableDataSource = new MatTableDataSource(data);
        this.tableDataSource.sort = this.sort;
      });
  }

  searchCity() {
    this.cityWeatherService
      .getCityWeather(this.searchInput.nativeElement.value)
      .subscribe(() => (this.searchInput.nativeElement.value = ''));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
