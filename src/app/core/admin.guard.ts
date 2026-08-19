import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthFacade } from './facades/auth.facade';

export const adminGuard: CanActivateFn = () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  // Primeiro verifica se o usuario está logado.
  // Se não estiver logado, redireciona para a página de login.
  if (!authFacade.estaLogado()) {
    return router.createUrlTree(['/login']);
  }

  // Verifica se o usuário é admin.
  // Se estiver logado, mas não for admin, redireciona para a página de produtos.
  if (!authFacade.ehAdmin()) {
    return router.createUrlTree(['/produtos']);
  }

  // Se estiver logado e for admin, libera o acesso.
  return true;
};
