import { ControlPanelConfig, t } from '@superset-ui/chart-controls';

const controlPanel: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: 'Timeline Settings',
      expanded: true,

      controlSetRows: [
        // 🔥 Dynamic Heading
        [
          {
            name: 'heading',
            config: {
              type: 'TextControl',
              label: 'Heading',
              default: 'Heading',
              renderTrigger: true,
              description: 'Main dashboard heading',
            },
          },
        ],

        // 🔥 Dynamic Description
        [
          {
            name: 'description',
            config: {
              type: 'TextControl',
              label: 'Description',
              default: 'Description',
              renderTrigger: true,
              description: 'Top panel description',
            },
          },
        ],

        // 🔥 Dynamic Side Text
        [
          {
            name: 'side_text',
            config: {
              type: 'TextControl',
              label: 'Side Text',
              default: 'Details panel',
              renderTrigger: true,
              description: 'Additional top panel text',
            },
          },
        ],

        // ⏱ Time column
        [
          {
            name: 'time_column',
            config: {
              type: 'SelectControl',
              label: 'Time Column',
              renderTrigger: true,
              default: 'event_time',
              description: 'Column used for timeline ordering',
              mapStateToProps: ({ datasource }) => ({
                choices:
                  datasource?.columns?.map((col: any) => [
                    col.column_name,
                    col.column_name,
                  ]) || [],
              }),
            },
          },
        ],

        // 🏷 Title
        [
          {
            name: 'title_column',
            config: {
              type: 'SelectControl',
              label: 'Title Column',
              renderTrigger: true,
              default: 'step',
              description: 'Main title of timeline event',
              mapStateToProps: ({ datasource }) => ({
                choices:
                  datasource?.columns?.map((col: any) => [
                    col.column_name,
                    col.column_name,
                  ]) || [],
              }),
            },
          },
        ],

        // 📝 Subtitle
        [
          {
            name: 'subtitle_column',
            config: {
              type: 'SelectControl',
              label: 'Subtitle Column',
              renderTrigger: true,
              default: 'step',
              description: 'Optional subtitle / description',
              mapStateToProps: ({ datasource }) => ({
                choices:
                  datasource?.columns?.map((col: any) => [
                    col.column_name,
                    col.column_name,
                  ]) || [],
              }),
            },
          },
        ],

        // 🎯 Status
        [
          {
            name: 'status_column',
            config: {
              type: 'SelectControl',
              label: 'Status Column',
              renderTrigger: true,
              default: 'step',
              description: 'Controls color + icon',
              mapStateToProps: ({ datasource }) => ({
                choices:
                  datasource?.columns?.map((col: any) => [
                    col.column_name,
                    col.column_name,
                  ]) || [],
              }),
            },
          },
        ],

        // 🔥 Session grouping
        [
          {
            name: 'session_column',
            config: {
              type: 'SelectControl',
              label: 'Session Column (optional)',
              renderTrigger: true,
              default: '',
              description: 'Used to group events into journeys',
              mapStateToProps: ({ datasource }) => ({
                choices:
                  datasource?.columns?.map((col: any) => [
                    col.column_name,
                    col.column_name,
                  ]) || [],
              }),
            },
          },
        ],
      ],
    },
  ],
};

export default controlPanel;