import { RichTextEditor, Link } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import Mention from '@tiptap/extension-mention'

// import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit'
// import Underline from '@tiptap/extension-underline';
// import TextAlign from '@tiptap/extension-text-align';
// import Superscript from '@tiptap/extension-superscript';
// import SubScript from '@tiptap/extension-subscript';

function RichText({ value }: any) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      // Underline,
      Link,
      // Mention.configure({
      //   HTMLAttributes: {
      //     class: 'mention',
      //   },
      //   suggestion,
      // }),
      // Superscript,
      // SubScript,
      // Highlight,
      // TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value,
  })

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          {/* <RichTextEditor.Underline /> */}
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          {/* <RichTextEditor.Highlight /> */}
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          {/* <RichTextEditor.Subscript /> */}
          {/* <RichTextEditor.Superscript /> */}
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        {/* <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup> */}
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  )
}

export default RichText
