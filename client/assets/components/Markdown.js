import React from 'react';
import { Editor, Viewer } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
/** 可选插件 */
import 'tui-editor/dist/tui-editor-extChart';
import 'tui-editor/dist/tui-editor-extColorSyntax';
import 'tui-editor/dist/tui-editor-extScrollSync';
import 'tui-editor/dist/tui-editor-extTable';
import 'tui-editor/dist/tui-editor-extUML';

const initialConfig = {
  height: 600,
  previewStyle: 'vertical',
  usageStatistics: false,
  initialEditType: 'markdown',
  exts: [
    {
      name: 'chart',
      minWidth: 100,
      maxWidth: 600,
      minHeight: 100,
      maxHeight: 300,
    },
    'scrollSync',
    'colorSyntax',
    'uml',
    'mark',
    'table',
  ],
};

export const MarkdownViewer = function({ initialValue, height = '600px' }) {
  const config = { ...initialConfig, initialValue, height };
  return <Viewer {...config} />;
};

/**
 * previewStyle 'vertical'(同屏显示)|'tab'(分屏显示)
 * initialValue 初始化内容
 * height markdown高度
 * language 'zh_CN'|'en_US'...
 * onChange (value)=>{}
 */
export default function({
  previewStyle = 'vertical',
  initialValue,
  height = '600px',
  onChange,
  language,
}) {
  const ref = React.createRef();
  const config = { ...initialConfig, initialValue, previewStyle, height, language };
  return (
    <Editor
      ref={ref}
      {...config}
      onChange={() => {
        if (typeof onChange === 'function') {
          onChange(ref.current.getInstance().getMarkdown());
        }
      }}
    />
  );
}
