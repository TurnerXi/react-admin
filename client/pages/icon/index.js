/* eslint-disable max-classes-per-file */
import React, { Component } from 'react';
import { Icon, Card, Radio, Input } from 'antd';
import I18nProvider from '@/lang';
import { FormattedMessage } from 'react-intl';
import IconDetail from './detail';

const icons = {
  direction: `step-backward,step-forward,fast-backward,fast-forward,shrink,arrows-alt,
      down,up,left,right,caret-up,caret-down,caret-left,caret-right,up-circle,
      down-circle,left-circle,right-circle,double-right,double-left,vertical-left,
      vertical-right,vertical-align-top,vertical-align-middle,vertical-align-bottom,
      forward,backward,rollback,enter,retweet,swap,swap-left,swap-right,arrow-up,arrow-down,
      arrow-left,arrow-right,play-circle,up-square,down-square,left-square,right-square,
      login,logout,menu-fold,menu-unfold,border-bottom,border-horizontal,border-inner,
      border-outer,border-left,border-right,border-top,border-verticle,pic-center,
      pic-left,pic-right,radius-bottomleft,radius-bottomright,radius-upleft,
      radius-upright,fullscreen,fullscreen-exit`,
  suggestion: `question,question-circle,plus,
    plus-circle,pause,pause-circle,minus,minus-circle,plus-square,minus-square,
    info,info-circle,exclamation,exclamation-circle,close,close-circle,close-square,
    check,check-circle,check-square,clock-circle,warning,issues-close,stop`,
  edit: `edit,form,copy,scissor,delete,snippets,diff,highlight,align-center,align-left,
    align-right,bg-colors,bold,italic,underline,strikethrough,redo,undo,zoom-in,
    zoom-out,font-colors,font-size,line-height,dash,small-dash,sort-ascending,
    sort-descending,drag,ordered-list,unordered-list,radius-setting,column-width,
    column-height`,
  data: `area-chart,pie-chart,bar-chart,dot-chart,line-chart,radar-chart,
    heat-map,fall,rise,stock,box-plot,fund,sliders`,
  logo: `android,apple,windows,ie,chrome,github,aliwangwang,dingding,weibo-square,weibo-circle,taobao-circle,html5,weibo,
    twitter,wechat,youtube,alipay-circle,taobao,skype,qq,medium-workmark,gitlab,medium,
    linkedin,google-plus,dropbox,facebook,codepen,code-sandbox,amazon,google,codepen-circle,
    alipay,ant-design,ant-cloud,aliyun,zhihu,slack,slack-square,behance,behance-square,
    dribbble,dribbble-square,instagram,yuque,alibaba,yahoo,reddit,sketch`,
  other: `account-book,alert,api,appstore,audio,bank,bell,book,bug,bulb,calculator,build,calendar,camera,
    car,carry-out,cloud,code,compass,contacts,container,control,credit-card,crown,customer-service,
    dashboard,database,dislike,environment,experiment,eye-invisible,eye,file-add,file-excel,
    file-exclamation,file-image,file-markdown,file-pdf,file-ppt,file-text,file-unknown,file-word,
    file-zip,file,filter,fire,flag,folder-add,folder,folder-open,frown,funnel-plot,gift,hdd,heart,
    home,hourglass,idcard,insurance,interaction,layout,like,lock,mail,medicine-box,meh,message,
    mobile,money-collect,pay-circle,notification,phone,picture,play-square,printer,profile,
    project,pushpin,property-safety,read,reconciliation,red-envelope,rest,rocket,
    safety-certificate,save,schedule,security-scan,setting,shop,shopping,skin,smile,
    sound,star,switcher,tablet,tag,tags,tool,thunderbolt,trophy,unlock,usb,video-camera,
    wallet,apartment,audit,barcode,bars,block,border,branches,ci,cloud-download,
    cloud-server,cloud-sync,cloud-upload,cluster,coffee,copyright,deployment-unit,
    desktop,disconnect,dollar,download,ellipsis,euro,exception,export,file-done,
    file-jpg,file-protect,file-sync,file-search,fork,gateway,global,gold,history,
    import,inbox,key,laptop,link,line,loading-3-quarters,loading,man,menu,monitor,
    more,number,percentage,paper-clip,pound,poweroff,pull-request,qrcode,reload,
    safety,robot,scan,search,select,shake,share-alt,shopping-cart,solution,sync,
    table,team,to-top,trademark,transaction,upload,user-add,user-delete,usergroup-add,user,usergroup-delete,wifi,woman`,
};

