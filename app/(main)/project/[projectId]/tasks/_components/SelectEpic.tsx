import { Epic } from '@/app/generated/prisma/client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SelectEpic = ({
  epicId,
  setEpicId,
  epics,
}: {
  epicId: string;
  setEpicId: (epicId: string) => void;
  epics: Epic[];
}) => {
  return (
    <Select value={epicId} onValueChange={setEpicId}>
      <SelectTrigger className="input-mobile">
        <SelectValue placeholder="Select a Epic" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {epics.map((epic) => (
            <SelectItem key={epic.id} value={epic.id}>
              {epic.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectEpic;
