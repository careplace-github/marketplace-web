import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Collapse } from '@mui/material';
// hooks
import useActiveLink from 'src/hooks/useActiveLink';
//
import { NavListProps } from 'src/components/nav-section/types';
import NavItem from './NavItem';

// ----------------------------------------------------------------------

type NavListRootProps = {
  data: NavListProps;
  depth: number;
};

export default function NavList({ data, depth }: NavListRootProps) {
  const { pathname } = useRouter();

  const { active, isExternalLink } = useActiveLink(data.path);

  const [open, setOpen] = useState(active);

  useEffect(() => {
    if (!active) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <NavItem
      item={data}
      depth={depth}
      open={open}
      active={active}
      isExternalLink={isExternalLink}
      onClick={handleToggle}
    />
  );
}

// ----------------------------------------------------------------------

type NavListSubProps = {
  data: NavListProps[];
  depth: number;
};

function NavSubList({ data, depth }: NavListSubProps) {
  return (
    <>
      {data.map((list) => (
        <NavList key={list.title + list.path} data={list} depth={depth + 1} />
      ))}
    </>
  );
}
