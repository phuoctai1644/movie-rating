import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = environment.accessToken;

  if (!authToken) {
    return next(req)
  }

  const headers = {
    'Authorization': `Bearer ${authToken}`,
  }
  req = req.clone({
    setHeaders: headers
  });
  return next(req);
};
