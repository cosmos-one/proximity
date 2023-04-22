import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const PopDropdown = ({children}) => {

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {children}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-black p-2 rounded-md" sideOffset={5}>
          <DropdownMenu.Item className='hover:border-none hover:outline-none hover:cursor-pointer hover:bg-hlgreen p-1 rounded-md'>
            New Folder
          </DropdownMenu.Item>
          <DropdownMenu.Item className='hover:border-none hover:outline-none hover:cursor-pointer hover:bg-hlgreen p-1 rounded-md'>
            New File
          </DropdownMenu.Item>
          <DropdownMenu.Item className='hover:border-none hover:outline-none hover:cursor-pointer hover:bg-hlgreen p-1 rounded-md'>
            New Collection
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};