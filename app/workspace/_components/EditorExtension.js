import { useAction } from 'convex/react';
import { AlignCenter, AlignLeftIcon, AlignRightIcon, Bold, CodeIcon, HighlighterIcon, Italic, List, ListOrdered, Redo,  SparklesIcon, StrikethroughIcon, TextQuoteIcon, UnderlineIcon, Undo } from 'lucide-react';
import React from 'react'
import { useParams } from 'next/navigation';
import { api } from '@/convex/_generated/api';

const EditorExtension = ({editor}) => {
    if (!editor) {
        // If the editor is not yet initialized, return nothing or a loading placeholder.
        return null;
    }
      const {fileId} = useParams();
      const SearchAI=useAction(api.myAction.search);


      const onAiClick = async() => {
        // console.log('AI Clicked');
        const selection = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        );
        // console.log(selection);

        const result=await SearchAI({
            query:selection,
            fileId:fileId
        })
        console.log("Unformatted text ",result);
      }
  return (
    <div className='p-5'>
      <div className="control-group">
        <div className="button-group flex gap-3">
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'text-blue-500' : ''}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'text-blue-500' : ''}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'text-blue-500' : ''}
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'text-blue-500' : ''}
          >
            <Bold/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-blue-500' : ''}
          >
            <Italic/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'text-blue-500' : ''}
          >
            <UnderlineIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'text-blue-500' : ''}
          >
            <CodeIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'text-blue-500' : ''}
          >
            <List/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'text-blue-500' : ''}
          >
            <ListOrdered/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'text-blue-500' : ''}
          >
            <TextQuoteIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'text-blue-500' : ''}
          >
            <HighlighterIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'text-blue-500' : ''}
          >
            <StrikethroughIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'text-blue-500' : ''}
          >
            <AlignLeftIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'text-blue-500' : ''}
          >
            <AlignCenter/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'text-blue-500' : ''}
          >
            <AlignRightIcon/>
          </button>
          <button
            onClick={() => onAiClick()}
            className={'hover:text-blue-500'}
          >
            <SparklesIcon/>
          </button>
          <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
            <Undo/>
          </button>
          <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
            <Redo/>
          </button>
          </div>
          </div>
    </div>
  )
}

export default EditorExtension
