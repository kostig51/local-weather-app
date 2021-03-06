import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ICurrentWeatherData, ICurrentWeather } from '../interfaces'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    return this.httpClient
      .get<ICurrentWeatherData>(
        `${
          environment.baseUrl
        }api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${
          environment.appId
        }`
      )
      .pipe(map(data => this.transformToICurrentWeather(data)))
  }

  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `${environment.baseUrl}openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFarenheit(data.main.temp),
      description: data.weather[0].description,
    }
  }

  private convertKelvinToFarenheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67
  }
}
