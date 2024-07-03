import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HybridRandomizerService } from './randomizer_service/hybrid-randomizer.service';

@Injectable()
export class ReqInterceptor implements HttpInterceptor {
  constructor(private hrdService: HybridRandomizerService) {}

  excludeURLlist = [
    // environment.API_URL + 'mastermodule/commonFileuploaddata',
  ];

  // passing payload to API
  handleReq(
    req: HttpRequest<any>,
    next: HttpHandler,
    excludeFound: boolean = false
  ): Observable<HttpEvent<any>> {
    // form data encrypt keys, values, files, images - test on decrypt, if fails add to exclusion url
    // get request test

    console.log(
      'URL:',
      req.url,
      'Method:',
      req.method,
      'Body:',
      req.body,
      'Headers:',
      req.headers.get('Content-Type'),
      'IsFormData:',
      req.body instanceof FormData,
      'BodyLength:',
      req.body.length
      // 'EncryptedBody:',
      // this.ardService.applyRandomizer('{}'),
      // 'DecryptedBody:',
      // this.ardService.removeRandomizer("ZMc9UqN0RvNtJf2w9ECXwg==")
    );

    if (!excludeFound) {
      const contentType = req.headers.get('Content-type');

      if (req.method == 'GET') {
        // TODO: to be coded
        // if (req.url.indexOf('?') > 0) {
        //   let encriptURL =
        //     req.url.substr(0, req.url.indexOf('?') + 1) +
        //     this.ardService.applyRandomizer(
        //       req.url.substr(req.url.indexOf('?') + 1, req.url.length)
        //     );
        //   const cloneReq = req.clone({
        //     url: encriptURL,
        //   });
        //   console.log({ cloneReq });
        //   return next.handle(cloneReq);
        // }
      } else if (req.method == 'POST') {
        if (contentType == 'application/json') {
          const cloneReq = req.clone({
            body: {
              data: encodeURIComponent(
                this.hrdService.applyRandomizer(JSON.stringify(req.body))
              ),
            },
          });
          return next.handle(cloneReq);
        }

        // let data = req.body as FormData;
        // TODO: to be coded
        // console.log({ data });
      }
    }
    return next.handle(req);
  }

  handleResponse(
    response: HttpResponse<any>,
    excludeFound: boolean = false
  ): HttpResponse<any> {
    if (!excludeFound) {
      const contentType = response.headers.get('Content-type');
      // console.log({ contentType, headers: response.headers });

      // only for success response
      if (String(response.status).startsWith('2')) {
        // if(response.method)
        if (contentType == 'application/json') {
          return response.clone({
            body: {
              data: JSON.parse(
                this.hrdService.removeRandomizer(
                  decodeURIComponent(response.body.data)
                )
              ),
            },
          });
        }
      }
    }
    return response;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let excludeFoundList = this.excludeURLlist.filter((url_el) => {
      return req.url.includes(url_el);
    });

    let excludeFound = excludeFoundList && excludeFoundList.length > 0;

    return this.handleReq(req, next, excludeFound)
      .pipe(
        tap((evt: HttpEvent<any>) => {
          // default value of evt for a request (not a response)
          // => evt: { type: 0; }
          if (evt instanceof HttpResponse) {
            // any process not affecting response comes here
            // console.log({ evt });
            // console.log('---> status:', evt.status);
            // console.log('---> filter:', req.params.get('filter'));
          }
        })
      )
      .pipe(
        map((response: HttpEvent<any>) => {
          if (response instanceof HttpResponse) {
            // any process affecting response comes here
            return this.handleResponse(response, excludeFound);
          }
          return response;
        })
      );
  }
}
