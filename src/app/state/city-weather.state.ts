import {Action, createSelector, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ICityWeather} from '../models/weather-api.interface';
import {AddCityWeather} from './city-weather.actions';
import {patch, append} from '@ngxs/store/operators';

export interface CityWeatherStateModel {
  citiesWeather: ICityWeather[];
}

@State<CityWeatherStateModel>({
  name: 'cityWeather',
  defaults: {
    citiesWeather: [],
  },
})
@Injectable()
export class CityWeatherState {
  @Selector()
  static state(state: CityWeatherStateModel): CityWeatherStateModel {
    return state;
  }

  @Selector()
  static getCitiesWeather(state: CityWeatherStateModel) {
    return state?.citiesWeather;
  }

  @Selector()
  static getBarChartOptions(state: CityWeatherStateModel) {
    return state?.citiesWeather?.length === 0 ? null : {
      barChartLabels: state?.citiesWeather?.map((data) => data.city),
      barChartData: [
        {data: state?.citiesWeather?.map((data) => data.temperature), label: 'Temperatures', backgroundColor: 'rgba(30, 58, 138)'},
      ],
    };
  }

  static hasCity(cityname: string) {
    return createSelector([CityWeatherState], (state: CityWeatherStateModel) => {
      return state.citiesWeather.find((cityWeather) => cityWeather.city === cityname);
    });
  }

  @Action(AddCityWeather)
  AddCityWeather(ctx: StateContext<CityWeatherStateModel>, {cityWeather}: AddCityWeather) {
    ctx.setState(
        patch({
          citiesWeather: append([cityWeather]),
        }),
    );
  }
}
