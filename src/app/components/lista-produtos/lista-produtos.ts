import { Component } from '@angular/core';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = [
    { nome: 'Notebook', preco: 1500 },
    { nome: 'Mouse', preco: 150 },
    { nome: 'Teclado Mecânico', preco: 320 },
    { nome: 'Monitor 24"', preco: 980 },
    { nome: 'Headset Gamer', preco: 280 },
    { nome: 'Webcam Full HD', preco: 240 },
    { nome: 'SSD 1TB', preco: 450 },
    { nome: 'HD Externo 2TB', preco: 520 },
    { nome: 'Pen Drive 64GB', preco: 65 },
    { nome: 'Cadeira Gamer', preco: 1250 },
    { nome: 'Mesa para Computador', preco: 700 },
    { nome: 'Impressora', preco: 850 },
    { nome: 'Caixa de Som Bluetooth', preco: 220 },
    { nome: 'Smartphone', preco: 2300 },
    { nome: 'Tablet', preco: 1800 },
    { nome: 'Carregador Portátil', preco: 190 },
    { nome: 'Roteador Wi-Fi', preco: 350 },
    { nome: 'Microfone USB', preco: 410 },
    { nome: 'Câmera Digital', preco: 2900 },
    { nome: 'Smartwatch', preco: 950 },
  ];
  exibirProduto(nome: string) {
    console.log('Produto selecionado:', nome);
  }
}
