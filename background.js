// background.js

// 컨텐츠 스크립트로부터 메시지 수신
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'recognitionResult') {
    var result = request.result;
    console.log('인식된 텍스트:', result);
    
    // 활성 탭으로 메시지 전송
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'recognitionResult', result: result });
    });
  }
});