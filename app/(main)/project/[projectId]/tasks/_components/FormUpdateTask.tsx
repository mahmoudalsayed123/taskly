'use client';
import { Epic, Task, User } from '@/app/generated/prisma/client';
import { useState } from 'react';
import { SelectAssignee } from '../../../_components/SelectAssignee';
import { DatePicker } from '@/components/ui/DatePicker';
import { useRouter } from 'next/navigation';
import SelectEpic from './SelectEpic';
import SelectStatus from './SelectStatus';

const FormUpdateTask = ({
  task,
  members,
  epics,
}: {
  task: Task;
  members: User[];
  epics: Epic[];
}) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [assigneeId, setAssigneeId] = useState(task?.assigneeId || '');
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task.dueDate || undefined,
  );
  const [epicId, setEpicId] = useState(task?.epicId || '');
  const [status, setStatus] = useState(task?.status || '');

  const router = useRouter();

  const handelUpdatetask = async () => {
    const res = await fetch(`/api/task/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        assigneeId,
        dueDate,
        epicId,
        status,
      }),
    });
    if (res.ok) {
      router.push(`/project/${task.projectId}/tasks`);
    }
  };
  return (
    <div className="flex flex-col items-start gap-10 w-full mt-6 bg-white shadow-[0px_4px_20px_0px_#0000000F] rounded-xl p-6 max-w-[850px]">
      {/* task Title */}
      <div className="flex items-start justify-between gap-2 w-full">
        <label
          htmlFor="taskTitle"
          className="text-label mt-1 flex-1/4 font-bold uppercase text-slate-medium"
        >
          Title
        </label>
        <div className="flex flex-3/4 flex-col gap-1">
          <input
            type="text"
            id="taskTitle"
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

      {/* task Description */}
      <div className="flex items-start justify-between w-full">
        <label
          htmlFor="taskDesc"
          className="text-label flex-1/4 font-bold uppercase text-slate-medium"
        >
          Description
        </label>
        <textarea
          id="taskDesc"
          placeholder="Describe the scope and objectives of 
    this task..."
          className="input-mobile flex-3/4 h-full! placeholder:text-body font-semibold capitalize"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Assignee + DueDate */}
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
        {/* DueDate */}
        <div className="flex md:flex-col items-start md:gap-2     justify-between w-full">
          <label
            htmlFor="deadline"
            className="text-label font-bold uppercase text-slate-medium"
          >
            DueDate
          </label>
          <DatePicker dueDate={dueDate} setDueDate={setDueDate} />
        </div>
      </div>

      {/* Epic + Status */}
      <div className="flex flex-col md:flex-row items-start gap-10 w-full">
        {/* Epic */}
        <div className="flex flex-col gap-2  w-full">
          <label
            htmlFor="epic"
            className="text-label font-bold uppercase text-slate-medium"
          >
            Epic
          </label>
          <SelectEpic epicId={epicId} setEpicId={setEpicId} epics={epics} />
        </div>
        {/* Status */}
        <div className="flex flex-col items-start gap-2 justify-between w-full">
          <label
            htmlFor="status"
            className="text-label font-bold uppercase text-slate-medium"
          >
            Status
          </label>
          <SelectStatus
            status={status}
            setStatus={setStatus}
            currentTaskStatus={status}
          />
        </div>
      </div>
      {/* Button Createtask + Cancel */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full   gap-5">
        <button
          type="submit"
          className="btn-primary w-full! md:w-fit"
          onClick={handelUpdatetask}
        >
          Update task
        </button>
        <button
          className="btn-secondary w-full! md:w-fit text-slate-medium! font-semibold!"
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FormUpdateTask;
