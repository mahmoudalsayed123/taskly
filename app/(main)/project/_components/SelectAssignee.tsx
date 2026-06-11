import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User } from '@/app/generated/prisma/client';

export function SelectAssignee({
  assigneeId,
  onAssigneeChange,
  members,
}: {
  assigneeId: string;
  onAssigneeChange: (assigneeId: string) => void;
  members: User[];
}) {
  return (
    <Select value={assigneeId} onValueChange={onAssigneeChange}>
      <SelectTrigger className="input-mobile">
        <SelectValue placeholder="Select a Member" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {members?.map((member) => (
            <SelectItem key={member.id} value={member.id}>
              {member.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
