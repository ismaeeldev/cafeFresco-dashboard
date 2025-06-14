import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import useConfig from 'hooks/useConfig';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from './chart-data/total-growth-bar-chart';

const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

export default function TotalGrowthBarChart({ isLoading }) {
  const [value, setValue] = React.useState('today');
  const [chartSeries, setSeries] = useState([]);
  const theme = useTheme();
  const { mode } = useConfig();

  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const divider = theme.palette.divider;
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;
  const BASE_URL = import.meta.env.VITE_BASE_URL;


  const fetchChartData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/yearly-report`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chart data");
      }

      const data = await response.json();
      setSeries(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };


  useEffect(() => {
    fetchChartData();
  }, []);




  React.useEffect(() => {
    const newChartData = {
      ...chartData.options,
      colors: [secondaryMain, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            style: { colors: primary }
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            style: { colors: primary }
          }
        }
      },
      grid: { borderColor: divider },
      tooltip: { theme: mode },
      legend: { labels: { colors: grey500 } }
    };


    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [mode, secondaryMain, primaryDark, secondaryMain, secondaryLight, primary, darkLight, divider, isLoading, grey500]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid size={12}>
              <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid>
                  <Grid container direction="column" spacing={1}>

                    <Grid>
                      <Typography variant="h3">Visual Representation</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              size={12}
              sx={{
                ...theme.applyStyles('light', {
                  '& .apexcharts-series:nth-of-type(4) path:hover': {
                    filter: `brightness(0.95)`,
                    transition: 'all 0.3s ease'
                  }
                }),
                '& .apexcharts-menu': {
                  bgcolor: 'background.paper'
                },
                '.apexcharts-theme-light .apexcharts-menu-item:hover': {
                  bgcolor: 'dark.main'
                },
                '& .apexcharts-theme-light .apexcharts-menu-icon:hover svg, .apexcharts-theme-light .apexcharts-reset-icon:hover svg, .apexcharts-theme-light .apexcharts-selection-icon:not(.apexcharts-selected):hover svg, .apexcharts-theme-light .apexcharts-zoom-icon:not(.apexcharts-selected):hover svg, .apexcharts-theme-light .apexcharts-zoomin-icon:hover svg, .apexcharts-theme-light .apexcharts-zoomout-icon:hover svg':
                {
                  fill: theme.palette.grey[400]
                }
              }}
            >
              <Chart options={chartData.options} series={chartSeries ? chartSeries : chartData.series} type={chartData.type} height={chartData.height} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
}

TotalGrowthBarChart.propTypes = { isLoading: PropTypes.bool };
