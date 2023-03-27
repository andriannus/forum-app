import { FC, useEffect } from "react";

import { useGetThreadsQuery } from "@/stores/threads";

const Threads: FC = () => {
  const { data: threads, isLoading } = useGetThreadsQuery();

  useEffect(() => {
    if (!isLoading) {
      console.log(threads);
    }
  }, [isLoading, threads]);

  return <div>Hello World</div>;
};

export default Threads;
