const subtitleWindow = document.createElement("div");
subtitleWindow.id = "subtitleWindow";
subtitleWindow.style.position = "fixed";
subtitleWindow.style.top = "75%";
subtitleWindow.style.left = "25%";
subtitleWindow.style.width = "50%";
subtitleWindow.style.height = "20%";
subtitleWindow.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // 투명도 조절 가능
subtitleWindow.style.pointerEvents = "auto"; // 마우스 이벤트 허용
subtitleWindow.style.zIndex = "9999"; // 다른 요소 위에 표시
subtitleWindow.style.display = "none";
subtitleWindow.innerText = "텍스트 입력 테스트";
//subtitleWindow.contentEditable = true; // 텍스트 수정 여부 (test용)
document.body.appendChild(subtitleWindow);

let isDragging = false;
let initialX;
let initialY;
let offsetX = 0;
let offsetY = 0;
let isResizing = false;
let initialWidth;
let initialHeight;
let minWidth = 100; // 최소 너비
let minHeight = 100; // 최소 높이

// 마우스 이벤트 리스너 추가
subtitleWindow.addEventListener("mousedown", startAction);
document.addEventListener("mouseup", stopAction);
subtitleWindow.addEventListener("mousemove", changeCursor);
document.addEventListener("mousemove", performAction);

// 액션 시작 함수
function startAction(e) {
    if (isResizeAreaClicked(e)) {
        isResizing = true;
        initialX = e.clientX;
        initialY = e.clientY;
        initialWidth = parseFloat(document.defaultView.getComputedStyle(subtitleWindow).width);
        initialHeight = parseFloat(document.defaultView.getComputedStyle(subtitleWindow).height);
    } else if (e.target === subtitleWindow) {
        isDragging = true;
        initialX = e.clientX - offsetX;
        initialY = e.clientY - offsetY;
    }
}

// 액션 종료 함수
function stopAction() {
    isDragging = false;
    isResizing = false;
}

// 액션 수행 함수
function performAction(e) {
    if (isDragging) {
        e.preventDefault();

        const x = e.clientX - initialX;
        const y = e.clientY - initialY;
        offsetX = x;
        offsetY = y;
        subtitleWindow.style.transform = `translate(${x}px, ${y}px)`;
    } else if (isResizing) {
        e.preventDefault();
        const dx = e.clientX - initialX;
        const dy = e.clientY - initialY;
        let newWidth = initialWidth + dx;
        let newHeight = initialHeight + dy;
        // 최소 너비 및 최소 높이 제한
        newWidth = Math.max(newWidth, minWidth);
        newHeight = Math.max(newHeight, minHeight);
        subtitleWindow.style.width = newWidth + "px";
        subtitleWindow.style.height = newHeight + "px";
    }

}

// 마우스 클릭 위치가 창의 가장자리인지 확인하는 함수 TODO 인식오류, resizing할때 위치에 따라 리사이징 함수바뀌게 만들어야됨
function isResizeAreaClicked(e) {
    const borderWidth = 8; // 가장자리 클릭 인식 영역의 너비
    const rect = subtitleWindow.getBoundingClientRect();
    // 가장자리를 클릭한 경우
    if (
        e.clientX >= rect.left && e.clientX <= rect.left + borderWidth && // 왼쪽 가장자리
        e.clientY >= rect.top && e.clientY <= rect.bottom || // 상단 가장자리
        e.clientX >= rect.right - borderWidth && e.clientX <= rect.right && // 오른쪽 가장자리
        e.clientY >= rect.top && e.clientY <= rect.bottom || // 상단 가장자리
        e.clientX >= rect.left && e.clientX <= rect.right && // 하단 가장자리
        e.clientY >= rect.bottom - borderWidth && e.clientY <= rect.bottom // 하단 가장자리
    ) {
        return true;
    }
    return false;
}

// 가장자리에 마우스를 가져다 댔을 때 커서 변경 함수
function changeCursor(e) {
    if (isResizeAreaClicked(e)) {
        subtitleWindow.style.cursor = "nwse-resize"; // 크기 조절용 커서로 변경
    } else {
        subtitleWindow.style.cursor = "default"; // 기본 커서로 변경
    }
}

// 마우스 이벤트 리스너 추가
subtitleWindow.addEventListener("mouseenter", addBorder);
subtitleWindow.addEventListener("mouseleave", removeBorder);

// 테두리 추가 함수
function addBorder() {
    subtitleWindow.style.border = "5px solid rgba(70, 70, 70, 0.5)";
}

// 테두리 제거 함수
function removeBorder() {
    subtitleWindow.style.border = "none";
}