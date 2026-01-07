interface PaginationInfoProps {
  startIndex: number;
  endIndex: number;
  totalItems: number;
  className?: string;
}

export const PaginationInfo = ({
  startIndex,
  endIndex,
  totalItems,
  className,
}: PaginationInfoProps) => {
  return (
    <div className={className}>
      <div className="text-sm text-muted-foreground">
        Mostrando {startIndex + 1} - {Math.min(endIndex, totalItems)} de{" "}
        {totalItems} resultados
      </div>
    </div>
  );
};


