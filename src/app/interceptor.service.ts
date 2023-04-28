import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";


export class InterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request going...')
    return next.handle(req)
  }

}