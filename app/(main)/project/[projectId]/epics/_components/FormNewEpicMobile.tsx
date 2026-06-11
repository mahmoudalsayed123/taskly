import { SelectAssignee } from '../../../_components/SelectAssignee';
import { DatePicker } from '@/components/ui/DatePicker';

const FormNewEpicMobile = () => {
  return (
    <div className=" flex md:hidden flex-col items-start gap-10 w-full mt-6 ">
      {/* Epic Title */}
      <div className="relative">
        <label htmlFor="epicTitle" className="label">
          Title
        </label>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            id="epicTitle"
            placeholder="e.g. Structural Schematic Phase"
            className="input-mobile"
          />
          <p className="text-[10px] font-normal text-slate-light">
            Minimum 3 characters required.
          </p>
        </div>
      </div>

      {/* Epic Description */}
      <div className="relative w-full min-h-[120px]">
        <label htmlFor="epicDesc" className="label">
          Description
        </label>
        <textarea
          id="epicDesc"
          placeholder="Describe the scope and objectives of 
this epic..."
          className="input-mobile h-full! placeholder:text-body font-semibold capitalize"
        />
      </div>

      {/* Assignee + Deadline */}
      <div className="flex flex-col items-start gap-10 w-full">
        {/* Assignee */}
        <div className="relative w-full">
          <label htmlFor="assignee" className="label">
            Assignee
          </label>
          <SelectAssignee />
        </div>
        {/* Deadline */}
        <div className="relative w-full">
          <label htmlFor="deadline" className="label">
            Deadline
          </label>
          <DatePicker />
        </div>
      </div>
      {/* Button CreateEpic + Cancel */}
      <div className="flex flex-col items-center w-full gap-5">
        <button type="submit" className="btn-primary w-full!">
          Create Epic
        </button>
        <button className="btn-secondary w-full! text-slate-medium! font-semibold! ">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FormNewEpicMobile;
