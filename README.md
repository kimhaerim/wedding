## Installation

```bash
$ yarn install
```

## Config
- config 설정
- src 폴더 밑에 config 폴더 생성
- `/config/local.js` 파일 생성한 후 아래 내용을 복사 붙여넣기
```
module.exports = {
  jwt: {
    secret: 'test',
  },
  mysql: {
    username: 'root',
    password: "local에서 접속할 mysql password",
    database: 'wedding',
  },
  secretForPersonal: {
    phoneNumber: 'secret',
    accountNumber: 'secret',
  },
};
```

## Running the app

```bash
# local
$ yarn start
```

## Test

```bash
# unit tests
$ yarn test
```

## GraphQL
- http://localhost:3000/graphql 플레이그라운드 접속
