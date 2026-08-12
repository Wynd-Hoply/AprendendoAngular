import { Component, signal, computed, effect, inject } from '@angular/core';
import { ProdutosService } from '../produtos.service';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  private produtosService = inject(ProdutosService);

  // ========== SIGNALS ==============
  // Agora vem tudo da API (iniciando vazio)

  // Controle de carregamento
  carregando = signal(true);

  produtos = signal<
  { nome: string; preco: number }[]
  >([]);


  exibirProduto(nome: string) {
    console.log('Produto selecionado:', nome);
    this.produtoSelecionado.set(nome);
  }

  produtoSelecionado = signal<string | null>(null);

// ==================== CARRINHO ==========================
  carrinho = signal<{ nome: string; preco: number }[]>([]);
  quantidadeCarrinho = computed(() => this.carrinho().length);

  // Computed
  totalProdutos = computed(() => this.produtos().length);
  valorTotal = computed(() => {
    return this.produtos().reduce((total, item) => total + item.preco, 0);
  });


  totalCarrinho = computed(() => {
    return this.carrinho().reduce((total, item) => total + item.preco, 0);
  });

  adicionarCarrinho(produto: { nome: string; preco: number }) {
    this.carrinho.update(listaAtual => [...listaAtual, produto]);
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
    this.carregando.set(true);

    this.produtosService.buscarProdutos()
    .subscribe({
      next: (dados) => {
        const produtos = this.produtosService.transformarProdutos(dados);
        this.produtos.set(produtos);
        this.carregando.set(false); // Finaliza o load
      },

      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        this.carregando.set(false); // Evita load inf
      }
    })
  }
}
