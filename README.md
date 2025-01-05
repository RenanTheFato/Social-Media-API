<h1 align='center'>
  Social Media API
</h1>

<div align="center">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white">
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
</div>

## 📋 Sobre o Projeto

API RESTful de mídia social desenvolvida com Node.js e TypeScript, utilizando PostgreSQL como banco de dados e autenticação JWT.


## 🚀 Funcionalidades

- Autenticação JWT
- CRUD de usuários
- CRUD de posts
- Comentários em posts
- Sistema de likes
- Feed personalizado
- Sistema de seguir usuários

## 🛠️ Tecnologias

- TypeScript
- Node.js
- Express.js
- PostgreSQL
- TypeORM
- JWT
- Jest (Testes)

## 💻 Instalação

1. Clone o repositório
```bash
git clone https://github.com/RenanTheFato/Social-Media-API.git
cd Social-Media-API
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Configure suas variáveis no arquivo .env
```

4. Scripts disponíveis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm run server

# Testes
npm run test
```
## 📁 Project Structure

```
social-media-api/
├── src/
│   ├── controllers/
│   │   ├── comments/
│   │   │   ├── CreateCommentController.ts
│   │   │   └── DeleteCommentController.ts
│   │   ├── posts/
│   │   │    ├── CreatePostController.ts
│   │   │    ├── DeletePostController.ts
│   │   │    └── SearchPostController.ts
│   │   └── users/
│   │       ├── CreateUserController.ts
│   │       ├── DeleteUserController.ts
│   │       ├── GetUserController.ts
│   │       ├── SinginController.ts
│   │       ├── UpdateUserEmailController.ts
│   │       ├── UpdateUsernameController.ts
│   │       └── UpdateUserPasswordController.ts
│   ├── lib/
│   │   ├── prisma.ts
│   ├── middlewares/
│   │   ├── authentication.ts
│   └── services/
│       ├── comments/
│       │   ├── CreateCommentService.ts
│       │   └── DeleteCommentService.ts
│       ├── posts/
│       │    ├── CreatePostService.ts
│       │    ├── DeletePostService.ts
│       │    └── SearchPostService.ts
│       └── users/
│            ├── CreateUserService.ts
│            ├── DeleteUserService.ts
│            ├── GetUserService.ts
│            ├── SinginService.ts
│            ├── UpdateUserEmailService.ts
│            ├── UpdateUsernameService.ts
│            └── UpdateUserPasswordService.ts
├── routes.ts
├── server.ts
├── .env-example
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## 📚 API Documentation

```bash
  # You can access the API documentation via swagger on the route
  http://localhost[your-port]/docs
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição

1. Fork o projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📧 Contato

Renan - [GitHub](https://github.com/RenanTheFato)

Link do projeto: [https://github.com/RenanTheFato/Social-Media-API](https://github.com/RenanTheFato/Social-Media-API)