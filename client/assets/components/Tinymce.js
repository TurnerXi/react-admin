import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce';

const initConfig = {
  height: 600,
  base_url: '/public/tinymce',
  plugins: `print preview paste importcss searchreplace autolink autosave
    save directionality code visualblocks visualchars fullscreen image
    link media template codesample table charmap hr pagebreak nonbreaking
    anchor toc insertdatetime advlist lists wordcount imagetools
    textpattern noneditable help charmap quickbars emoticons`,
  menubar: 'file edit view insert format tools table help',
  toolbar: `undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect
     | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist
     | forecolor backcolor removeformat | pagebreak | charmap emoticons
     | fullscreen  preview save print | insertfile image media template link anchor codesample
     | ltr rtl`,
  toolbar_sticky: true,
  autosave_ask_before_unload: true,
  autosave_interval: '30s',
  autosave_prefix: '{path}{query}-{id}-',
  autosave_restore_when_empty: false,
  autosave_retention: '2m',
  image_advtab: true,
  importcss_append: true,
  image_caption: true,
  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
  noneditable_noneditable_class: 'mceNonEditable',
  toolbar_drawer: 'sliding',
  contextmenu: 'link image imagetools table',
};
export default function Tinymce(props) {
  const { initialValue, init, onChange, lang } = props;
  const config = { ...initConfig, ...init, language: lang === 'zh' ? 'zh_CN' : '' };
  return <Editor initialValue={initialValue} init={config} onEditorChange={onChange} />;
}
