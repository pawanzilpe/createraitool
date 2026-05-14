import React, { useRef, useEffect } from "react";
import "./RichTextEditor.css";

const RichTextEditor = () => {
  const editorRef = useRef(null);

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    updateActiveButtons();
  };

  const updateActiveButtons = () => {
    document.querySelectorAll(".toolbar button").forEach((button) => {
      button.classList.remove("active");
    });
    if (document.queryCommandState("bold")) {
      document
        .querySelector('button[data-command="bold"]')
        .classList.add("active");
    }
    if (document.queryCommandState("italic")) {
      document
        .querySelector('button[data-command="italic"]')
        .classList.add("active");
    }
    if (document.queryCommandState("underline")) {
      document
        .querySelector('button[data-command="underline"]')
        .classList.add("active");
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case "b":
          e.preventDefault();
          formatText("bold");
          break;
        case "i":
          e.preventDefault();
          formatText("italic");
          break;
        case "u":
          e.preventDefault();
          formatText("underline");
          break;
        case "z":
          e.preventDefault();
          if (e.shiftKey) {
            formatText("redo");
          } else {
            formatText("undo");
          }
          break;
        case "y":
          e.preventDefault();
          formatText("redo");
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    editorRef.current.focus();
    const handleSelectionChange = () => {
      if (document.activeElement === editorRef.current) {
        updateActiveButtons();
      }
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  return (
    <div className="editor-container">
      <div className="toolbar">
        <div className="toolbar-group">
          <button
            data-command="bold"
            onClick={() => formatText("bold")}
            title="Bold (Ctrl+B)"
          >
            <b>B</b>
          </button>
          <button
            data-command="italic"
            onClick={() => formatText("italic")}
            title="Italic (Ctrl+I)"
          >
            <i>I</i>
          </button>
          <button
            data-command="underline"
            onClick={() => formatText("underline")}
            title="Underline (Ctrl+U)"
          >
            <u>U</u>
          </button>
          <button
            onClick={() => formatText("strikeThrough")}
            title="Strikethrough"
          >
            <s>S</s>
          </button>
        </div>

        <div className="toolbar-group">
          <button onClick={() => formatText("justifyLeft")} title="Align Left">
            ⎡
          </button>
          <button
            onClick={() => formatText("justifyCenter")}
            title="Align Center"
          >
            ⎯
          </button>
          <button
            onClick={() => formatText("justifyRight")}
            title="Align Right"
          >
            ⎤
          </button>
          <button onClick={() => formatText("justifyFull")} title="Justify">
            ≡
          </button>
        </div>

        <div className="toolbar-group">
          <button
            onClick={() => formatText("insertUnorderedList")}
            title="Bullet List"
          >
            • List
          </button>
          <button
            onClick={() => formatText("insertOrderedList")}
            title="Numbered List"
          >
            1. List
          </button>
          <button onClick={() => formatText("outdent")} title="Outdent">
            ←
          </button>
          <button onClick={() => formatText("indent")} title="Indent">
            →
          </button>
        </div>

        <div className="toolbar-group">
          <select
            onChange={(e) => formatText("formatBlock", e.target.value)}
            title="Paragraph Format"
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="blockquote">Quote</option>
            <option value="pre">Code</option>
          </select>
        </div>

        <div className="toolbar-group">
          <select
            onChange={(e) => formatText("fontName", e.target.value)}
            title="Font Family"
          >
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times</option>
            <option value="Courier New">Courier</option>
            <option value="Comic Sans MS">Comic Sans</option>
          </select>

          <select
            onChange={(e) => formatText("fontSize", e.target.value)}
            title="Font Size"
          >
            <option value="1">8pt</option>
            <option value="2">10pt</option>
            <option value="3" selected>
              12pt
            </option>
            <option value="4">14pt</option>
            <option value="5">18pt</option>
            <option value="6">24pt</option>
            <option value="7">36pt</option>
          </select>
        </div>

        <div className="toolbar-group">
          <div className="color-picker">
            <span className="color-label">Text:</span>
            <input
              type="color"
              onChange={(e) => formatText("foreColor", e.target.value)}
              defaultValue="#000000"
              title="Text Color"
            />
          </div>

          <div className="color-picker">
            <span className="color-label">Bg:</span>
            <input
              type="color"
              onChange={(e) => formatText("hiliteColor", e.target.value)}
              defaultValue="#ffffff"
              title="Background Color"
            />
          </div>
        </div>

        <div className="toolbar-group">
          <button
            onClick={() => formatText("removeFormat")}
            title="Clear Formatting"
          >
            ✖
          </button>
          <button onClick={() => formatText("undo")} title="Undo (Ctrl+Z)">
            ↩
          </button>
          <button onClick={() => formatText("redo")} title="Redo (Ctrl+Y)">
            ↪
          </button>
        </div>
      </div>

      <div
        id="editor"
        ref={editorRef}
        contentEditable={true}
        data-placeholder="Type here..."
        onKeyDown={handleKeyDown}
        className="editor"
        suppressContentEditableWarning={true}
      >
        <h1 style={{ color: "#2c3e50" }}>Welcome to Rich Text Editor</h1>
        <p>
          This is a <strong>fully featured</strong> rich text editor built with
          JavaScript.
        </p>
        <p>
          You can <span style={{ color: "#e74c3c" }}>change text color</span>,{" "}
          <span style={{ backgroundColor: "#f1c40f" }}>highlight text</span>,
          and <u>format</u> content <i>any way</i> you like!
        </p>
        <ul>
          <li>Bullet lists</li>
          <li>Multiple levels</li>
        </ul>
        <blockquote>This is a block quote - great for citations</blockquote>
      </div>
    </div>
  );
};

export default RichTextEditor;