const filleds = `step-backward,step-forward,fast-backward,fast-forward,caret-up,caret-down,
caret-left,caret-right,up-circle,down-circle,left-circle,right-circle,forward,backward,
play-circle,up-square,down-square,left-square,right-square,question-circle,plus-circle,
pause-circle,minus-circle,plus-square,minus-square,info-circle,exclamation-circle,close-circle,
close-square,check-circle,check-square,clock-circle,warning,stop,edit,copy,delete,snippets,
diff,highlight,pie-chart,box-plot,fund,sliders,android,apple,windows,chrome,github,aliwangwang,
weibo-square,weibo-circle,taobao-circle,html5,wechat,youtube,alipay-circle,skype,gitlab,l
inkedin,facebook,code-sandbox-circle,codepen-circle,slack-square,behance-square,dribbble-square,
instagram,yuque,yahoo,account-book,alert,alipay-square,amazon-circle,amazon-square,api,appstore,
audio,bank,behance-circle,bell,book,bug,bulb,calculator,build,calendar,camera,car,carry-out,
ci-circle,cloud,code-sandbox-square,code,compass,codepen-square,contacts,container,control,
copyright-circle,credit-card,crown,customer-service,dashboard,dingtalk-circle,database,
dingtalk-square,dislike,dollar-circle,dribbble-circle,dropbox-circle,dropbox-square,environment,
euro-circle,experiment,eye-invisible,eye,file-add,file-excel,file-exclamation,file-image,
file-markdown,file-pdf,file-ppt,file-text,file-unknown,file-word,file-zip,file,filter,fire,
flag,folder-add,folder,folder-open,frown,funnel-plot,gift,golden,google-circle,google-plus-circle,
google-plus-square,google-square,hdd,heart,home,hourglass,idcard,ie-circle,ie-square,insurance,
interaction,layout,like,lock,mail,medicine-box,medium-circle,medium-square,meh,message,mobile,
money-collect,pay-circle,notification,phone,picture,play-square,pound-circle,printer,profile,
project,pushpin,property-safety,qq-circle,qq-square,read,reconciliation,red-envelope,reddit-circle,
reddit-square,rest,rocket,safety-certificate,save,schedule,security-scan,setting,shop,shopping,
sketch-circle,sketch-square,skin,slack-circle,smile,sound,star,switcher,tablet,tag,tags,
taobao-square,tool,thunderbolt,trademark-circle,twitter-circle,trophy,twitter-square,unlock,
usb,video-camera,wallet,zhihu-circle,zhihu-square`.replace(/\s/g, '');

const twoTones = `up-circle,down-circle,left-circle,right-circle,play-circle,up-square,
down-square,left-square,right-square,question-circle,plus-circle,pause-circle,minus-circle,
plus-square,minus-square,info-circle,exclamation-circle,close-circle,close-square,check-circle,
check-square,clock-circle,warning,stop,edit,copy,delete,snippets,diff,highlight,pie-chart,
box-plot,fund,sliders,html5,account-book,alert,api,appstore,audio,bank,bell,book,bug,bulb,
calculator,build,calendar,camera,car,carry-out,cloud,code,compass,contacts,container,control,
credit-card,crown,customer-service,dashboard,database,dislike,environment,experiment,eye-invisible,
eye,file-add,file-excel,file-exclamation,file-image,file-markdown,file-pdf,file-ppt,file-text,
file-unknown,file-word,file-zip,file,filter,fire,flag,folder-add,folder,folder-open,frown,
funnel-plot,gift,hdd,heart,home,hourglass,idcard,insurance,interaction,layout,like,lock,mail,
medicine-box,meh,message,mobile,money-collect,notification,phone,picture,play-square,pound-circle,
printer,profile,project,pushpin,property-safety,reconciliation,red-envelope,rest,rocket,
safety-certificate,save,schedule,security-scan,setting,shop,shopping,skin,smile,sound,star,
switcher,tablet,tag,tags,tool,thunderbolt,trademark-circle,trophy,unlock,usb,video-camera,
wallet,ci,copyright,dollar,euro,gold`.replace(/\s/g, '');

