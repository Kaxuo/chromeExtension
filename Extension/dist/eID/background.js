window.chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    console.log(
      window.chrome.storage.sync.get(null, (data) => {
        console.info(data);
      })
    );
    window.chrome.storage.sync.get("key", (value) => {
      sendResponse(value);
    });
  }
);
