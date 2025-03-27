import fs from 'fs'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";



pdfMake.addVirtualFileSystem(pdfFonts);




export function Download (){
const docDefinition = {
    content :[
        {
            text: 'Tables'
        },
        {
            text:'Testing Tables'
        }
    ]
}

const pdfDoc = pdfMake.createPdf(docDefinition).open();
// pdfDoc.pipe(fs.createWriteStream('pdfs/election result.pdf'));
pdfDoc.end();
    return(
        <>

        

        <h1>Test Download</h1>
        </>
    )
}
