document.getElementById('checkSpam').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: () => {
        // Post a message to the content script
        window.postMessage({ type: 'CHECK_SPAM' }, '*');
      }
    });
  });
});
