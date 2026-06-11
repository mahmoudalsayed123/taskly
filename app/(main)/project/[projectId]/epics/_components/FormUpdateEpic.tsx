'use client';
import { SelectAssignee } from '../../../_components/SelectAssignee';
import { DatePicker } from '@/components/ui/DatePicker';
import { Epic, User } from '@/app/generated/prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const FormUpdateEpic = ({
  epic,
  members,
  assignedUser,
}: {
  epic: Epic;
  members: User[];
  assignedUser: User | null;
}) => {
  const [title, setTitle] = useState(epic?.title || '');
  const [description, setDescription] = useState(epic?.description || '');
  const [assigneeId, setAssigneeId] = useState(epic?.assigneeId || '');
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);

  const router = useRouter();

  const handelUpdateEpic = async () => {
    const res = await fetch(`/api/epic/${epic.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        assigneeId,
        deadline,
      }),
    });
    if (res.ok) {
      router.push(`/project/${epic.projectId}/epics`);
    }
  };
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
          value={description || ''}
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
      <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full   gap-5">
        <button
          type="submit"
          className="btn-primary w-full! md:w-fit"
          onClick={handelUpdateEpic}
        >
          Update Epic
        </button>
        <button className="btn-secondary w-full! md:w-fit text-slate-medium! font-semibold!  ">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FormUpdateEpic;
