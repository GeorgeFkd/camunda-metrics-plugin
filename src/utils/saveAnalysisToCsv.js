//TODO otan kleinei thn efarmogh na tou apothikeuw kapoio
//excel ana tab me to onoma tou diagrammatos kai ta stoixeia analytika

//vlepw ena diagram.destroy

//kapoio filter isws
//element name, frequency
//importing one of tehse causes a problem
// import { writeFileSync } from "fs";
// import {s} from "fs"
//dont include whole libraries it increases compile time
// import { write } from "xlsx";
export default function saveToCsv(data, outputFileName, ext) {
    //proper layout for the generated excel
    //Name of file = Name of the diagram | Headers = Typos
    //For Node ESM we need to do it this way
    // const buffer = write(data, { type: "buffer", bookType: "xlsx" });
    //XLSX.writeFile(workbook,`output.xlsx`)
    //might have a problem with sync i could do it async
    // const workbook = writeFileSync(`${outputFileName}.${ext}`, buf);
}
