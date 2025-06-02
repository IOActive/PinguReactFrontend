import cx from "classnames";

import s from "./code_editor.module.scss";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export const CodeEditor = ({ code, setCode}) => {
  return (
    
      <CodeMirror
        value={code}
        theme={vscodeDark}
        onChange={setCode}
      />
  
  );
};