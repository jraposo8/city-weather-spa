export interface IWeatherApi {
    temperature: number;
    sunrise: string;
    sunset: string;
}

export interface ICityWeather extends IWeatherApi{
    city: string;
}