class IconItem extends Component {
  constructor() {
    super();
    this.state = {
      blockStyle: {},
      iconStyle: {},
    };
  }

  onMouseEnter() {
    this.setState({
      blockStyle: { color: '#fff', backgroundColor: '#1890ff' },
      iconStyle: { transform: 'scale(1.4)' },
    });
  }

  onMouseLeave() {
    this.setState({ blockStyle: null, iconStyle: null });
  }

  render() {
    const { type, theme, onSelect } = this.props;
    return (
      <li
        role="presentation"
        className="c-icon-list__wrapper"
        style={this.state.blockStyle}
        onClick={() => onSelect(type)}
      >
        <Icon
          className="c-icon-list_icon"
          type={type}
          theme={theme}
          style={this.state.iconStyle}
          onMouseEnter={this.onMouseEnter.bind(this)}
          onMouseLeave={this.onMouseLeave.bind(this)}
        />
        <span>{this.props.type}</span>
      </li>
    );
  }
}

export default class IconPage extends Component {
  state = {
    theme: 'outlined',
    filter: '',
    selected: '',
  };

  onSelect = selected => {
    this.setState({ selected });
  };

  onFilterChange = () => {
    let timer = null;
    return e => {
      const { value } = e.target;
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.setState({ filter: value });
      }, 500);
    };
  };

  render() {
    const { theme, filter, selected } = this.state;

    const iconList = Object.keys(icons).map(type => {
      if (filter && icons[type].indexOf(filter) === -1) {
        return;
      }
      return (
        <div key={type}>
          <h3 style={{ margin: '28px 0 10px' }}>
            <FormattedMessage id={type} />
          </h3>
          <ul className="c-icon-list">
            {icons[type].split(',').map(name => {
              if (
                (filter && name.indexOf(filter) === -1) ||
                (theme === 'filled' && filleds.split(',').indexOf(name) === -1) ||
                (theme === 'twoTone' && twoTones.split(',').indexOf(name) === -1)
              ) {
                return;
              }
              return (
                <IconItem key={name} {...{ type: name.trim(), theme, onSelect: this.onSelect }} />
              );
            })}
          </ul>
        </div>
      );
    });

    return (
      <I18nProvider scope="icon">
        <Card>
          <div className="c-icon-list__toolbar">
            <div>
              <Radio.Group value={theme} onChange={e => this.setState({ theme: e.target.value })}>
                <Radio.Button value="outlined">
                  <FormattedMessage id="outlined" />
                </Radio.Button>
                <Radio.Button value="filled">
                  <FormattedMessage id="filled" />
                </Radio.Button>
                <Radio.Button value="twoTone">
                  <FormattedMessage id="twoTone" />
                </Radio.Button>
              </Radio.Group>
            </div>
            <div className="c-icon-list__search">
              <FormattedMessage id="filterPlaceholder">
                {msg => <Input placeholder={msg} onChange={this.onFilterChange()} allowClear />}
              </FormattedMessage>
            </div>
          </div>
          <div>{iconList}</div>
        </Card>
        {selected && (
          <IconDetail
            type={selected}
            theme={theme}
            onCancel={() => this.setState({ selected: null })}
          />
        )}
      </I18nProvider>
    );
  }
}
