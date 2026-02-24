# Guia de Colaboração - MarketAnki

Este documento define como os papéis de **Data Science / Backend** e **Desenvolvimento Frontend** interagem no projeto.

## 🏗️ Divisão de Responsabilidades

### 🧠 Data Science & Backend (DS/BE)
- **Local:** `src/services/`, `src/store/`, `src/hooks/`
- **Responsabilidade:** 
    - Integração com APIs financeiras (Brapi, CVM).
    - Lógica do algoritmo de repetição espaçada (SRS).
    - Processamento de IA para geração de flashcards.
    - Manutenção do **Estado Global** (Zustand).
    - Garantir que todos os dados cheguem tipados e limpos para o frontend.

### 🎨 Frontend (UI/UX)
- **Local:** `app/`, `src/components/`, `src/screens/`
- **Responsabilidade:**
    - Implementação de layouts e navegação (Expo Router).
    - Interatividade e animações.
    - Consumo dos dados através dos **Hooks** e **Store**.
    - Feedback visual de estados de carregamento e erro.

## 🤝 Contrato de Dados (The Contract)

Para evitar conflitos, seguimos estas regras:

1.  **Tipagem Estrita:** Todos os dados expostos pelo DS/BE devem ter interfaces TypeScript definidas em `src/types/` (ou no próprio store se forem locais).
2.  **Abstração Total:** O Frontend **nunca** deve fazer um `fetch` diretamente. Ele deve usar os métodos da Store (`useMarketStore`) ou hooks customizados.
3.  **Mock First:** Se o DS/BE ainda não terminou uma feature, ele deve fornecer dados de "mock" na store para que o Frontend possa trabalhar na UI sem bloqueios.

## 🛠️ Fluxo de Trabalho Recomendado

1.  **DS/BE** define a interface do dado (ex: `StockStatistic`).
2.  **DS/BE** implementa o serviço e popula a Store com dados reais ou mocks.
3.  **Frontend** cria os componentes visuais consumindo essa Store.
4.  **Ambos** validam a integração no Expo Go.

---
*MarketAnki - Transformando informação em conhecimento financeiro.*
