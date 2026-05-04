import { ControlPanelConfig } from '@superset-ui/chart-controls';

const controlPanel: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: 'Timeline Settings',
      expanded: true,
      controlSetRows: [
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

        // 🔥 OPTIONAL (for dynamic journeys)
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