import { useFilter } from "@/contexts/FilterContext";
import { AppLayout } from "@/components/layout/AppLayout";
import MainContent from "@/components/layout/MainContent";
import RightPanel from "@/components/layout/RightPanel";
import { MainLayout } from "@/components/layout/MainLayout";
import loadingGif from "@/Images/loading.gif";

const LoadingOverlay = () => {
  const { isLoading } = useFilter();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ backgroundColor: '#f2f4f1' }}>
      <div className="flex flex-col items-center">
        <img 
          src={loadingGif} 
          alt="Cargando..." 
          className="w-96 h-96 object-contain"
        />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <>
      <AppLayout
        rightPanel={<RightPanel />}
      >
        <MainLayout>
          <MainContent />
        </MainLayout>
      </AppLayout>
      <LoadingOverlay />
    </>
  );
};

export default Index;
