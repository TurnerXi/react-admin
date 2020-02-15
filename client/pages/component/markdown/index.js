import React, { Component } from 'react';
import Markdown, { MarkdownViewer } from '@/assets/components/Markdown';
import { connect } from 'react-redux';

const content = [
  '| @cols=2:merged |',
  '| --- | --- |',
  '| table | table |',
  '```uml',
  'partition Conductor {',
  '  (*) --> "Climbs on Platform"',
  '  --> === S1 ===',
  '  --> Bows',
  '}',
  '',
  'partition Audience #LightSkyBlue {',
  '  === S1 === --> Applauds',
  '}',
  '',
  'partition Conductor {',
  '  Bows --> === S2 ===',
  '  --> WavesArmes',
  '  Applauds --> === S2 ===',
  '}',
  '',
  'partition Orchestra #CCCCEE {',
  '  WavesArmes --> Introduction',
  '  --> "Play music"',
  '}',
  '```',
  '```chart',
  ',category1,category2',
  'Jan,21,23',
  'Feb,31,17',
  '',
  'type: column',
  'title: Monthly Revenue',
  'x.title: Amount',
  'y.title: Month',
  'y.min: 1',
  'y.max: 40',
  'y.suffix: $',
  '```',
].join('\n');

class MarkdownPage extends Component {
  onChange = value => {
    console.log(value);
  };

  render() {
    const { lang } = this.props;
    return (
      <div>
        <Markdown initialValue={content} language={lang} onChange={this.onChange} />
        <Markdown initialValue={content} previewStyle="tab" language={lang} />
        <MarkdownViewer initialValue={content} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.system.lang === 'zh' ? 'zh_CN' : 'en_US',
  };
};
export default connect(mapStateToProps)(MarkdownPage);
