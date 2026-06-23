'use client';
import Image from 'next/image';
import Link from 'next/link';

const Pagination = ({
  pageName,
  path,
  totalPages,
  currentPage,
  totalItems,
  limit,
  search,
  view,
}: {
  pageName: string;
  path: string;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  limit: number;
  search?: string;
  view?: string;
}) => {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();

    params.set('page', String(page));

    if (search) {
      params.set('search', search);
    }

    if (view) {
      params.set('view', view);
      if (view === 'board') {
        params.delete('page');
      }
    }

    return `${path}?${params.toString()}`;
  };
  return (
    <div className="flex items-center justify-between w-full">
      <p className="text-label font-medium text-slate-medium">
        Showing {limit} of {totalItems} active {pageName}
      </p>
      <div className="flex items-center gap-1">
        <Link
          href={buildUrl(currentPage - 1)}
          className={`w-8 h-8 flex items-center justify-center border border-slate-light text-slate-dark ${
            currentPage <= 1
              ? 'cursor-not-allowed pointer-events-none opacity-30'
              : 'cursor-pointer'
          }`}
        >
          {' '}
          <Image
            src="/assets/icons/pag-left.svg"
            alt="right"
            width={5}
            height={7}
          />
        </Link>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Link
            href={buildUrl(pageNum)}
            key={pageNum}
            className={`flex items-center justify-center w-8 h-8 text-label font-bold ${
              pageNum === currentPage
                ? 'bg-primary-container text-white'
                : 'border border-slate-light text-slate-dark'
            } cursor-pointer`}
          >
            {pageNum}
          </Link>
        ))}
        <Link
          href={buildUrl(currentPage + 1)}
          className={`w-8 h-8 flex items-center justify-center border border-slate-light ${
            currentPage >= totalPages
              ? 'cursor-not-allowed pointer-events-none opacity-30'
              : 'cursor-pointer'
          }`}
        >
          <Image
            src="/assets/icons/pag-right.svg"
            alt="right"
            width={5}
            height={7}
          />
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
