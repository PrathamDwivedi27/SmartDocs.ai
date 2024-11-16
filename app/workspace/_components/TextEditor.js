"use client"
import React, { useEffect } from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import EditorExtension from "./EditorExtension"
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import { Blockquote } from '@tiptap/extension-blockquote';
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import WorkspaceHeader from './WorkspaceHeader'


const TextEditor = ({fileId}) => {
    const editor = useEditor({
        extensions: [StarterKit,Underline,Highlight,Blockquote,BulletList, OrderedList,TextAlign.configure({
            types: ['paragraph', 'heading'], // Add alignment support for these types
          }),
            Placeholder.configure({
                // Use a placeholder:
                placeholder: 'Start taking the notes here ...',
            }),
        ],
        editorProps: {
          attributes: {
            class: 'focus:oultine-none p-5 h-screen',
          },
        },
    })

    //Used to get Notes stored in the database
    const GetNotes=useQuery(api.notes.GetNotes,{
      fileId:fileId,
    })
    // console.log(GetNotes);
    //Set the notes to the editor
    useEffect(() => {
        editor&&editor.commands.setContent(GetNotes)
        
    }, [editor&&GetNotes]);

    // const handleSave = async () => {
    //   try {
    //     if (editor) {
    //       await saveNotes({
    //         fileId: fileId,
    //         notes: editor.getHTML(),
    //         createdBy: user?.primaryEmailAddress?.emailAddress,
    //       });
    //       alert('Notes saved successfully!');
    //     }
    //   } catch (error) {
    //     console.error('Error saving notes:', error);
    //     alert('Failed to save notes. Please try again.');
    //   }
    // };

    // const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
    //   fileId: fileId,
    // });
    
  return (
    <div>
        <EditorExtension editor={editor} />
      <div className='overflow-scroll h-[88vh]'>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default TextEditor
