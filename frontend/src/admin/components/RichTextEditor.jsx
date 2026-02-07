import { useRef, useEffect, useState } from "react";

export default function RichTextEditor({ value, onChange }) {
  const editor = useRef(null);
  const imageInput = useRef(null);
  const [activeFormats, setActiveFormats] = useState({});
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    if (editor.current && editor.current.innerHTML !== value) {
      editor.current.innerHTML = value || "<p></p>";
    }
  }, [value]);

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      ul: document.queryCommandState("insertUnorderedList"),
      ol: document.queryCommandState("insertOrderedList"),
    });
  };

  const exec = (cmd, val = null) => {
    editor.current.focus();
    document.execCommand(cmd, false, val);
    onChange(editor.current.innerHTML);
    updateActiveFormats();
  };

  const formatBlock = (tag) => {
    exec("formatBlock", `<${tag}>`);
  };

  const insertLink = () => {
    if (!linkUrl) return;
    exec("createLink", linkUrl);
    setLinkUrl("");
    setShowLinkInput(false);
  };

  const removeLink = () => {
    exec("unlink");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = `<img src="${event.target.result}" alt="Uploaded image" style="max-width: 100%; height: auto; display: block; margin: 15px 0; border-radius: 8px;" />`;
      document.execCommand("insertHTML", false, img);
      onChange(editor.current.innerHTML);
    };
    reader.readAsDataURL(file);
    
    // Reset input
    e.target.value = "";
  };

  const triggerImageUpload = () => {
    imageInput.current?.click();
  };

  return (
    <div className="rich-text-editor">
      <div className="rte-toolbar">
        {/* Text Formatting */}
        <div className="toolbar-group">
          <button 
            type="button" 
            className={activeFormats.bold ? "toolbar-btn active" : "toolbar-btn"}
            onClick={() => exec("bold")}
            title="Bold (Ctrl+B)"
          ><b>B</b></button>
          <button 
            type="button" 
            className={activeFormats.italic ? "toolbar-btn active" : "toolbar-btn"}
            onClick={() => exec("italic")}
            title="Italic (Ctrl+I)"
          ><i>I</i></button>
          <button 
            type="button" 
            className={activeFormats.underline ? "toolbar-btn active" : "toolbar-btn"}
            onClick={() => exec("underline")}
            title="Underline (Ctrl+U)"
          ><u>U</u></button>
        </div>

        {/* Headings */}
        <div className="toolbar-group">
          <button 
            type="button" 
            className="toolbar-btn"
            onClick={() => formatBlock("h1")}
            title="Heading 1"
          >H1</button>
          <button 
            type="button" 
            className="toolbar-btn"
            onClick={() => formatBlock("h2")}
            title="Heading 2"
          >H2</button>
          <button 
            type="button" 
            className="toolbar-btn"
            onClick={() => formatBlock("h3")}
            title="Heading 3"
          >H3</button>
          <button 
            type="button" 
            className="toolbar-btn"
            onClick={() => formatBlock("p")}
            title="Paragraph"
          >P</button>
        </div>

        {/* Lists */}
        <div className="toolbar-group">
          <button 
            type="button" 
            className={activeFormats.ul ? "toolbar-btn active" : "toolbar-btn"}
            onClick={() => exec("insertUnorderedList")}
            title="Bullet List"
          >• List</button>
          <button 
            type="button" 
            className={activeFormats.ol ? "toolbar-btn active" : "toolbar-btn"}
            onClick={() => exec("insertOrderedList")}
            title="Numbered List"
          >1. List</button>
        </div>

        {/* Links */}
        <div className="toolbar-group">
          <button 
            type="button" 
            className="toolbar-btn"
            onClick={() => setShowLinkInput(!showLinkInput)}
            title="Insert Link"
          >🔗 Link</button>
          <button 
            type="button" 
            className="toolbar-btn"
            onClick={removeLink}
            title="Remove Link"
          >🔗✕</button>
        </div>

        {/* Alignment */}
        <div className="toolbar-group">
          <button 
            type="button" 
            className="toolbar-btn"
            onClick={() => exec("justifyLeft")}
            title="Align Left"
          >⬅</button>
          <button 
            type="button" 
            className="toolbar-btn"
            onClick={() => exec("justifyCenter")}
            title="Align Center"
          >⬌</button>
          <button 
            type="button" 
            className="toolbar-btn"
            onClick={() => exec("justifyRight")}
            title="Align Right"
          >➡</button>
        </div>

        {/* Other */}
        <div className="toolbar-group">
          <button 
            type="button" 
            className="toolbar-btn"
            onClick={triggerImageUpload}
            title="Insert Image"
          >🖼️ Image</button>
          <input
            ref={imageInput}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <button 
            type="button" 
            className="toolbar-btn"
            onClick={() => exec("insertHorizontalRule")}
            title="Horizontal Line"
          >―</button>
          <button 
            type="button" 
            className="toolbar-btn"
            onClick={() => exec("removeFormat")}
            title="Clear Formatting"
          >✕ Clear</button>
        </div>
      </div>

      {/* Link Input */}
      {showLinkInput && (
        <div className="link-input-panel">
          <input
            type="url"
            placeholder="Enter URL (https://...)"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && insertLink()}
          />
          <button type="button" onClick={insertLink}>Insert</button>
          <button type="button" onClick={() => setShowLinkInput(false)}>Cancel</button>
        </div>
      )}

      <div
        ref={editor}
        className="rich-text-editor-content"
        contentEditable
        spellCheck
        onInput={() => onChange(editor.current.innerHTML)}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        onClick={updateActiveFormats}
      />
    </div>
  );
}
