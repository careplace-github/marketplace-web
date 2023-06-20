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
    | 'top-start'
    | undefined;
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
  return (
    <MuiTooltip
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
