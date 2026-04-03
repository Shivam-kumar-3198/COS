# 1. Create the Vite project
npm create vite@latest canteen-order-system -- --template react-ts
cd canteen-order-system

# 2. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Install core dependencies (React Router, React Query, Hook Form, Zod, Axios)
npm install react-router-dom @tanstack/react-query axios react-hook-form @hookform/resolvers zod

# 4. Install JSON Server (for mock backend)
npm install -D json-server


src/
├── api/             # Axios instances and API call functions
├── components/      # Reusable UI (SnackCard, StudentListItem, Button, Modal)
├── hooks/           # Custom React Query hooks (useSnacks, useStudents, useOrders)
├── pages/           # Route components (Snacks, Students, StudentDetails)
├── types/           # TypeScript interfaces (Snack, Student, Order)
├── App.tsx          # Router and QueryClientProvider setup
└── main.tsx         # Entry point


# AI Prompts Used

As requested, here is a transparent log of AI assistance utilized during this prototype build. I used Gemini 3.1 Pro to help architect the initial setup and troubleshoot boilerplate configurations.

**Prompts:**
1. "Give me the optimal project folder structure for a Vite + React + TypeScript + React Query application."
2. "Generate a sample `db.json` file for json-server containing mocked data for snacks, students, and orders."
3. "What is the boilerplate code to wrap a Vite App component in a React Query client provider?"


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
