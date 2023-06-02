import loadImagePathForServiceWorker from './loadImage';

console.log('Itch.io URL Opener Init');

const install = async () => {
  console.log('Itch.io URL Opener install');

  const openTabInItch = async _ => {
    var itchPath = document.querySelector("meta[name='itch:path']");
    const itchURL = `itch://${itchPath.content}`;
    console.log('navigating to:', itchURL);

    chrome.tabs.update({ url: itchURL });
  };

  const RULE_ACTION_ENABLE = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'itch.io'}
      }),
    ],
    actions: [
      new chrome.declarativeContent.ShowAction(),
      new chrome.declarativeContent.SetIcon({
        imageData: {
          '64': await loadImagePathForServiceWorker('images/icon-on-64.png'),
          '128': await loadImagePathForServiceWorker('images/icon-on-128.png')
        }
      })
    ]
  };

  chrome.action.disable(); // do not show action by default, only when rules are fullfilled
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    console.log('Itch URL Opener removeRules');

    chrome.declarativeContent.onPageChanged.addRules([RULE_ACTION_ENABLE]);
  });

  chrome.action.onClicked.addListener(openTabInItch);

};

install();
// chrome.runtime.onInstalled.addListener(install);
