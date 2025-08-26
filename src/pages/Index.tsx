import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import SearchResults from "@/components/SearchResults/SearchResults";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br">
      <LeftSidebar />

      <div className="flex-1 flex flex-col lg:flex-row mt-16 lg:mt-0 lg:ml-16">
        <div className="flex-1 flex flex-col bg-negro-50">
          <SearchResults />
          <div className="relative h-[160px] mt-[2rem]">
            <svg
              className="absolute bottom-0 left-0 w-full h-[160px] bg-negro-50"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                d="M0,160 C120,180 240,100 360,140 C480,180 600,60 720,100 C840,140 960,40 1080,80 C1200,120 1320,20 1440,60 L1440,320 L0,320 Z"
                fill="#d4edfb"
              />
            </svg>
          </div>
        </div>

        <FilterPanel />
      </div>
    </div>
  );
};

export default Index;
