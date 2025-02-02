import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

// Title Component
const Title = () => <p>Demo editor by Aman prakash</p>;

const SaveButton = ({ saveContent }) => (
  <button onClick={saveContent} style={{ marginBottom: "10px" }}>
    Save
  </button>
);

const customStyleMap = {
  RED_LINE: { color: "red" },
  UNDERLINE: { textDecoration: "underline" },
};

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    return savedContent
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
      : EditorState.createEmpty();
  });

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleBeforeInput = (chars, editorState) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const block = currentContent.getBlockForKey(selection.getStartKey());
    const text = block.getText();

    if (chars === " " && text.startsWith("#")) {
      const newContentState = Modifier.replaceText(
        currentContent,
        selection.merge({ anchorOffset: 0, focusOffset: 1 }),
        "",
        null
      );
      setEditorState(
        RichUtils.toggleBlockType(
          EditorState.push(editorState, newContentState, "change-block-type"),
          "header-one"
        )
      );
      return "handled";
    }

    if (chars === " " && text.startsWith("***")) {
      const newContentState = Modifier.replaceText(
        currentContent,
        selection.merge({ anchorOffset: 0, focusOffset: 3 }),
        "",
        null
      );

      let newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-inline-style"
      );

      newEditorState = RichUtils.toggleInlineStyle(newEditorState, "RED_LINE");

      newEditorState = RichUtils.toggleInlineStyle(newEditorState, "UNDERLINE");

      setEditorState(newEditorState);
      return "handled";
    }

    if (chars === " " && text.startsWith("**")) {
      const newContentState = Modifier.replaceText(
        currentContent,
        selection.merge({ anchorOffset: 0, focusOffset: 2 }),
        "",
        null
      );
      setEditorState(
        RichUtils.toggleInlineStyle(
          EditorState.push(editorState, newContentState, "change-inline-style"),
          "RED_LINE"
        )
      );
      return "handled";
    }

    if (chars === " " && text.startsWith("*")) {
      const newContentState = Modifier.replaceText(
        currentContent,
        selection.merge({ anchorOffset: 0, focusOffset: 1 }),
        "",
        null
      );
      setEditorState(
        RichUtils.toggleInlineStyle(
          EditorState.push(editorState, newContentState, "change-inline-style"),
          "BOLD"
        )
      );
      return "handled";
    }

    return "not-handled";
  };

  const saveContent = () => {
    const content = editorState.getCurrentContent();
    localStorage.setItem(
      "editorContent",
      JSON.stringify(convertToRaw(content))
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Title />
        <SaveButton saveContent={saveContent} />
      </div>
      <div
        style={{
          border: "1px solid #ccc",
          minHeight: "500px",
          padding: "10px",
        }}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          handleBeforeInput={handleBeforeInput}
          customStyleMap={customStyleMap}
        />
      </div>
    </div>
  );
};

export default DraftEditor;
// https://codesandbox.io/p/sandbox/busy-jennings-pr58nk
