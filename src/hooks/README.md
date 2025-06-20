# React Query Hooks

Этот проект использует TanStack Query (React Query) для управления состоянием сервера и кэшированием данных.

## Структура

```
src/hooks/
├── queries/          # Хуки для получения данных
│   ├── useUser.ts    # Хук для получения данных пользователя
│   └── index.ts      # Экспорт всех queries
├── mutations/        # Хуки для изменения данных
│   ├── useAuth.ts    # Хуки для аутентификации
│   └── index.ts      # Экспорт всех mutations
└── index.ts          # Главный экспорт всех хуков
```

## Использование

### Queries (Получение данных)

```typescript
import { useUser } from "@/hooks";

function UserProfile() {
  const { data: user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Hello, {user.name}!</div>;
}
```

### Mutations (Изменение данных)

```typescript
import { useLogin } from "@/hooks";

function LoginForm() {
  const loginMutation = useLogin();

  const handleSubmit = (credentials: LoginCredentials) => {
    loginMutation.mutate(credentials, {
      onSuccess: () => {
        // Redirect to dashboard
        router.push("/dashboard");
      },
      onError: (error) => {
        // Handle error
        console.error("Login failed:", error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

## Доступные хуки

### Queries

- `useUser()` - получение данных текущего пользователя

### Mutations

- `useLogin()` - вход в систему
- `useRegister()` - регистрация
- `useLogout()` - выход из системы

## Конфигурация

React Query настроен с следующими параметрами по умолчанию:

- `staleTime`: 5 минут (данные считаются свежими 5 минут)
- `gcTime`: 10 минут (время жизни кэша)
- `retry`: 1 попытка повтора при ошибке
- `refetchOnWindowFocus`: false (не обновлять при фокусе окна)

## DevTools

В режиме разработки доступны React Query DevTools. Они автоматически подключаются через `QueryProvider` и показывают состояние всех запросов и мутаций.

## Типы

Все типы для API определены в `src/types/api.ts`:

- `User` - тип пользователя
- `LoginCredentials` - данные для входа
- `RegisterCredentials` - данные для регистрации
- `AuthResponse` - ответ аутентификации
- `ApiResponse<T>` - обертка для API ответов
- `ApiError` - тип ошибки API
