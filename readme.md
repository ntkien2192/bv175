# CMS Benh vien 175 (Directus monorepo)

He thong CMS cho Benh vien 175 duoc xay dung tren nen tang Directus (API + App) theo kieu monorepo. Code gom backend (Node/TypeScript), frontend (Vue 3 + Vite) va cac goi thu vien chia se.

## Cau truc chinh
- `api/`: Directus API, REST/GraphQL, auth, flows, AI tools.
- `app/`: Giao dien quan tri Directus (Vue 3).
- `packages/`: Thu vien chia se (constants, storage drivers, extensions, utils, schema, validation, v.v.).
- `sdk/`: JavaScript SDK.
- `tests/blackbox/`: Bo kiem thu end-to-end.

## Yeu cau
- Node 22, pnpm 10.x.
- Co so du lieu ho tro: PostgreSQL, MySQL/MariaDB, SQLite, MS SQL, CockroachDB.
- Docker (tuy chon) de dung nhanh Postgres/Redis/Minio (`docker-compose.yml` chi mang tinh phuc vu dev/debug).

## Cai dat nhanh
1) Cai dat phu thuoc:
```sh
pnpm install
```

2) Tao file `.env` (hoac dat bien moi truong) cho API, vi du toi thieu:
```sh
PORT=8055
PUBLIC_URL=http://localhost:8055
KEY=changeme_key
SECRET=changeme_secret
DB_CLIENT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=directus
DB_USER=postgres
DB_PASSWORD=secret
```
Them cac bien can thiet khac cho email, storage (S3/Minio/Azure), SSO... theo nhu cau trien khai.

3) Neu can co so du lieu/phu tro nhanh:
```sh
docker compose up postgres redis minio -d
```

4) Chay dev (API + giao dien duoc serve tu API):
```sh
pnpm --filter @directus/api dev
```
Lan dau khoi dong, Directus se yeu cau tao tai khoan admin trong console neu chua co.

## Lenh thuong dung
- Kiem tra code style: `pnpm lint` va `pnpm format`.
- Test don vi: `pnpm --filter @directus/api test`, `pnpm --filter @directus/app test`.
- E2E/blackbox: `pnpm test:blackbox` (can build truoc).
- Build san pham:
```sh
pnpm --filter @directus/app build
pnpm --filter @directus/api build
```

## Ghi chu trien khai
- `docker-compose.yml` chi danh cho moi truong dev/test, khong phu hop production.
- Khi trien khai production nen cau hinh HTTPS, database du lieu that va cac bien bao mat (KEY/SECRET, JWT, email, storage).
- Khong commit file `.env` hay thong tin nhay cam vao repo.

