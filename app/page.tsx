"use client";
import Image from "next/image";
import { useState } from "react";


export default function Home() {

  const [file, changeFile] = useState<File | null>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!file){
      console.error("No file provided");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file as File);


    try{
      const response = await fetch("/api/convert",{
        method: 'POST',
        body: formData
      })
      
      if(!response.ok){
        throw("ERROR: there is a problem with the reponse")
        return;
      }

      const data = await response.json();

      console.log("DATA RECEIVED SUCCESSFULY")
      console.log(data.success);


     
      return;

    }catch(error){
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

      <form onSubmit={submitHandler}>
    
        <input type="file"
          required 
          onChange={(e) => changeFile(e.target.files?.item(0) || null)}
        />

        <button type="submit"> Submit</button>



      </form>

          
       

      </main>
      <footer className="footer-text">
        <p>
        ShavelDev
        </p>
      </footer>

    </>
  );
}
