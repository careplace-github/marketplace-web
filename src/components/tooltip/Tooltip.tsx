// react
import { useState, useEffect, useRef } from 'react';
// components
import { SxProps } from '@mui/system';
import { Tooltip as MuiTooltip, Box } from '@mui/material';
import Iconify from '../iconify/Iconify';

type TooltipProps = {
  text: string;
  sx?: SxProps;
  icon?: string;
  placement?:
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start';
  iconColor?: string;
  padding?: string;
  tooltipWidth?: string;
};

export function Tooltip({
  iconColor,
  tooltipWidth = '250px',
  text,
  icon = 'foundation:info',
  padding = '10px 15px',
  placement = 'top',
  sx,
}: TooltipProps) {
  const [openTooltip, setOpenTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setOpenTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <MuiTooltip
      open={openTooltip}
      onTouchStart={() => setOpenTooltip(true)}
      onMouseOver={() => setOpenTooltip(true)}
      onMouseOut={() => setOpenTooltip(false)}
      ref={tooltipRef}
      arrow
      title={text}
      placement={placement}
      componentsProps={{
        tooltip: {
          sx: {
            width: tooltipWidth,
            fontSize: '12px',
            p: padding,
            zIndex: 10,
            textAlign: 'center',
          },
        },
      }}
    >
      <Iconify
        sx={{ ...sx, color: iconColor ?? 'text.secondary' }}
        icon={icon}
        width="15px"
        height="15px"
      />
    </MuiTooltip>
  );
}
