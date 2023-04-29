import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";


export class InterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
   const sureQ = req.clone({
      headers: req.headers.append('auth-me', 'authed nows')
    })
    console.log('Request going...')
    return next.handle(sureQ)
  }

}