'use client';
import { DatePicker } from '@/components/ui/DatePicker';
import { SelectAssignee } from '../../../_components/SelectAssignee';
import { useState } from 'react';
import { toast } from 'sonner';

import { Epic, User } from '@/app/generated/prisma/client';
import SelectStatus from './SelectStatus';
import SelectEpic from './SelectEpic';
import { Textarea } from '@/components/ui/textarea';
import { useSearchParams } from 'next/navigation';

const FormNewTask = ({
  members,
  projectId,
  epics,
}: {
  members: User[];
  projectId: string;
  epics: Epic[];
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [status, setStatus] = useState('');
  const [epicId, setEpicId] = useState('');
  const searchParams = useSearchParams();
  const currentTaskStatus = searchParams.get('status') || '';
  async function handelAddNewTask() {
    if (
      !title ||
      !description ||
      !dueDate ||
      !assigneeId ||
      (currentTaskStatus === '' && status === '') ||
      !epicId
    ) {
      toast.error('All fields are required');
      return;
    }
    try {
      const res = await fetch('/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          projectId,
          assigneeId,
          status: status || currentTaskStatus,
          epicId,
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
    } finally {
      setTitle('');
      setDescription('');
      setAssigneeId('');
      setDueDate(undefined);
      setStatus('');
      setEpicId('');
    }
  }

  return (
    <div className="flex flex-col items-start gap-10 w-full mt-6 bg-white shadow-[0px_4px_20px_0px_#0000000F] rounded-xl p-6 max-w-[850px]">
      {/* Task Title */}
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="epicTitle"
          className="w-full text-label mt-1 font-bold uppercase text-slate-medium"
        >
          Title
        </label>
        <div className="flex flex-col gap-1">
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

      {/* Assignee + Status */}
      <div className="flex flex-col md:flex-row items-start gap-10 w-full">
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
            currentTaskStatus={currentTaskStatus}
          />
        </div>
        {/* Assignee */}
        <div className="flex flex-col items-start gap-2 justify-between w-full">
          <label
            htmlFor="assignee"
            className="text-label font-bold uppercase text-slate-medium"
          >
            Assignee
          </label>
          <SelectAssignee
            assigneeId={assigneeId}
            onAssigneeChange={setAssigneeId}
            members={members}
          />
        </div>
      </div>

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

      {/* Due Date */}
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="deadline"
          className="text-label font-bold uppercase text-slate-medium"
        >
          Deadline
        </label>
        <DatePicker dueDate={dueDate} setDueDate={setDueDate} />
      </div>

      {/* Task Description */}
      <div className="flex flex-col w-full gap-2">
        <label
          htmlFor="taskDesc"
          className="text-label font-bold uppercase text-slate-medium"
        >
          Description
        </label>
        <Textarea
          id="taskDesc"
          placeholder="Describe the scope and objectives of 
this task..."
          className="input-mobile placeholder:text-body font-semibold capitalize h-[144px]!"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {/* Button Create Task + Cancel */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full gap-5">
        <button
          type="submit"
          className="btn-primary w-full! md:w-fit"
          onClick={handelAddNewTask}
        >
          Create Task
        </button>
        <button className="btn-secondary  w-full! md:w-fit text-slate-medium! font-semibold!">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FormNewTask;
