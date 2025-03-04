import { Suspense } from "react";
import SearchContainer from "@/components/search/SearchContainer";
import { Rendering } from "@/components/common/loading";

function Page() {
  return (
    <Suspense fallback={<Rendering />}>
      <SearchContainer />
    </Suspense>
  );
  // return <SearchContainer />;
}

export default Page;
