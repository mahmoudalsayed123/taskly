import { TaskStatusValues } from '@/app/_constant';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SelectStatus = ({
  status,
  setStatus,
  currentTaskStatus,
}: {
  status: string;
  setStatus: (status: string) => void;
  currentTaskStatus: string;
}) => {
  return (
    <Select value={status || currentTaskStatus} onValueChange={setStatus}>
      <SelectTrigger className="input-mobile">
        <SelectValue placeholder={currentTaskStatus || 'Select a Status'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {TaskStatusValues.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectStatus;
