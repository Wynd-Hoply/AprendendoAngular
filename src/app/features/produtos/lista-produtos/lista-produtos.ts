import { Component, signal, computed, effect, inject } from '@angular/core';
import { ProdutosService } from '../../../core/services/produtos.service';
import { Produto } from '../produto/produto';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, MatButtonModule, MatCardModule],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  private produtosService = inject(ProdutosService);

  carrinhoFacade = inject(CarrinhoFacade);

  quantidadeCarrinho = this.carrinhoFacade.quantidade;
  totalCarrinho = this.carrinhoFacade.total;

  // ========== SIGNALS ==============
  // Agora vem tudo da API (iniciando vazio)

  erro = signal<string | null>(null);
  // Controle de carregamento
  carregando = signal(true);

  produtos = signal<{ nome: string; preco: number }[]>([]);

  exibirProduto(nome: string) {
    console.log('Produto selecionado:', nome);
    this.produtoSelecionado.set(nome);
  }

  produtoSelecionado = signal<string | null>(null);

  // ==================== CARRINHO ==========================

  // Computed
  totalProdutos = computed(() => this.produtos().length);
  valorTotal = computed(() => {
    return this.produtos().reduce((total, item) => total + item.preco, 0);
  });

  adicionarAoCarrinho(produto: { nome: string; preco: number }) {
    this.carrinhoFacade.adicionarProduto(produto);
  }

  adicionarProduto() {
    this.produtos.update((listaAtual) => [...listaAtual, { nome: 'Teclado', preco: 250 }]);
  }
  substituirProdutos() {
    this.produtos.set([{ nome: 'Produto novo', preco: 999 }]);
  }

  // CONSTRUCTOR
  constructor() {
    // carrega a API
    this.carregarProdutos();

    effect(() => {
      console.log('Lista de produtos alterada:', this.produtos());
    });
    effect(() => {
      console.log('Valor total atualizado:', this.valorTotal());
    });
    effect(() => {
      if (typeof document !== 'undefined') {
        document.title = `(${this.totalProdutos()}) Minha Loja`;
      }
    });
  }

  carregarProdutos() {
    // Inicia o load
    this.erro.set(null); // Limpa o erro anterior
    this.carregando.set(true); // Ativa o load

    this.produtosService.buscarProdutos().subscribe({
      next: (dados) => {
        const produtos = this.produtosService.transformarProdutos(dados);
        this.produtos.set(produtos);
        this.carregando.set(false); // Finaliza o load
      },

      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        this.erro.set('Erro ao carregar produtos. Verifique sua conexão e tente novamente.');
        this.carregando.set(false); // Evita load inf
      },
    });
  }
}
