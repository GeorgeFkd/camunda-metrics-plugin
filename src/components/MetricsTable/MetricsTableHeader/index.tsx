import React from 'react'
import styles from './MetricsTableHeader.css'
import CustomOverlay from './ConfigureGroups/ModifyGroupsOverlay';
import CopyResultsButton from './CopyResultsButton';
import SelectSubProcessOverlay from './SelectSubprocess/SelectSubprocessOverlay';
import useStore from '../../../store/store';
import { getParticipants } from '../../../utils/metrics/utils';
import SelectSubprocess from './SelectSubprocess';
import ConfigureGroups from './ConfigureGroups';
function MetricsTableHeader() {
    const xmlDoc = useStore((state)=>state.xmlDoc);
    const metricGroups = useStore((state)=>state.metricGroups)
  return (
     <div className={styles.metricsHeader}>
            
            <MetricsTableTitle />
            <ConfigureGroups />
             <CopyResultsButton metricGroups={metricGroups}/>
             <SelectSubprocess />
    </div>
  )
}
function MetricsTableTitle({}) {
    return <div className={styles.metricsTableTitle}>BPMN Metrics</div>;
}
export default MetricsTableHeader