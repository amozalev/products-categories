import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Observable} from 'rxjs';

@Injectable()
export class CartGuardService implements CanActivate {
  constructor(private productService: ProductService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.productService.cartCount) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
