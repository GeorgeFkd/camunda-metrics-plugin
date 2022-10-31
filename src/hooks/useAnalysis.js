import React from "camunda-modeler-plugin-helpers/react";

function useAnalysis() {
    const [analysis, setAnalysis] = React.useState(new Map());
    function updateAnalysis(data) {
        console.info("Analysis is being updated with: ", data);
        //later: consider caching
        setAnalysis((prev) => {
            console.log(prev, data);
            return data;
        });
    }

    return [analysis, setAnalysis];
}

export default useAnalysis;
