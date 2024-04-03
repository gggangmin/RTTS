async function toggleSpeechToText() {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  //chrome.tabs.sendMessage(activeTab.id, { command: "toggleRecognition" });
  chrome.scripting.executeScript({
    target: { tabId: activeTab.id },
    function: function() {
      const subtitleWindow = document.getElementById("subtitleWindow");
      if (subtitleWindow) {
        
        if (subtitleWindow.style.display === "none") {
          subtitleWindow.style.display = "block";
        } else {
          subtitleWindow.style.display = "none";
        }
       
      }
    }
  });
}

chrome.action.onClicked.addListener(() => {
  toggleSpeechToText();
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle_speech_to_text") {
    toggleSpeechToText();
  }
});
