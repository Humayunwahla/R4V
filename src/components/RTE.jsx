import { Editor } from '@tinymce/tinymce-react'
import React from 'react'

function RTE({ name, label, defaultValue = "" ,heightValue }) {
  return (
    <div>
      {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="mt-8">
        <Editor
        
          apiKey="gbldeb0mwdoymf1jhjj8473b8yy8thbddee12gmalm4li0ql"
          initialValue={defaultValue}
          init={{
            initialValue: defaultValue,
            height: heightValue,
            menubar: true,
            plugins: [
              "image", "advlist", "autolink", "lists", "link", "image",
              "charmap", "preview", "anchor", "searchreplace", "visualblocks",
              "code", "fullscreen", "insertdatetime", "media", "table", "code",
              "help", "wordcount", "anchor",
            ],
            toolbar:
              "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          name={name} // Add the name prop if needed for form submissions
        />
      </div>
    </div>
  )
}

export default RTE
