/**
 * 네이버 플레이스 랜딩페이지 → 구글 시트 접수 스크립트
 * 배포: 배포 → 새 배포 → 웹 앱 / 실행 사용자: 나 / 액세스: 모든 사용자
 */
const SHEET_NAME = '신청내역';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['신청시각', '업체명', '플레이스 주소', '업종', '지역·키워드', '궁금한 점', '현재 고민', '이름', '연락처', 'ID']);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(data.submittedAt || Date.now()),
      data.storeName || '',
      data.placeUrl || '',
      data.bizType || '',
      data.keywords || '',
      (data.concerns || []).join(', '),
      data.memo || '',
      data.ownerName || '',
      "'" + (data.phone || ''),   // 앞자리 0 보존
      data.id || ''
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('OK');
}
