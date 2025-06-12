import LeftSidebar from '@/components/LeftSidebar/LeftSidebar';
import FilterPanel from '@/components/FilterPanel/FilterPanel';
import SearchResults from '@/components/SearchResults/SearchResults';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full bg-gradient-to-br from-purple-50 to-purple-100">
      {/* Barra lateral izquierda - horizontal en móvil, vertical en desktop */}
      <LeftSidebar />
      
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col lg:flex-row mt-16 lg:mt-0 lg:ml-16">
        {/* Área central de resultados */}
        <SearchResults />
        
        {/* Panel de filtros derecho - se muestra arriba en móvil */}
        <FilterPanel />
      </div>
    </div>
  );
};

export default Index;