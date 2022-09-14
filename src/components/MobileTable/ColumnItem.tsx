import { ColumnType, DefaultRecordType } from 'rc-table/lib/interface';
import { Text } from '@unique-nft/ui-kit';
import { FC, memo, useEffect, useRef } from 'react';

interface ColumnItemProps {
  column: ColumnType<DefaultRecordType>;
  item: DefaultRecordType;
  index: number;
  setItemHeight: (height: number, index: number) => void;
}

const Column: FC<ColumnItemProps> = ({ column, item, index, setItemHeight }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      setItemHeight(itemRef.current.offsetHeight, index);
    }
  });

  return (
    <div className="column-item" ref={itemRef} key={`column-${column.key || ''}`}>
      {column.render && (
        <>
          {column.render(item[column.dataIndex as keyof DefaultRecordType], item, index)}
        </>
      )}
      {!column.render && (
        <Text>{item[column.dataIndex as keyof DefaultRecordType]?.toString() || ''}</Text>
      )}
    </div>
  );
};

export const ColumnItem = memo(Column);
