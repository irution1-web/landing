# 네이버 플레이스 마케팅 상담 랜딩페이지

플레이스 기본 세팅 진단 → PDF 리포트 → 상담 신청으로 이어지는 단일 페이지 랜딩입니다.
빌드 도구 없이 `index.html` 하나로 동작합니다.

## 구조

```
.
├── index.html            # 랜딩페이지 (HTML/CSS/JS 단일 파일)
├── assets/rank/          # 키워드 순위 추적 캡처 (11장)
├── apps-script/Code.gs   # 구글 시트 접수용 Apps Script
└── README.md
```

## GitHub Pages로 배포하기

1. 이 저장소를 GitHub에 push 합니다.
2. 저장소 **Settings → Pages** 에서
   - Source: `Deploy from a branch`
   - Branch: `main` / `/ (root)`
3. 1~2분 뒤 `https://<계정명>.github.io/<저장소명>/` 에서 확인할 수 있습니다.

## 상담 신청 데이터 받기 (구글 시트 연동)

GitHub Pages는 정적 호스팅이라 서버가 없습니다. 신청 내용은 **구글 시트**로 받습니다.

1. 새 구글 스프레드시트를 만들고 **확장 프로그램 → Apps Script** 를 엽니다.
2. `apps-script/Code.gs` 내용을 붙여넣고 저장합니다.
3. **배포 → 새 배포 → 유형: 웹 앱**
   - 실행 사용자: `나`
   - 액세스 권한: `모든 사용자`
4. 배포 후 나오는 **웹 앱 URL** 을 복사합니다.
5. `index.html` 에서 아래 줄을 찾아 URL을 붙여넣습니다.

```js
const SHEET_WEBHOOK_URL = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
```

신청이 들어오면 시트에 한 줄씩 쌓입니다.

> 페이지 하단 "신청 내역 보기 (관리자)" 패널은 브라우저 localStorage 기반이라
> 신청자 본인 브라우저에만 남습니다. 운영용 데이터는 구글 시트를 사용하세요.

## 배포 전 수정할 것

- 전화번호: `index.html` 에서 `01084648304`, `010-8464-8304` 검색 후 교체
- 개인정보 동의문의 사업자등록번호: `[등록번호를 입력하세요]` 교체
- 순위 캡처 이미지: `assets/rank/rank-01.png` ~ `rank-11.png` 교체 (파일명 유지하면 코드 수정 불필요)
- "실시간 신청현황"은 데모용 랜덤 표시입니다. 실제 접수 기반으로 바꾸려면 `startDemoFeed()` 부분을 수정하세요.

## 로컬에서 보기

`index.html` 을 브라우저로 열면 바로 확인됩니다. (웹폰트는 인터넷 연결 필요)
