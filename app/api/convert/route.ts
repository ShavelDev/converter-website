import { execFile } from "child_process";
import { Console } from "console";
import { writeFile, readFile } from "fs/promises";
import { NextResponse, NextRequest } from "next/server";
import process from 'process';
import {join} from 'path'



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

    const path = `//Users/norbert/Desktop/ConverterWebsite2/converter-website/${file.name}`

    await writeFile(path, buffer);
    console.log("Current working directory: ",
    process.cwd());
    execFile('./JPEGEncoding', [`${file.name}`], {maxBuffer: 1024 * 1024 * 10* 10},(error, stdout, stderr) => {
        if (error) {
          console.error(error);
          return;
        }
        //console.log(`stdout: ${stdout}`);
        //console.error(`stderr: ${stderr}`);
       return;
    });
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log(`File written successfuly at ${path}`)


    const newFileName = file.name.slice(0,-3)
    const filePath = join(process.cwd(),  `/${newFileName}jpg`);
    

    try {
        // Read the file content
        const fileContent = await readFile(filePath);

        // Create a response with the file content
        const response = new NextResponse(fileContent, {
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename="example.txt"',
        },
        });

        return response;
    } catch (error) {
        console.log(filePath);
        
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    return NextResponse.json({success: true})
}