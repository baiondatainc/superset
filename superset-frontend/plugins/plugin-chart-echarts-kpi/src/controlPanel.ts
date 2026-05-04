const config = {
  controlPanelSections: [
    {
      label: 'KPI Settings',
      expanded: true,
      controlSetRows: [
        ['metric'],

        [
          {
            name: 'title',
            config: {
              type: 'TextControl',
              label: 'Title',
              default: 'KPI',
            },
          },
        ],

        [
          {
            name: 'icon',
            config: {
              type: 'SelectControl',
              label: 'Icon',
              default: 'up',
              choices: [
                ['up', '⬆️ Up'],
                ['down', '⬇️ Down'],
                ['error', '⚠️ Error'],
                ['user', '👤 User'],
                ['api', '🔌 API'],
                ['clock', '⏱ Timeout'],
              ],
            },
          },
        ],

        [
          {
            name: 'search_text',
            config: {
              type: 'TextControl',
              label: 'Search Label',
              default: '',
            },
          },
        ],
      ],
    },
  ],
};

export default config;