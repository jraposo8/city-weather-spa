import {ICityWeather} from '../models/weather-api.interface';

export class AddCityWeather {
  static readonly type = '[CityWeather] AddCityWeather';
  constructor(public cityWeather: ICityWeather ) {}
}
