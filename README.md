# HR Expert Backend

Express와 Prisma를 사용한 HR Expert 백엔드 서버입니다.

## 설치 방법

1. 의존성 설치:
```bash
npm install
```

2. 환경 변수 설정:
- `.env` 파일을 생성하고 다음 내용을 추가하세요:
```
DATABASE_URL="postgresql://username:password@localhost:5432/hr_expert?schema=public"
PORT=3000
```

3. Prisma 데이터베이스 마이그레이션:
```bash
npm run prisma:migrate
```

4. Prisma 클라이언트 생성:
```bash
npm run prisma:generate
```

## 실행 방법

개발 모드:
```bash
npm run dev
```

프로덕션 모드:
```bash
npm run build
npm start
``` 