'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Search = ({
  projectId,
  pageName,
  view,
}: {
  projectId: string;
  pageName: string;
  view?: string;
}) => {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch.trim()) {
      params.set('search', debouncedSearch);
    } else {
      params.delete('search');
    }
    if (view) {
      params.set('view', view);
      if (view === 'board') {
        params.delete('page');
      } else {
        params.set('page', '1');
      }
    }

    router.push(`/project/${projectId}/${pageName}?${params.toString()}`);
  }, [debouncedSearch]);

  return (
    <div className="relative lg:w-full xl:flex-1 xl:w-fit">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={10.5}
        height={10.5}
        className="absolute top-1/2 left-2 -translate-y-1/2 "
      />
      <input
        type="text"
        placeholder="Search Epic..."
        className="input-mobile px-7! py-2.5! w-full md:min-w-[300px]! h-[48px]!"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
