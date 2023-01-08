import { Inject, Injectable } from '@nestjs/common';
import { AppRepository, AppRepositoryTag } from './app.repository';
import { Observable, map } from 'rxjs';
import { ErrorResponse, ShortResponse, base62, generateObjectId } from './types.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject(AppRepositoryTag) private readonly appRepository: AppRepository,
  ) {}

  ping(): ShortResponse {
    const res = {
      statusCode: 200,
      message: 'Service is up and running...🚀🚀',
      data: null
    }
    return res;
  }

  shorten(
    url: string,
    // custom: string | undefined = null
  ): ShortResponse | ErrorResponse {

    // generating a hash for the given url
    // const hash = Math.random().toString(36).slice(7);
    // if ( custom !== null ){
    //   const valid = this.appRepository.get(custom).pipe(map(url => ({ url })));
    //   console.log("valid: ", valid);
    // }
    // return hash;
    // return this.appRepository.put(hash, url).pipe(map(() => hash)); 

    try {
      const hash = generateObjectId();
      this.appRepository.put(hash, url).pipe(map(() => hash));
  
      const res = {
        statusCode: 201,
        message: 'Success',
        data: 'localhost:8000/' + hash
      }
      return res; 

    }
    catch (err) {
      console.log("Error while shortening url: ", err);
      return {
        statusCode: 403,
        message: err
      }
    }
  }
 
  retrieve(
    hash: string
  ): Observable<string> {

    // const id = base62.decode(hash);
    return this.appRepository.get(hash);
  }
}