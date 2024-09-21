
import { ReactNode } from "react";
export type TRoutes = {
  path: string;
  element: ReactNode;
};
export type TChildren = {
  name?: string;
  path: string;
  element: ReactNode;
};
export type TUserPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TChildren[];
};
export type TSidebarItem =
  | {
      key: string;
      label: ReactNode;
      children?: TSidebarItem[];
    }
  | undefined ;
// export type TSidebarItem=ItemType<MenuItemType>[] | undefined
