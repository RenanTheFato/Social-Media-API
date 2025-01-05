# Social Media API

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white">

---

## 📋 About The Project

RESTful social media API developed with Node.js and TypeScript, using PostgreSQL as a database, JWT authentication and Fastify.


## 🚀 Features

- JWT authentication
- User CRUD
- Post System
- Comments on posts
- Follow users system

## 💻 Installation

### 1. Clone the repository
```bash
git clone https://github.com/RenanTheFato/Social-Media-API.git
cd Social-Media-API
```

### 2. Install the dependencies
```bash
npm install
```

### 3. Set the environment variables

> .env.example  ──> .env


### 4. Create the database and run
```bash
npx prisma migrate dev
```

### 5. Scripts available

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run server

```
## 📁 Project Structure

```
social-media-api/
├── prisma/
│   └── schema.prisma
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
  # You can access the API documentation via swagger on the route:
  http://localhost:[your-port]/docs
```

## 📄 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

## 👥 Contribution

### Share the project


## 📧 Contact

Renan - [GitHub](https://github.com/RenanTheFato)

Email - <a href="mailto:renan.santana007@hotmail.com">renan.santana007@hotmail.com</a>

Project Link: [https://github.com/RenanTheFato/Social-Media-API](https://github.com/RenanTheFato/Social-Media-API)