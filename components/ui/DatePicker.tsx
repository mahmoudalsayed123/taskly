'use client';
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePicker({
  dueDate,
  setDueDate,
}: {
  dueDate: Date | undefined;
  setDueDate: (date: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!dueDate}
          className="w-full input-mobile flex items-center justify-start font-normal data-[empty=true]:text-body"
        >
          {dueDate ? format(dueDate, 'PPP') : <span>mm/dd/yyyy</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dueDate}
          onSelect={setDueDate}
          defaultMonth={dueDate}
        />
      </PopoverContent>
    </Popover>
  );
}
