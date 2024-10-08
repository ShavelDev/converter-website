"use client";
import Image from "next/image";
import { useState } from "react";


export default function Home() {

  const [file, changeFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if(!file){
      console.error("No file provided");
      setLoading(false);
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file as File);


    try{
      const response = await fetch("/api/convert",{
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cat.jpg'; // The file name to download
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download file');
      }

      


      setLoading(false);
      return;

    }catch(error){
      setLoading(false);
      return 
    }



  }

  return (
    <>
      <div className="header">
        <h1> <strong>Image Converter</strong>  </h1>
      </div>
      <main className="main">
        
       
      <Image
        className="comparison-image"
        src={"/image_comparision.png"}
        alt="Comparison"
        width={774}
        height={400}
      />

      <div className="formRect">
        <div className="formTextDiv">
          <p className="formText">Upload your .bmp file and turn it into grayscale jpg !!!</p>
          
        </div>

        <div className="divider"/>
        
        <div className="formDiv">

          { isLoading ?  <p>Loading...</p>:
            <form onSubmit={submitHandler}>
              <input type="file"
              required 
              onChange={(e) => changeFile(e.target.files?.item(0) || null)}
              />

              <button type="submit"> Submit</button>
            </form>
          }
        </div>
      </div>
      
   
       

      </main>

    
      <footer className="footer-text">
        <p>
        ShavelDev
        </p>
      </footer>

    </>
  );
}
