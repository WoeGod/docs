import { Search24Regular } from '@fluentui/react-icons';
import {
  useId,
  Input,
} from "@fluentui/react-components";

interface ISearchBox {
  style?: {} ;
  onChange?: (() => void);
}

export default function SearchBox(props: ISearchBox) {
  const { style = {}, onChange = () => {} } = props;
  const inputId = useId("input");
  return (
    <div>
      <Input
        id={inputId}
        contentBefore={<Search24Regular fontSize={12} />}
        placeholder="Search"
        style={{ width: 200, ...style }}
        onChange={onChange}
      />
    </div>
  );
}