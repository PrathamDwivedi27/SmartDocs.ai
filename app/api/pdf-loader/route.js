import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


const pdfUrl="https://animated-caterpillar-648.convex.cloud/api/storage/d21f6c8f-f411-4c44-b827-f8dc39c4e47c"
export async function GET(req){
    //1. Load the pdf file
    const response=await fetch(pdfUrl);
    const data=await response.blob();
    const loader=new WebPDFLoader(data);
    const docs=await loader.load();

    let pdfTextContent='';
    docs.forEach(doc=>{
        pdfTextContent+=doc.pageContent;
    })

    //2. Text Splitting => Split the text content into smaller chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });
    const output = await splitter.createDocuments([pdfTextContent]);

    //store in the form of list
    let splitterList=[];
    output.forEach(doc=>{
        splitterList.push(doc.pageContent);
    })

    return NextResponse.json({
        result: splitterList
    })
}