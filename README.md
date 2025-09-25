# Simulador de Investimentos - Primo Invest Calc

![CI/CD Pipeline](https://github.com/alencarftc/primo-invest-calc/actions/workflows/main.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Um simulador de investimentos moderno e interativo, construído com Next.js e TypeScript. A aplicação permite que os usuários calculem e comparem a rentabilidade de um investimento inicial somado a aportes mensais, contrastando a performance da Taxa Selic com a do Fundo Arca.

![Captura de tela do Simulador de Investimentos](https://i.imgur.com/kYQ101e.png)

## ✨ Features

-   **Simulação Dinâmica**: Os cálculos são atualizados em tempo real conforme o usuário ajusta os valores nos sliders.
-   **Componentes Acessíveis**: O componente de Slider foi desenvolvido seguindo as diretrizes de acessibilidade WAI-ARIA, garantindo usabilidade via teclado e para leitores de tela.
-   **Design Responsivo**: Interface adaptada para uma experiência de usuário consistente em desktops e dispositivos móveis.
-   **Qualidade de Código**: O projeto é mantido com ferramentas de alta qualidade como Biome (linting e formatação) e Lefthook (Git hooks) para garantir a consistência do código.
-   **Componentização com Storybook**: Os componentes de UI são desenvolvidos e documentados de forma isolada utilizando o Storybook.

## 🛠️ Tech Stack

A aplicação foi construída com um conjunto de tecnologias modernas focadas em performance, qualidade e experiência do desenvolvedor:

-   **Framework**: [Next.js](https://nextjs.org/) (com Pages Router e Turbopack)
-   **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
-   **Estilização**: CSS Modules
-   **Testes**: [Jest](https://jestjs.io/) e [React Testing Library](https://testing-library.com/)
-   **Qualidade de Código**: [Biome](https://biomejs.dev/) (Linting e Formatação)
-   **Desenvolvimento de Componentes**: [Storybook](https://storybook.js.org/)
-   **Gerenciador de Pacotes**: [pnpm](https://pnpm.io/)
-   **Git Hooks**: [Lefthook](https://github.com/evilmartians/lefthook)
-   **CI/CD**: GitHub Actions

## 📂 Estrutura do Projeto

A estrutura de pastas foi organizada para promover a modularidade e a escalabilidade:

```
primo-invest-calc/
├── .github/              # Workflows de CI/CD (GitHub Actions)
├── .lefthook/            # Configuração dos Git Hooks
├── public/               # Arquivos estáticos (imagens, fontes)
├── scripts/              # Scripts de automação (build, deploy, etc.)
├── stories/              # Arquivos de histórias do Storybook (*.stories.tsx)
├── tests/                # Utilitários de testes e configurações do Jest
├── types/                # Definições de tipos globais do TypeScript (*.d.ts)
└── main/
    └── modules/          # Contêiner para os principais módulos da aplicação
        ├── core/         # Funcionalidades centrais e compartilhadas (hooks, utils, providers)
        ├── ds/           # Design System: componentes de UI, tokens e contratos de estilo
        └── app/          # Módulo principal da aplicação de investimento
            └── InvestmentCalc/   # Feature específica do Simulador de Investimento
                ├── api/          # Rotas de API (server-side handlers)
                ├── components/   # Componentes React de UI, reutilizáveis ('dumb components')
                ├── containers/   # Componentes que gerenciam estado e lógica ('smart components')
                ├── models/       # Definições de tipos para estruturas de dados (ex: InvestmentForm)
                ├── pages/        # Páginas da aplicação e sistema de rotas (Next.js)
                ├── rules/        # Lógica de negócio e regras de cálculo do simulador
                └── utils/        # Funções utilitárias específicas desta feature
```

## 🚀 Começando

Siga os passos abaixo para configurar e rodar o projeto localmente.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 20.x ou superior)
-   [pnpm](https://pnpm.io/installation)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/alencarftc/primo-invest-calc.git](https://github.com/alencarftc/primo-invest-calc.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd primo-invest-calc
    ```

3.  **Instale as dependências:**
    ```bash
    pnpm install
    ```

4.  **Rode o servidor de desenvolvimento:**
    ```bash
    pnpm dev
    ```

Agora, abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação em funcionamento.

## 📜 Scripts Disponíveis

-   `pnpm dev`: Inicia a aplicação em modo de desenvolvimento com Turbopack.
-   `pnpm build`: Gera a build de produção da aplicação.
-   `pnpm start`: Inicia um servidor de produção com a build gerada.
-   `pnpm test`: Roda a suíte de testes unitários com Jest.
-   `pnpm test:watch`: Roda os testes em modo interativo (watch mode).
-   `pnpm lint`: Verifica e corrige problemas de lint e formatação com o Biome.
-   `pnpm storybook`: Inicia o ambiente do Storybook para visualização dos componentes.

## ✅ Testes

Os testes são fundamentais para garantir a qualidade e a estabilidade da aplicação. Utilizamos Jest e React Testing Library para testar os componentes e a lógica de negócio.

Para rodar todos os testes, execute:
```bash
pnpm test
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você tem alguma ideia para melhorar o projeto, sinta-se à vontade para seguir os passos abaixo:

1.  Faça um **Fork** do repositório.
2.  Crie uma nova **Branch** (`git checkout -b feature/sua-feature`).
3.  Faça o **Commit** das suas mudanças (`git commit -m 'Adiciona nova feature'`).
4.  Faça o **Push** para a sua branch (`git push origin feature/sua-feature`).
5.  Abra um **Pull Request**.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.