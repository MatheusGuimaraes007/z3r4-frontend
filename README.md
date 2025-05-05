
# 🖥️ Z3R4 - Frontend Conversacional da FURIA

Este é o frontend oficial do projeto **Z3R4**, o chatbot da torcida da FURIA Esports. Esta interface web conecta fãs ao universo do time de CS:GO por meio de um design moderno, responsivo e com espírito de arquibancada. O app permite cadastro, login e interação com um agente inteligente que responde perguntas sobre o time com base em dados reais.

🔗 Acesse a aplicação: [https://z3r4.vercel.app/](https://z3r4.vercel.app/)

---

## 🎯 Objetivo

Oferecer uma interface fluida e estilizada para os torcedores da FURIA interagirem com o chatbot Z3R4. A aplicação web tem como foco tornar o acesso a informações sobre o time simples, intuitivo e emocionante.

---

## 🛠️ Tecnologias Utilizadas

- **Vue.js 3** — Framework principal de front-end
- **Tailwind CSS** — Estilização e responsividade
- **Vue Router** — Gerenciamento de rotas SPA
- **Vite** — Build tool leve e rápida
- **dotenv** — Variáveis de ambiente para API

---

## 📸 Telas do Projeto

As interfaces foram desenhadas com foco em acessibilidade e responsividade:

- Página de Login e Cadastro (desktop e mobile)
- Tela de chat com Z3R4 (respostas da IA)
- Elementos visuais que expressam a identidade da FURIA

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
VITE_URL_TEST=http://localhost:xxxx
VITE_URL_PRODUCTION=https://sua-api-em-producao.com
```

---

## 🚀 Como Rodar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/MatheusGuimaraes007/z3r4-frontend.git
cd z3r4-frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo `.env` com as variáveis acima.

4. Rode o projeto:

```bash
npm run dev
```

---

## 📁 Estrutura do Projeto

```
z3r4-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── router/
│   ├── App.vue
│   └── main.js
├── .env
├── index.html
└── package.json
```

---

## 👤 Autor

Desenvolvido por **Matheus Guimarães**  
🔗 [Repositório no GitHub](https://github.com/MatheusGuimaraes007/z3r4-frontend)

