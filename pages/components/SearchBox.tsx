import { Search24Regular } from '@fluentui/react-icons';
import {
  useId,
  Input,
  InputProps
} from "@fluentui/react-components";

interface ISearchBox extends InputProps {
  style?: {} ;
}

export default function SearchBox(props: ISearchBox) {
  const { style = {} } = props;
  const inputId = useId("input");
  return (
    <div>
      <Input
        id={inputId}
        contentBefore={<Search24Regular fontSize={12} />}
        placeholder="Search"
        style={{ width: 200, ...style }}
        {...props}
      />
    </div>
  );
}