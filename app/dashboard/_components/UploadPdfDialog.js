"use client"
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { getFileUrl } from "@/convex/fileStorage";

const UploadPdfDialog = ({ children }) => {

    const generateUploadUrl=useMutation(api.fileStorage.generateUploadUrl);
    const InsertFileEntryToDb=useMutation(api.fileStorage.AddFileEntryToDb);
    const getFileUrl=useMutation(api.fileStorage.getFileUrl);
    const {user}=useUser();
    const [file,setFile]=React.useState();
    const [loading,setLoading]=React.useState(false);
    const [fileName,setFileName]=React.useState('');

    const onFileSelect=(e)=>{
        setFile(e.target.files[0]);
    }

    const onUpload=async()=>{
        setLoading(true);
        // Step 1: Get a short-lived upload URL
        const postUrl = await generateUploadUrl();
        // Step 2: POST the file to the URL
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file?.type },
            body: file,
        });

        const {storageId}=await result.json();
        console.log(storageId);
        const fileId=uuid4();
        const fileUrl=await getFileUrl({storageId:storageId});
        // Step 3: Save the newly allocated storage id to the database

        const response=await InsertFileEntryToDb({
            storageId:storageId,
            fileId:fileId,
            fileName:fileName??'Untitled File', 
            createdBy:user?.primaryEmailAddress?.emailAddress || 'Anonymous',
            fileUrl:fileUrl
        });
        // console.log(response);
        setLoading(false);
    }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Pdf File</DialogTitle>
          <DialogDescription asChild>
            <div>
            <h2 className="mt-5 ">Select a file to Upload</h2>

                <div className="gap-2 p-3 rounded-md border">
                    <input type="file" accept="application/pdf"
                        onChange={(e)=>onFileSelect(e)}
                    />
                </div>
                <div className="mt-2">
                    <label>File Name *</label>
                    <Input placeholder="Enter File Name" onChange={(e)=>setFileName(e.target.value)} />
                </div>
                <div>
                    
                </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={onUpload}>
            {loading?
                <Loader2Icon className="animate-spin"/>:'Upload'
            }
            
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPdfDialog;