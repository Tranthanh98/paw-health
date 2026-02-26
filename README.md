# paw-health

Paw Health là monorepo xây dựng theo triết lý **All-in-One Ecosystem**: một nền tảng giúp chủ nuôi thú cưng ("Sen") quản lý toàn bộ vòng đời của thú cưng, từ sức khỏe, dinh dưỡng, mua sắm đến các dịch vụ chăm sóc, có hỗ trợ AI.

## Đặc tả UI/UX

### 1. Tổng quan ứng dụng

#### 1.1 Concept và định hướng

Ứng dụng được thiết kế theo định hướng **ấm áp, thân thiện, tin cậy** để giảm bớt lo lắng về y tế và tăng trải nghiệm vui vẻ khi chăm sóc thú cưng. Hệ sinh thái tập trung vào quản lý toàn diện sức khỏe, dinh dưỡng, mua sắm và dịch vụ, đồng thời tối ưu cho hành vi người dùng Việt Nam như:

- Ưu tiên chat trước khi mua
- Ưu tiên thanh toán ví điện tử
- Đánh giá cao tiện lợi của dịch vụ địa phương

#### 1.2 Đối tượng mục tiêu

- **Nhóm chính**: Gen Z và Millennials tại Hà Nội, TP.HCM, Đà Nẵng; bận rộn, sẵn sàng chi tiêu cao cho thú cưng như thành viên gia đình.
- **Nhóm phụ**: phòng khám thú y, cửa hàng thú cưng, pet sitter tự do.

### 2. Hệ thống thiết kế (Design System)

#### 2.1 Bảng màu (Color Palette)

Palette được chọn để cân bằng giữa cảm giác thân thiện và độ tin cậy chuyên môn y tế:

- **Primary** `#FF8C69` (Coral Soft): Buttons, Headers, CTAs
- **Secondary** `#20B2AA` (Sea Green): Health, Medical features
- **Accent** `#FFD700` (Gold): AI features, Gamification
- **Background** `#FAFAFA` (Off-white): Screen backgrounds
- **Surface** `#FFFFFF` (White): Cards, Modals
- **Text Primary** `#1A1A2E` (Dark Navy): Main text
- **Text Secondary** `#6B7280` (Gray): Captions, hints
- **Error** `#EF4444` (Red): Warnings, errors
- **Success** `#10B981` (Green): Confirmations

> NativeWind theme cho mobile đã được map theo đúng semantic tokens ở `apps/mobile/tailwind.config.js`.

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
