const isDev = true;
const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
} = require("electron-devtools-installer");
const reactDevTools = require("electron-react-devtools");
reactDevTools.install();
module.exports = function (electronApp, menuState) {
    return [
        {
            label: "Configure Categories",
            accelerator: "j",
            enabled: () => menuState.bpmn && menuState.platform === "platform",
            action: function () {
                // console.info(electronApp);
                //reactDevTools.install();
                console.info(electronApp.remote.process.pid);
                // electronApp.on("menu:action", async () => {
                //     console.info("inside event");
                //     if (isDev) {
                //         await installExtension([REACT_DEVELOPER_TOOLS])
                //             .then((name) =>
                //                 console.info("Added extension ", name)
                //             )
                //             .catch((err) =>
                //                 console.info("An error occurred", err)
                //             );
                //     }
                // });
            },
        },
    ];
};

/*
App {
  quit: [Function: quit],
  exit: [Function: exit],
  focus: [Function: focus],
  getVersion: [Function: getVersion],
  setVersion: [Function: setVersion],
  getName: [Function: getName],
  setName: [Function: setName],
  isReady: [Function: isReady],
  whenReady: [Function: whenReady],
  addRecentDocument: [Function: addRecentDocument],
  clearRecentDocuments: [Function: clearRecentDocuments],
  setAppUserModelId: [Function: setAppUserModelId],
  isDefaultProtocolClient: [Function: isDefaultProtocolClient],
  setAsDefaultProtocolClient: [Function: setAsDefaultProtocolClient],
  removeAsDefaultProtocolClient: [Function: removeAsDefaultProtocolClient],
  getApplicationInfoForProtocol: [Function: getApplicationInfoForProtocol],
  getApplicationNameForProtocol: [Function: getApplicationNameForProtocol],
  setBadgeCount: [Function: setBadgeCount],
  getBadgeCount: [Function: getBadgeCount],
  getLoginItemSettings: [Function: getLoginItemSettings],
  setLoginItemSettings: [Function: setLoginItemSettings],
  isEmojiPanelSupported: [Function: isEmojiPanelSupported],
  setAboutPanelOptions: [Function: setAboutPanelOptions],
  showAboutPanel: [Function: showAboutPanel],
  showEmojiPanel: [Function: showEmojiPanel],
  setUserTasks: [Function: setUserTasks],
  getJumpListSettings: [Function: getJumpListSettings],
  setJumpList: [Function: setJumpList],
  isPackaged: [Getter],
  setAppPath: [Function: setAppPath],
  getAppPath: [Function: getAppPath],
  setPath: [Function: setPath],
  getPath: [Function: getPath],
  setAppLogsPath: [Function: setAppLogsPath],
  setDesktopName: [Function: setDesktopName],
  getLocale: [Function: getLocale],
  getLocaleCountryCode: [Function: getLocaleCountryCode],
  hasSingleInstanceLock: [Function: hasSingleInstanceLock],
  requestSingleInstanceLock: [Function: requestSingleInstanceLock],
  releaseSingleInstanceLock: [Function: releaseSingleInstanceLock],
  relaunch: [Function: relaunch],
  isAccessibilitySupportEnabled: [Function: isAccessibilitySupportEnabled],
  setAccessibilitySupportEnabled: [Function: setAccessibilitySupportEnabled],
  disableHardwareAcceleration: [Function: disableHardwareAcceleration],
  disableDomainBlockingFor3DAPIs: [Function: disableDomainBlockingFor3DAPIs],
  getFileIcon: [Function: getFileIcon],
  getAppMetrics: [Function: getAppMetrics],
  getGPUFeatureStatus: [Function: getGPUFeatureStatus],
  getGPUInfo: [Function: getGPUInfo],
  runningUnderARM64Translation: [Getter],
  userAgentFallback: [Getter/Setter],
  configureHostResolver: [Function: configureHostResolver],
  enableSandbox: [Function: enableSandbox],
  commandLine: {
    hasSwitch: [Function: hasSwitch],
    getSwitchValue: [Function: getSwitchValue],
    appendSwitch: [Function: appendSwitch],
    appendArgument: [Function: appendArgument],
    removeSwitch: [Function: removeSwitch]
  },
  _events: [Object: null prototype] {
    'certificate-error': [Function (anonymous)],
    'select-client-certificate': [Function (anonymous)],
    'child-process-gone': [Function (anonymous)],
    'render-process-gone': [Function (anonymous)],
    quit: [Function (anonymous)],
    'window-all-closed': [
      [Function (anonymous)],
      [Function: bound rebuildMenu],
      [Function (anonymous)]
    ],
    'menu:action': [Function: bound handleMenuAction],
    'menu:update': [Function: bound updateState],
    'app:add-recent-file': [Function (anonymous)],
    'second-instance': [Function (anonymous)],
    'app:client-ready': [Function (anonymous)],
    'web-contents-created': [Function (anonymous)],
    restart: [Function (anonymous)],
    ready: [Function (anonymous)],
    'app:quit': [Function (anonymous)]
  },
  _eventsCount: 15,
  version: '5.3.0',
  flags: Flags { flags: {} },
  metadata: { version: '5.3.0', name: 'Camunda Modeler' },
  plugins: Plugins { plugins: { 'Metrics-Plugin': [Object] } },
  openFiles: [Function (anonymous)],
  createEditorWindow: [Function (anonymous)],
  mainWindow: BrowserWindow {
    setBounds: [Function (anonymous)],
    _events: [Object: null prototype] {
      blur: [Function (anonymous)],
      focus: [Array],
      show: [Function: visibilityChanged],
      hide: [Function: visibilityChanged],
      minimize: [Function: visibilityChanged],
      maximize: [Array],
      restore: [Function: visibilityChanged],
      unmaximize: [Function: updateState],
      move: [Function: updateState],
      resize: [Function: updateState],
      'enter-full-screen': [Function: updateState],
      'leave-full-screen': [Function: updateState],
      close: [Array],
      closed: [Function]
    },
    _eventsCount: 14,
    devToolsWebContents: [Getter]
  },
  quitAllowed: false,
  clientReady: true
}

*/
