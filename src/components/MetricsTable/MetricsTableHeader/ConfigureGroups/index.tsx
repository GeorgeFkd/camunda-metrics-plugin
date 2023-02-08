import React from 'react'
import CustomOverlay from './ModifyGroupsOverlay';
import useStore from '../../../../store/store';

function ConfigureGroups() {
  const configGroupsBtnRef = React.useRef<HTMLButtonElement>(null);
  const [configOpen, setConfigOpen] = React.useState(false);
  const metricGroups = useStore((state) => state.metricGroups);
  const updateGroups = useStore((state) => state.updateGroups);
  return (
    <>
    <button
                ref={configGroupsBtnRef}
                onClick={() => setConfigOpen((prev: boolean) => !prev)}
                className="btn btn-primary"
                >
                Configure Groups
            </button>
            {configOpen && (
                <CustomOverlay
                    anchor={configGroupsBtnRef.current}
                    existingGroups={metricGroups}
                    onClose={() => setConfigOpen(false)}
                    onSubmit={updateGroups}
                />
            )}
    </>
  )
}

export default ConfigureGroups