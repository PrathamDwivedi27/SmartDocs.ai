"use client"
import React from 'react'
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



const TextEditor = () => {
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
    
  return (
    <div>
        <EditorExtension editor={editor} />
      <div>
      <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default TextEditor
