import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, map, of } from 'rxjs';
import { ShortResponse, ErrorResponse, isValidUrl } from './types.interface';

// interface ShortenResponse {
//   hash: string;
// }
 
// interface ErrorResponse {
//   statusCode: number;
//   error: string;
// }

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * ping test to check the service availablity
   * @returns the status of current serivce 
   */
  @Get('ping')
  getHello(): ShortResponse {
    return this.appService.ping();
  }

  /**
   * method to shorten given url
   * @returns the shorten url for redirecting users
   */
  @Post('shorten')
  shorten(
    @Body('url') url: string,
    // @Body('custom') custom: string
  ){

    // Check the request body for valid url and format
    if ( !url || !isValidUrl(url) ) {
      return of({ 
        statusCode: 400,
        message: `No url provided. Please provide in the body. E.g. {'url':'https://google.com'}`, 
      });
    }

    // shorten url method
    // return this.appService.shorten(url).pipe(map(hash => ({ hash })));
    return this.appService.shorten(url)
  }
 
  @Get(':hash')
  @Redirect()
  retrieveAndRedirect(
    @Param('hash') hash
  ): Observable<{ url: string }> {
    return this.appService.retrieve(hash).pipe(map(url => ({ url })));
  }
}
