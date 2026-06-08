# OniBus Express

Projeto full stack de reserva de passagens rodoviárias com interface em React e API em .NET 8. O foco atual do projeto está no fluxo visual completo do frontend, na listagem de viagens integrada com a API e na base inicial de persistência no backend.

## Tecnologias utilizadas

### Frontend
- React
- TypeScript
- Vite
- CSS
- Fetch API

### Backend
- .NET 8 Web API
- Entity Framework Core
- PostgreSQL
- Docker Compose
- Swagger / OpenAPI

## Estrutura de pastas

```text
onibus-express/
├── backend/
│   ├── OnibusExpress.Api/
│   ├── OnibusExpress.Tests/
│   ├── OnibusExpress.sln
│   └── docker-compose.yml
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
└── README.md
```

## Funcionalidades implementadas no frontend

- Tela de busca de passagens
- Listagem de viagens
- Integração da busca com `GET /api/viagens`
- Checkout visual da viagem selecionada
- Seleção de assento
- Formulário de dados do passageiro
- Confirmação visual da reserva
- Tela de reserva confirmada
- Tela de consulta de reserva
- Fluxo visual de cancelamento de reserva no frontend

## Funcionalidades implementadas no backend

- API .NET 8 estruturada com Entity Framework Core
- `AppDbContext` com entidades de viagem e reserva
- Seed inicial de viagens
- PostgreSQL via Docker Compose
- Swagger habilitado em ambiente de desenvolvimento
- Endpoints disponíveis para consulta de viagens

## Integração frontend + backend

O frontend consome o endpoint `GET /api/viagens` para carregar a lista de viagens disponíveis. A filtragem por origem, destino e data é aplicada no frontend após o retorno da API. Caso a API não esteja disponível, o frontend usa os mocks locais como fallback para não quebrar a experiência.

## Como rodar o backend

```bash
cd backend
docker compose up -d
dotnet run --project OnibusExpress.Api
```

## URL do Swagger

[http://localhost:5153/swagger](http://localhost:5153/swagger)

## Endpoints disponíveis

- `GET /api/viagens`
- `GET /api/viagens/{id}`

## Como rodar o frontend

```bash
cd frontend
npm install
npm run dev
```

## URL do frontend

[http://localhost:5173](http://localhost:5173)

## Variável de ambiente

Crie um `.env` local a partir do exemplo, se necessário:

```env
VITE_API_URL=http://localhost:5153
```

## Como validar a integração

1. Suba o backend com PostgreSQL.
2. Inicie o frontend.
3. Busque `São Paulo` → `Rio de Janeiro` na data `07/06/2026`.
4. Abra o DevTools no navegador.
5. Vá em `Network > Fetch/XHR`.
6. Confirme a chamada para `/api/viagens` com status `200`.

## Como rodar builds

```bash
cd backend && dotnet build
cd frontend && npm run build
```

## Status da implementação

- Implementado: frontend completo visual, backend inicial, Docker/PostgreSQL, Swagger, integração de busca de viagens
- Parcial: persistência de reservas no backend ainda não finalizada

## Próximos passos

- `POST /api/reservas`
- `GET /api/reservas/{codigo}`
- `DELETE /api/reservas/{codigo}`
- testes unitários
- integração completa da reserva com backend
