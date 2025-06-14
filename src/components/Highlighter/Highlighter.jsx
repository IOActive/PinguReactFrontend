/* Copyright 2024 IOActive

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable limport { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { shell} from "react-syntax-highlighter/dist/esm/languages/hljs";w or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

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