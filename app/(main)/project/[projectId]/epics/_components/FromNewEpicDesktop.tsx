'use client';
import { DatePicker } from '@/components/ui/DatePicker';
import { SelectAssignee } from '../../../_components/SelectAssignee';
import { useState } from 'react';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
import { User } from '@/app/generated/prisma/client';

const FromNewEpicDesktop = ({
  user,
  members,
}: {
  user: User | null;
  members: User[];
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const pathName = usePathname();
  const projectId = pathName.split('/')[2];

  async function handelAddNewEpic() {
    if (!title || !description || !assigneeId || !deadline) {
      toast.error('All fields are required');
      return;
    }
    try {
      const res = await fetch('/api/epic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          deadline,
          projectId: projectId!,
          createdById: user?.id,
          assigneeId: assigneeId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log((error as Error).message);
      toast.error((error as Error).message);
    }
  }

  return (
    <div className="hidden md:flex flex-col items-start gap-10 w-full mt-6 bg-white shadow-[0px_4px_20px_0px_#0000000F] rounded-xl p-6 max-w-[850px]">
      {/* Epic Title */}
      <div className="flex items-start justify-between gap-2 w-full">
        <label
          htmlFor="epicTitle"
          className="text-label mt-1 flex-1/4 font-bold uppercase text-slate-medium"
        >
          Title
        </label>
        <div className="flex flex-3/4 flex-col gap-1">
          <input
            type="text"
            id="epicTitle"
            placeholder="e.g. Structural Schematic Phase"
            className="input-mobile"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="text-[10px] font-normal text-slate-light">
            Minimum 3 characters required.
          </p>
        </div>
      </div>

      {/* Epic Description */}
      <div className="flex items-start justify-between w-full">
        <label
          htmlFor="epicDesc"
          className="text-label flex-1/4 font-bold uppercase text-slate-medium"
        >
          Description
        </label>
        <textarea
          id="epicDesc"
          placeholder="Describe the scope and objectives of 
this epic..."
          className="input-mobile flex-3/4 h-full! placeholder:text-body font-semibold capitalize"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Assignee + Deadline */}
      <div className="flex flex-col md:flex-row items-start gap-10 w-full">
        {/* Assignee */}
        <div className="flex md:flex-col items-start md:gap-2 justify-between w-full">
          <label
            htmlFor="assignee"
            className="text-label font-bold uppercase text-slate-medium"
          >
            Assignee
          </label>
          <SelectAssignee
            members={members}
            onAssigneeChange={setAssigneeId}
            assigneeId={assigneeId}
          />
        </div>
        {/* Deadline */}
        <div className="flex md:flex-col items-start md:gap-2     justify-between w-full">
          <label
            htmlFor="deadline"
            className="text-label font-bold uppercase text-slate-medium"
          >
            Deadline
          </label>
          <DatePicker dueDate={deadline} setDueDate={setDeadline} />
        </div>
      </div>
      {/* Button CreateEpic + Cancel */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full  gap-5">
        <button
          type="submit"
          className="btn-primary w-full! md:w-fit"
          onClick={handelAddNewEpic}
        >
          Create Epic
        </button>
        <button className="btn-secondary w-full! md:w-fit text-slate-medium! font-semibold!  ">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FromNewEpicDesktop;
