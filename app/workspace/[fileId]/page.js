"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import WorkspaceHeader from '../_components/WorkspaceHeader';
import PdfViewer from '../_components/PdfViewer';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TextEditor from '../_components/TextEditor';

const Workspace = () => {
  const { fileId } = useParams();

  const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
    fileId: fileId,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (fileInfo) {
      // Simulate a short delay for smoother loading experience
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [fileInfo]);

  return (
    <div>
      <WorkspaceHeader fileName={fileInfo?.fileName}/>

      {isLoading ? (
        // Loader Component
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        // Content when not loading
        <div className="grid grid-cols-2 gap-5">
          <div>
            {/* Text Editor */}
            <TextEditor />
          </div>
          <div>
            {/* Pdf Viewer */}
            <PdfViewer fileUrl={fileInfo?.fileUrl} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Workspace;
