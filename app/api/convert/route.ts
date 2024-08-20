import { execFile } from "child_process";
import { writeFile } from "fs/promises";
import { NextResponse, NextRequest } from "next/server";
import process from 'process';


export async function POST(request: NextRequest){
    const data = await request.formData();
    console.log("POST works")

    const file: File | null = data.get("file") as unknown as File;

    if(!file){
        console.log("Failure To Write File")
        return NextResponse.json({success: false});
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = `/Users/norbert/Desktop/ImagesConverter/WebsitePrototype/${file.name}`

    await writeFile(path, buffer);
    console.log("Current working directory: ",
    process.cwd());
    execFile('./JPEGEncoding', ['cat.bmp'], {maxBuffer: 1024 * 1024 * 10* 10},(error, stdout, stderr) => {
        if (error) {
          console.error(error);
          return;
        }
        //console.log(`stdout: ${stdout}`);
        //console.error(`stderr: ${stderr}`);
       return;
    });
    
    console.log(`File written successfuly at ${path}`)
    return NextResponse.json({success: true})
}