//TODO otan kleinei thn efarmogh na tou apothikeuw kapoio
//excel ana tab me to onoma tou diagrammatos kai ta stoixeia analytika

//vlepw ena diagram.destroy

//kapoio filter isws
//element name, frequency
import { writeFileSync } from "fs";
//dont include whole libraries it increases compile time
import { write } from "xlsx";
export default function saveToCsv(data, outputFileName, ext) {
    //proper layout for the generated excel
    //Name of file = Name of the diagram, ext = depends on requirements
    //For Node ESM we need to do it this way
    const buffer = write(data, { type: "buffer", bookType: "xlsx" });
    //XLSX.writeFile(workbook,`output.xlsx`)
    //might have a problem with sync i could do it async
    const workbook = writeFileSync(`${outputFileName}.${ext}`, buf);
}
