### Техническое задание

#### 1. Создание проекта
- Ознакомление с документацией Next.js: Next.js Documentation (https://nextjs.org/docs)
- Создание проекта:
  
  npx create-next-app@12 <название_проекта> --typescript
  
- Архитектуру проекта создать на ваше усмотрение. Например:
  
  /src
    /components
      Header.tsx
      PasswordGenerator.tsx
      Calculator.tsx
    /store
      useStore.ts
    /pages
      index.tsx
      password-generator.tsx
      calculator.tsx
    /styles
      globals.scss
  

#### 2. Создание мини-приложения
Используемые технологии:
- React hooks: useState, useEffect, useMemo
- Zustand для глобального состояния
- SCSS для стилей

Макет:
[Figma](https://clck.ru/3CfJAY)
1. Главная страница (pages/index.tsx):
   - Поле для ввода имени.
   - Кнопка для сохранения имени. При нажатии:
     - Сохранять имя в localStorage.
     - Сохранять имя в глобальном состоянии (Zustand).
   - Отображение имени в Header.

2. Страница генерации пароля (pages/password-generator.tsx):
   - Форма для генерации случайного пароля.
   - Кнопка для генерации.
   - Отображение сгенерированного пароля.

3. Страница калькулятора (pages/calculator.tsx):
   - Простой калькулятор с кнопками для операций.
   - Отображение результатов.
   - Ввод должен быть и с клавиатуры

### Рекомендации
- Начните с изучения основ каждой технологии (Next.js, Zustand, React hooks, SCSS).
- Разработайте минимально жизнеспособный продукт (MVP) с основным функционалом.
- Регулярно тестируйте приложение на каждом этапе разработки.
