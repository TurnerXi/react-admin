import React from 'react';
import { IntlProvider } from 'react-intl';
import enUS from './locale/en_US';
import zhCN from './locale/zh_CN';

export default class I18nProvider extends React.Component {
  constructor() {
    super();
    this.state = { lang: 'zh' };
  }

  render() {
    const { children, scope } = this.props;
    const { lang } = this.state;
    const messages = {
      en: enUS,
      zh: zhCN,
    };
    return (
      <IntlProvider locale={lang} messages={messages[lang][scope]}>
        {children}
      </IntlProvider>
    );
  }
}
