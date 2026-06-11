'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

export function BreadcrumbProject() {
  const pathName = usePathname();
  const pathSegments = pathName.split('/').filter((segment) => segment !== '');
  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        {pathSegments.map((name, index) => (
          <BreadcrumbItem key={index}>
            <span>
              {index === 1 ? (
                <BreadcrumbLink>Project Name</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{name}</BreadcrumbPage>
              )}
            </span>
            {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
