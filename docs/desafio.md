# Calculadora de Investimentos - Grupo Primo

## Introdução

Este é um projeto de teste para vaga de FrontEnd para o Grupo Primo, objetivo é ajudar investidores como João a visualizar o rendimento de seus investimentos ao longo do prazo. Nossa calculadora permite que o cliente informe um valor e um prazo, comparando o desempenho de um Fundo Arca do Grupo Primo com a Taxa Selic.

## Regras e Considerações

- A Taxa Selic é assumida como 9,25% ao ano, enquanto o Fundo Arca rende 18% ao ano.
- Um ano é considerado como tendo 252 dias úteis.
- A rentabilidade ocorre apenas em dias úteis, desconsiderando feriados.
- Impostos sobre os investimentos são desconsiderados.
- A fórmula para o cálculo da rentabilidade é `M = P . (1 + i) ^ t/252`, onde M é o montante final, P é o principal, i é a taxa de rendimento e t é o prazo em dias úteis.

## Design

Apresentamos alguns modelos que podem servir como referência para a interface da calculadora. Sinta-se à vontade para escolher e implementar um deles.

Link para o Figma:

https://www.figma.com/file/gKHVPjyRLAv0YW62CVI593/Calculadora-Grupo-Primo?type=design&node-id=1-254&mode=design&t=hCUspeVeOKVA855g-0

## Tecnologia e Frameworks

Você deve utilizar **Next.js** como framework principal para o desenvolvimento deste teste.

- Linguagem: TypeScript ou JavaScript (preferencialmente TypeScript)
- Framework: Next.js

## Diferenciais

- Implementação de testes de unidade.
- Testes de interface para garantir a usabilidade.
- Documentação detalhada do código.
- Utilizar pelo menos um componente/página com SSR (Server Side Rendering)

## Requisitos

- Desenvolver uma versão web e mobile da calculadora utilizando Next.js (pode ser responsivo ou utilizar recursos do Next.js para mobile).
- Incluir um README com instruções passo-a-passo para a execução do projeto Next.js.
- Cumprir o prazo estipulado de 2 a 3 dias corridos.
- Entregar o projeto em um repositório público (GitHub, GitLab ou Bitbucket).
