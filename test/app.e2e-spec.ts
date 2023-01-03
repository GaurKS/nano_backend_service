import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from 'src/app.service';
import { AppRepositoryTag } from 'src/app.repository';
import { AppRepositoryHashmap } from 'src/app.repository.hashmap';
import { mergeMap } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

// describe('AppService', () => {
//   let appService: AppService;
 
//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       providers: [
//         { provide: AppRepositoryTag, useClass: AppRepositoryHashmap },
//         AppService,
//       ],
//     }).compile();
 
//     appService = app.get<AppService>(AppService);
//   });
 
//   describe('retrieve', () => {
//     it('should retrieve the saved URL', done => {
//       const url = 'docker.com';
//       appService.shorten(url)
//         .pipe(mergeMap(hash => appService.retrieve(hash)))
//         .pipe(tap(retrieved => expect(retrieved).toEqual(url)))
//         .subscribe({ complete: done })
//     });
//   });
// });
