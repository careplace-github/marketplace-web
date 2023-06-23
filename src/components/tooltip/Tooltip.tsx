// react
import { useState, useEffect, useRef } from 'react';
// components
import { Tooltip as MuiTooltip } from '@mui/material';
import Iconify from '../iconify/Iconify';

type TooltipProps = {
  text: string;
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
  tooltipWidth?: string;
};

export function Tooltip({
  iconColor,
  tooltipWidth = '250px',
  text,
  icon = 'foundation:info',
  placement = 'top',
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
      onClick={() => setOpenTooltip(true)}
      ref={tooltipRef}
      arrow
      title={text}
      placement={placement}
      componentsProps={{
        tooltip: {
          sx: { width: tooltipWidth },
        },
      }}
    >
      <Iconify
        sx={{ color: iconColor ?? 'text.secondary' }}
        icon={icon}
        width="15px"
        height="15px"
      />
    </MuiTooltip>
  );
}
