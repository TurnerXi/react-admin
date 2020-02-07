export const asyncRoutes = [
  {
    title: 'Permission',
    icon: 'lock',
    children: [
      {
        path: '/permission/page',
        component: '/permission/page',
        title: 'Page Permission',
      },
      {
        path: '/permission/directive',
        component: '/permission/directive',
        title: 'Directive Permission',
      },
      {
        path: '/permission/role',
        component: '/permission/role',
        title: 'Role Permission',
      },
    ],
  },
  {
    path: '/icon',
    component: '/icon',
    title: 'Icons',
    icon: 'icon',
  },
  {
    title: 'Components',
    icon: 'component',
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
        title: 'Sticky',
      },
      {
        path: '/component/count-to',
        component: '/component/count-to',
        title: 'Count To',
      },
      {
        path: '/component/mixin',
        component: '/component/mixin',
        title: 'Component Mixin',
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
    icon: 'chart',
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
    icon: 'nested',
    children: [
      {
        title: 'Menu 1',
        children: [
          {
            path: '/nested/menu1/menu1-1',
            component: '/nested/menu1/menu1-1',
            title: 'Menu 1-1',
          },
          {
            title: 'Menu 1-2',
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
    icon: 'example',
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
        icon: 'list',
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
    icon: 'tab',
  },
  {
    title: 'Error Pages',
    icon: '404',
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
    icon: 'excel',
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
    icon: 'zip',
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
    icon: 'pdf',
  },
  {
    path: '/pdf/download',
    component: '/pdf/download',
    hidden: true,
  },
  {
    path: '/theme',
    component: '/theme',
    title: 'Theme',
    icon: 'theme',
  },
  {
    path: '/clipboard',
    component: '/clipboard',
    title: 'Clipboard',
    icon: 'clipboard',
  },
  {
    path: 'https://github.com/PanJiaChen/vue-element-admin',
    title: 'External Link',
    icon: 'link',
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
];
