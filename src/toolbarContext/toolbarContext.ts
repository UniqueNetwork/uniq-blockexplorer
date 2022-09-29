import { Consumer, Context, createContext, Provider } from 'react';

import { SelectOptionProps, ViewType } from '@app/components';

export type ToolbarContextProps = {
  view: ViewType;
  setView: (view: ViewType) => void;
  sort: SelectOptionProps | undefined;
  selectSort: (sort: SelectOptionProps) => void;
  searchString: string | undefined;
  setSearchString: (search: string | undefined) => void;
  defaultSort: any;
};

const ToolbarContext: Context<ToolbarContextProps> = createContext(
  {} as unknown as ToolbarContextProps,
);
const ToolbarConsumer: Consumer<ToolbarContextProps> = ToolbarContext.Consumer;
const ToolbarProvider: Provider<ToolbarContextProps> = ToolbarContext.Provider;

export default ToolbarContext;

export { ToolbarConsumer, ToolbarProvider };
