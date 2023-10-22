// @mui
import { Link, ListItemText } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
//
import { NavItemProps } from '../types';
import { StyledNavItem } from './styles';

// ----------------------------------------------------------------------

export default function NavItem({ item, open, active, isExternalLink, ...other }: NavItemProps) {
  const { title, path, icon, children } = item;

  const renderContent = (
    <StyledNavItem active={active} {...other}>
      {icon !== undefined && <Iconify icon={icon} sx={{ mr: '10px' }} />}
      <ListItemText disableTypography primary={title} />

      {!!children && (
        <Iconify
          width={16}
          icon="carbon:chevron-down"
          sx={
            open
              ? { ml: 1, transform: 'rotate(180deg)', transition: '500ms' }
              : { ml: 1, transform: 'rotate(0deg)', transition: '500ms' }
          }
        />
      )}
    </StyledNavItem>
  );

  // ExternalLink
  if (isExternalLink) {
    return (
      <Link href={path} target="_blank" rel="noopener" underline="none">
        {renderContent}
      </Link>
    );
  }

  // Has child
  if (children) {
    return renderContent;
  }

  // Default
  return (
    <Link href={path} underline="none">
      {renderContent}
    </Link>
  );
}
