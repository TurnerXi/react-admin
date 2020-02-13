import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

class I18nProvider extends React.Component {
  render() {
    const { children, scope = 'global', lang, languages } = this.props;
    const messages = {
      global: {},
    };
    languages.forEach(item => {
      let { code, scope: itemScope, zh } = item;
      itemScope = itemScope || 'global';
      if (!messages[itemScope]) {
        messages[itemScope] = {};
      }
      messages[itemScope][code] = item[lang] || zh;
    });
    return (
      <IntlProvider locale={lang} messages={{ ...messages['global'], ...messages[scope] }}>
        {children}
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => {
  return { lang: state.system.lang, languages: state.system.languages };
};

export default connect(mapStateToProps)(I18nProvider);
