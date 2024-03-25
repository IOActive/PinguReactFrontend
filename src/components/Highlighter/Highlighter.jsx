import SyntaxHighlighter from "react-syntax-highlighter";
import cx from "classnames";

import s from "./Highlighter.module.scss";

export const Highlighter = ({ language, theme, children }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={theme}
      className={cx(s.highlighter)}
    >
      {children}
    </SyntaxHighlighter>
  );
};