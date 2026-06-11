'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const SelectViewTasks = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'board';
  return (
    <Select defaultValue={view}>
      <SelectTrigger className="bg-white rounded-md min-w-[150px]! min-h-[38px]!">
        <div className="flex items-center gap-4">
          {' '}
          {/* <Image
            src={'/assets/icons/board.svg'}
            alt="List"
            width={13.5}
            height={13.5}
          /> */}
          <Image
            src={'/assets/icons/list.svg'}
            alt="List"
            width={10.5}
            height={6}
          />
          <SelectValue
            placeholder="List View"
            className="text-body font-medium text-slate-dark!"
          />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            value="list"
            className="text-body font-medium text-slate-dark!"
            onPointerDown={() =>
              router.push(`/project/${projectId}/tasks?view=list`)
            }
          >
            List View
          </SelectItem>
          <SelectItem
            value="board"
            className="text-body font-medium text-slate-dark!"
            onPointerDown={() =>
              router.push(`/project/${projectId}/tasks?view=board`)
            }
          >
            Board View
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectViewTasks;
