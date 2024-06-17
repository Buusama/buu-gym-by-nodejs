import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FastApiService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getData(): Promise<AxiosResponse<any>> {
    const url = `${this.configService.get('FAST_API_URL')}/data`;
    return await this.httpService
      .get(url)
      .toPromise()
      .then((res) => res.data);
  }

  async solverSchedule(data: any): Promise<AxiosResponse<any>> {
    const url = `${this.configService.get('FAST_API_URL')}/solve-schedule/`;
    return await this.httpService
      .post(url, data)
      .toPromise()
      .then((res) => res.data);
  }
}
