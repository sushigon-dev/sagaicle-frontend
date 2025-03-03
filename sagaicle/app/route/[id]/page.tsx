import { notFound } from "next/navigation";

import Detail from "@/components/detail/Detail";
import * as api from "@/api/services";
import { GetRouteResponse } from "@/api/types";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function fetchDetail(id: string): Promise<GetRouteResponse | void> {
  try {
    return api.getRoute({ routeId: id });
  } catch (error) {
    return;
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const result = await fetchDetail(id);
  if (!result) {
    return notFound();
  }

  return (
    <>
      <Detail
        id={result.route_id}
        title={result.title}
        description={result.description}
        fullDescription={result.full_description}
        distance={result.distance}
        time={result.time}
        tags={result.tags}
        images={result.images}
        map={result.map}
        checkpoints={result.checkpoints}
        update={result.update_at}
      />
    </>
  );
}
