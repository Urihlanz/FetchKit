# FetchKit 🚀

**Smart HTTP Client for React Apps** with TypeScript, Caching & Hooks

## 🔥 Features

- **Full TypeScript Support** — Type-safe requests & responses
- **Auto-Caching** — In-memory or localStorage
- **React Hooks** — Built-in useQuery & useMutation
- **Intuitive API** — Inspired by React Query & Axios
- **Jest Tested** — 90%+ code coverage

## Requirements

- Node.js v.20^
- React 19

## Usage/Examples

**Create API Query**

```javascript
interface User {
  id: string;
  name: string;
}

export const getUser = createQuery<{ id: string }, User>({
  path: '/users/:id',
  cacheTime: 60_000, // 1 minute
});
```

**Use hook useQuery in React**

```javascript
function UserProfile({ id }: { id: string }) {
  const { data, isLoading } = useQuery(getUser, { id });

  return (
    <div>
      {isLoading ? 'Loading...' : <h1>{data?.name}</h1>}
    </div>
  );
}
```

**Create API Mutation**

```javascript
export const loginUser = createMutation<LoginInput, LoginOutput>({
  path: '/api/login',
  method: 'POST',
  onSuccess: (data) => {
    localStorage.setItem('token', data.token);
  },
});
```

**Use hook useMutation in React**

```javascript
function UserProfile({ id }: { id: string }) {
  const { mutate, isLoading, error } = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log('Logged in! Token:', data.token);
    },
    onError: (err) => {
      console.error('Login failed:', err);
    },
  });
}
```

## Install packages

```bash
npm install
```

### Build production

```sh
npm run build
```

### Run production server

```sh
npm run start
```

### Run development hot-reload server

```sh
npm run dev
```

### Development hints

#### Technology stack

- TypeScript
- Rea
- ct
- Jest
- Vite

#### Code owner

[Urihlanz](https://github.com/urihlanz)
