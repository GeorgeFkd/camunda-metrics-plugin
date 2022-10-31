import React from 'react'
import * as ReactDOM from "react-dom"
import { Overlay } from "camunda-modeler-plugin-helpers/components";
function CustomOverlay(props) {
  return (
    <Overlay >
       <Overlay.Title>
         Custom Modal
       </Overlay.Title>
       <Overlay.Body>
         Hello world!
       </Overlay.Body>
       <Overlay.Footer>
        <button type="button">
          Close        </button>
       </Overlay.Footer>
        </Overlay>
  )
}

//? Available events
// 'app:quit-aborted',
//   'app:quit-allowed',
//   'client:error',
//   'client:ready',
//   'config:get',
//   'config:set',
//   'context-menu:open',
//   'dialog:open-file-error',
//   'dialog:open-file-explorer',
//   'dialog:open-files',
//   'dialog:save-file',
//   'dialog:show',
//   'errorTracking:turnedOff',
//   'errorTracking:turnedOn',
//   'external:open-url',
//   'file:read',
//   'file:read-stats',
//   'file:write',
//   'menu:register',
//   'menu:update',
//   'system-clipboard:write-text',
//   'toggle-plugins',
//   'workspace:restore',
//   'workspace:save',
//   'zeebe:checkConnection',
//   'zeebe:deploy',
//   'zeebe:getGatewayVersion',
//   'zeebe:run'


export default CustomOverlay