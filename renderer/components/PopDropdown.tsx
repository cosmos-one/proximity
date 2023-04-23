import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const PopDropdownItem = ({children, onClick = undefined}) => {
  return (
    <DropdownMenu.Item className='hover:border-none hover:outline-none hover:cursor-pointer hover:bg-hlgreen p-1 rounded-md' onClick={onClick}>
      {children}
    </DropdownMenu.Item>
  );
};

export const PopDropdownContent = ({children}) => {
  return (
    <DropdownMenu.Content className="bg-black p-2 rounded-md border border-lightgreen" sideOffset={5}>
      {children}
    </DropdownMenu.Content>
  );
};