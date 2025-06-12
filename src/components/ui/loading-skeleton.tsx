
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-purple-800 mb-4">
        Formularios Creados Recientemente
      </h2>
      
      {Array.from({ length: 3 }).map((_, index) => (
        <Card 
          key={index}
          className="bg-white/80 backdrop-blur-sm border-purple-200"
        >
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-2/3 mb-3" />
            <Skeleton className="h-3 w-1/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LoadingSkeleton;