"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [file, changeFile] = useState<File | null>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if(!file){
      console.error("No file provided");
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
        required />

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
