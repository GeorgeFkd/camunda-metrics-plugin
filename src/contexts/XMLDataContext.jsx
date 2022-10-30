
import React from "camunda-modeler-plugin-helpers/react"

export const XMLDataContext = React.createContext({})

export function DataProvider({children}){
    const [xmlData,setXMLData] = React.useState();

    function updateXmlData(dataToSet){
        setXMLData(dataToSet);
    }

    const value = {xmlData,updateXmlData};
    return (
        <XMLDataContext.Provider value={value}>
            {children}
        </XMLDataContext.Provider>
    );

}

