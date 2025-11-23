import { useState } from 'react';
import styles from './SideBarMenu.module.css';

export type MenuItem = {
  label: string;
  onClick?: () => void;
  children?: MenuItem[];
};

export type SidebarMenuProps = {
  open: boolean;
  onClose: () => void;
  items: MenuItem[];
};

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ open, onClose, items }) => {
  return (
    <>
      {open && <div className={styles.backdrop} onClick={onClose} />}
      <div className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <MenuList items={items} />
      </div>
    </>
  );
};

const MenuList: React.FC<{ items: MenuItem[] }> = ({ items }) => {
  return (
    <ul className={styles.menuList}>
      {items.map((item, idx) => (
        <MenuItemComponent key={idx} item={item} />
      ))}
    </ul>
  );
};

const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      <div
        className={styles.menuItem}
        onClick={() => {
          if (hasChildren) setExpanded((v) => !v);
          item.onClick?.();
        }}
      >
        {item.label}
        {hasChildren && <span className={styles.expandIcon}>{expanded ? '▼' : '▶'}</span>}
      </div>
      {hasChildren && expanded && <MenuList items={item.children!} />}
    </li>
  );
};