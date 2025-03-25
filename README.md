## Getting Started for Nextjs 15 boilerplate

### 1. Clone the Repository

```bash
git clone -------------
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Prisma Setup

We're still using SQLite for the database. Run the following commands to migrate your database schema and generate the Prisma client:

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Auth Setup

This project integrates [NextAuth.js](https://next-auth.js.org/) (Auth.js) for authentication. To get started with authentication, update the `[...nextauth].ts` (or equivalent) file located in your API routes (usually under `pages/api/auth/`) with your preferred authentication providers and configuration. This setup works alongside Prisma to securely manage your user data.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### 6. Localization

This project also uses [`next-intl`](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing) for localization support. Configure your localization messages in the appropriate locales folder and update your Next.js configuration as needed.

### 7. Editing and Customization

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### 8. Fonts Optimization

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
