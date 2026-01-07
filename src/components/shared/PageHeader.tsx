import { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface PageHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  showNewButton?: boolean;
  onNewClick?: () => void;
  backButton?: ReactNode;
  className?: string;
}

export const PageHeader = ({
  breadcrumbs,
  title,
  subtitle,
  actions,
  showNewButton = false,
  onNewClick,
  backButton,
  className,
}: PageHeaderProps) => {
  return (
    <div className={`bg-white border-b border-border ${className || ""}`}>
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {backButton && <div className="flex-shrink-0">{backButton}</div>}
            <div className="flex flex-col gap-1">
              {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
              <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {actions}
            {showNewButton && (
              <Button
                variant="default"
                size="sm"
                disabled={!onNewClick}
                onClick={onNewClick}
                className="bg-primary text-primary-foreground"
              >
                <Plus className="h-3.5 w-3.5 mr-2" />
                Nueva Lección
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};












