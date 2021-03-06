const db = require('../server/common/db').default;

const menus = [
  {
    title: 'permission',
    icon: 'lock',
    path: '/permisson',
    children: [
      {
        path: '/permission/page',
        component: '/permission/page',
        title: 'pagePermission',
      },
      {
        path: '/permission/directive',
        component: '/permission/directive',
        title: 'Directive Permission',
      },
      {
        path: '/permission/role',
        component: '/permission/role',
        title: 'rolePermission',
      },
    ],
  },
  {
    path: '/icon',
    component: '/icon',
    title: 'icons',
    icon: 'sketch',
  },
  {
    title: 'components',
    icon: 'component',
    path: '/component',
    children: [
      {
        path: '/component/tinymce',
        component: '/component/tinymce',
        title: 'Tinymce',
      },
      {
        path: '/component/markdown',
        component: '/component/markdown',
        title: 'Markdown',
      },
      {
        path: '/component/json-editor',
        component: '/component/json-editor',
        title: 'JSON Editor',
      },
      {
        path: '/component/split-pane',
        component: '/component/split-pane',
        title: 'SplitPane',
      },
      {
        path: '/component/avatar-upload',
        component: '/component/avatar-upload',
        title: 'Upload',
      },
      {
        path: '/component/dropzone',
        component: '/component/dropzone',
        title: 'Dropzone',
      },
      {
        path: '/component/sticky',
        component: '/component/sticky',
        title: 'sticky',
      },
      {
        path: '/component/count-to',
        component: '/component/count-to',
        title: 'countTo',
      },
      {
        path: '/component/mixin',
        component: '/component/mixin',
        title: 'componentMixin',
      },
      {
        path: '/component/back-to-top',
        component: '/component/mixin',
        title: 'Back To Top',
      },
      {
        path: '/component/drag-dialog',
        component: '/component/mixin',
        title: 'Drag Dialog',
      },
      {
        path: '/component/drag-select',
        component: '/component/mixin',
        title: 'Drag Select',
      },
      {
        path: '/component/dnd-list',
        component: '/component/mixin',
        title: 'Dnd List',
      },
      {
        path: '/component/drag-kanban',
        component: '/component/mixin',
        title: 'Drag Kanban',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'bar-chart',
    path: '/charts',
    children: [
      {
        path: '/charts/keyboard',
        component: '/charts/keyboard',
        title: 'Keyboard Chart',
      },
      {
        path: '/charts/line',
        component: '/charts/line',
        title: 'Line Chart',
      },
      {
        path: '/charts/mix-chart',
        component: '/charts/mix-chart',
        title: 'Mix Chart',
      },
    ],
  },
  {
    title: 'Nested Routes',
    icon: 'align-right',
    path: '/nested',
    children: [
      {
        title: 'Menu 1',
        path: '/nested/menu1',
        children: [
          {
            path: '/nested/menu1/menu1-1',
            component: '/nested/menu1/menu1-1',
            title: 'Menu 1-1',
          },
          {
            title: 'Menu 1-2',
            path: '/nested/menu1/menu1-2',
            children: [
              {
                path: '/nested/menu1/menu1-2/menu1-2-1',
                component: '/nested/menu1/menu1-2/menu1-2-1',
                title: 'Menu 1-2-1',
              },
              {
                path: '/nested/menu1/menu1-2/menu1-2-2',
                component: '/nested/menu1/menu1-2/menu1-2-2',
                title: 'Menu 1-2-2',
              },
            ],
          },
          {
            path: '/nested/menu1/menu1-3',
            component: '/nested/menu1/menu1-3',
            title: 'Menu 1-3',
          },
        ],
      },
      {
        path: '/nested/menu2',
        component: '/nested/menu2',
        title: 'Menu 2',
      },
    ],
  },
  {
    title: 'Table',
    icon: 'table',
    path: '/table',
    children: [
      {
        path: '/table/dynamic-table',
        component: '/table/dynamic-table',
        title: 'Dynamic Table',
      },
      {
        path: '/table/drag-table',
        component: '/table/drag-table',
        title: 'Drag Table',
      },
      {
        path: '/table/inline-edit-table',
        component: '/table/inline-edit-table',
        title: 'Inline Edit',
      },
      {
        path: '/table/complex-table',
        component: '/table/complex-table',
        title: 'Complex Table',
      },
    ],
  },
  {
    title: 'Example',
    icon: 'experiment',
    path: '/example',
    children: [
      {
        path: '/example/create',
        component: '/example/create',
        title: 'Create Article',
        icon: 'edit',
      },
      {
        path: '/example/list',
        component: '/example/list',
        title: 'Article List',
        icon: 'unordered-list',
      },
      {
        path: '/example/edit/:id(\\d+)',
        component: '/example/edit',
        title: 'Edit Article',
        noCache: true,
        activeMenu: '/example/list',
        hidden: true,
      },
    ],
  },
  {
    path: '/tab',
    component: '/tab',
    title: 'Tab',
    icon: 'folder',
  },
  {
    title: 'Error Pages',
    icon: 'close-square',
    path: '/error-page',
    children: [
      {
        path: '/error-page/401',
        component: '/error-page/401',
        title: '401',
      },
      {
        path: '/error-page/404',
        component: '/error-page/404',
        title: '404',
      },
    ],
  },
  {
    path: '/error-log',
    component: '/error-log',
    title: 'Error Log',
    icon: 'bug',
  },
  {
    title: 'Excel',
    icon: 'file-excel',
    path: '/excel',
    children: [
      {
        path: '/excel/export-excel',
        component: '/excel/export-excel',
        title: 'Export Excel',
      },
      {
        path: '/excel/export-selected-excel',
        component: '/excel/export-selected-excel',
        title: 'Export Selected',
      },
      {
        path: '/excel/export-merge-header',
        component: '/excel/export-merge-header',
        title: 'Merge Header',
      },
      {
        path: '/excel/upload-excel',
        component: '/excel/upload-excel',
        title: 'Upload Excel',
      },
    ],
  },
  {
    title: 'Zip',
    icon: 'file-zip',
    path: '/zip',
    children: [
      {
        path: '/zip/download',
        component: '/zip',
        title: 'Export Zip',
      },
    ],
  },
  {
    path: '/pdf',
    component: '/pdf',
    title: 'PDF',
    icon: 'file-pdf',
  },
  {
    path: '/pdf/download',
    component: '/pdf/download',
    title: 'PDFDownload',
    hidden: true,
  },
  {
    path: '/theme',
    component: '/theme',
    title: 'Theme',
    icon: 'skin',
  },
  {
    path: '/clipboard',
    component: '/clipboard',
    title: 'Clipboard',
    icon: 'copy',
  },
  {
    path: '/i18n',
    component: '/i18n',
    title: 'i18n',
    icon: 'international',
  },
  {
    path: 'https://github.com/PanJiaChen/vue-element-admin',
    title: 'External Link',
    icon: 'link',
  },
];

saveMenus(menus);

function saveMenus(menu, parentId) {
  menu.forEach(async item => {
    const { path, title, icon, component, hidden = 0 } = item;
    const data = {
      path,
      title,
      icon: icon || '',
      component: component || '',
      hidden: hidden ? 1 : 0,
      pid: parentId || 0,
    };
    await db.query('insert into sys_menu set ?', data);
    if (item.children) {
      const [results] = await db.query('select id from sys_menu where path = ?', [data.path]);
      console.log(results[0]);
      saveMenus(item.children, results[0].id);
    }
  });
}
