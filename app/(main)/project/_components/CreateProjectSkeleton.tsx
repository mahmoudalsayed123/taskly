import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <Skeleton className="aspect-video w-full bg-surface-highest!" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Skeleton className="h-4 w-2/3 bg-surface-highest!" />
        <Skeleton className="h-4 w-1/2 bg-surface-highest!" />
      </CardContent>
    </Card>
  );
}
