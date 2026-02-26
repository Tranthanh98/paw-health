# paw-health

Paw Health là monorepo xây dựng theo triết lý **All-in-One Ecosystem**: một nền tảng giúp chủ nuôi thú cưng ("Sen") quản lý toàn bộ vòng đời của thú cưng, từ sức khỏe, dinh dưỡng, mua sắm đến các dịch vụ chăm sóc, có hỗ trợ AI.

## Cấu trúc workspace

- `apps/api`: Backend API (Express + TypeScript)
- `apps/web`: Web app chính (Next.js)
- `apps/landing`: Landing page (Next.js)
- `apps/mobile`: Mobile app (Expo + React Native)
- `packages/typescript-config`: Shared TypeScript config

## Yêu cầu môi trường

- Node.js `>= 20`
- pnpm `>= 9`

## Cài đặt

```bash
pnpm install
```

## Scripts tại root monorepo

### Chạy môi trường phát triển

```bash
pnpm dev          # turbo dev (giữ tương thích cũ)
pnpm dev:all      # chạy tất cả app có script dev qua Turbo
pnpm dev:api      # chỉ chạy API
pnpm dev:web      # chỉ chạy Web
pnpm dev:landing  # chỉ chạy Landing
pnpm dev:mobile   # chạy Expo cho Mobile
```

### Mobile shortcut

```bash
pnpm mobile:android
pnpm mobile:ios
pnpm mobile:web
```

### Build

```bash
pnpm build
pnpm build:api
pnpm build:web
pnpm build:landing
```

### Lint & format

```bash
pnpm lint
pnpm lint:api
pnpm lint:web
pnpm lint:landing
pnpm lint:mobile
pnpm format
```

### Cài package nhanh theo workspace

```bash
# dependency thường
pnpm run add:api -- zod
pnpm run add:web -- axios
pnpm run add:landing -- clsx
pnpm run add:mobile -- zustand

# dev dependency
pnpm run add:api:dev -- @types/node
pnpm run add:web:dev -- eslint

# cài ở root workspace
pnpm run add:root -- turbo
pnpm run add:root:dev -- prettier
```

## Ghi chú

- Port mặc định:
  - `web`: `3000`
  - `landing`: `3002`
- API và mobile phụ thuộc vào cấu hình môi trường riêng (env/secrets) theo từng môi trường triển khai.
