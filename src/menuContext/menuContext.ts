import { Context, Consumer, Provider, createContext } from 'react';

import { ViewType } from '@app/components';

export type MenuContextProps = {
  view: ViewType;
  setView: (view: ViewType) => void;
};

const MenuContext: Context<MenuContextProps> = createContext(
  {} as unknown as MenuContextProps,
);
const MenuConsumer: Consumer<MenuContextProps> = MenuContext.Consumer;
const MenuProvider: Provider<MenuContextProps> = MenuContext.Provider;

export default MenuContext;

export { MenuConsumer, MenuProvider };
