// content.js

// 음성 인식 객체 생성
var recognition = new webkitSpeechRecognition();
recognition.lang = 'ko-KR'; // 한국어 설정
recognition.continuous = true; // 연속 인식 모드

// 음성 인식 시작
recognition.start();

// 음성 인식 결과 처리
recognition.onresult = function(event) {
  var result = event.results[event.results.length - 1][0].transcript;
  
  // 백그라운드 스크립트로 메시지 전송
  chrome.runtime.sendMessage({ type: 'recognitionResult', result: result });
};

// 백그라운드 스크립트로부터 메시지 수신
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'recognitionResult') {
    var result = request.result;
    
    // 기존의 결과 요소 제거
    var existingResult = document.getElementById('speech-result');
    if (existingResult) {
      existingResult.remove();
    }
    
    // 새로운 결과 요소 생성
    var resultElement = document.createElement('div');
    resultElement.id = 'speech-result';
    resultElement.textContent = result;
    resultElement.style.position = 'fixed';
    resultElement.style.top = '10px';
    resultElement.style.left = '10px';
    resultElement.style.padding = '10px';
    resultElement.style.background = 'rgba(255, 255, 255, 0.8)';
    resultElement.style.zIndex = '9999';
    
    // 결과 요소를 문서에 추가
    document.body.appendChild(resultElement);
  }
});