### Техническое задание

Макет:
[Figma](https://www.figma.com/design/Pt0Ki5QgCXOcT2qfdqVyx0/Untitled-(Copy)?node-id=2-12433&node-type=canvas&t=fwmH1cWHCbiOtWpQ-0)

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
- Использовать Next.js 14
- Остальная архитектура на ваше усмотрение.



## Обзор
Приложение состоит из двух страниц: генератора паролей и калькулятора. Обе страницы доступны после того, как пользователь введет своё имя. Имя хранится с помощью Zustand и сохраняется в Local Storage.

### Генератор паролей
Генератор паролей позволяет пользователям создавать собственные пароли с различными параметрами:
- Длина от 4 до 32 символов;
- Заглавные буквы;
- Строчные буквы;
- Цифры;
- Символы %, *, (, ), ?, @, #, $, ~;
- Возможность предотвратить повторение символов в пароле.

Взаимодействие с пользователем:
- Оповещения: если не выбран ни один тип символов или желаемая длина превышает количество уникальных символов, доступных при запрете повторения;
- Отображение пароля: сгенерированные пароли отображаются в списке;
- Копирование: скопировать пароль в буфер обмена, нажав на иконку.

### Калькулятор
Калькулятор поддерживает основные арифметические операции и включает расширенные функции:
- Сложение (+);
- Вычитание (–);
- Умножение (×);
- Деление (÷);
- Signum (+/-): переключает знак текущего числа или результата;
- Процент (%): вычисляет процент от текущего ввода;
- Backspace: удаляет последний символ;
- Очистить (C): сбрасывает калькулятор.

Расширенный разбор ввода:
- Обработка десятичных знаков: предотвращает наличие нескольких десятичных точек в одном числе;
- Конечные операторы: перед вычислением удаляет операторы в конце выражения для предотвращения синтаксических ошибок;
- Автоматический расчет: обновляет результат в режиме реального времени по мере ввода пользователем;
- Повторение последней операции: сохраняет последний оператор и операнд, чтобы повторить последнюю операцию при нажатии "=".

Обработка пограничных случаев:
- Деление на ноль: обнаруживает ошибки во время вычисления и отображает «Ошибка»;
- Отрицательные числа: кнопка ЗНАК изменяет знак последнего введенного числа или результата после вычисления;
- Последовательные операторы: заменяет последний оператор, если последовательно введено несколько операторов;
- Начало новых вычислений: сбрасывает состояния соответствующим образом при запуске новых вычислений после нажатия =, C или ввода новых чисел.

Взаимодействие с пользователем:
- Поддержка клавиатуры: числа, операторы, Enter, Backspace, Escape;
- Визуальная обратная связь: поля ввода и результата обновляются, отражая текущее состояние вычисления;
- Обработка ошибок: отображает «Ошибка» при возникновении недопустимых вычислений (например, деление на ноль).



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
