import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { AuthService } from '../../../core/services/auth.services';

import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { AuthFacade } from '../../../core/facades/auth.facade';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private carrinhoFacade = inject(CarrinhoFacade);
  private authFacade = inject(AuthFacade);
  private router = inject(Router);
  quantidade = this.carrinhoFacade.quantidade;
  estaLogado = this.authFacade.estaLogado;
  ehAdmin = this.authFacade.ehAdmin;
  usuarioAtual = this.authFacade.usuarioAtual;
  sair() {
    this.authFacade.sair();
    this.router.navigateByUrl('/login');
  }
}
