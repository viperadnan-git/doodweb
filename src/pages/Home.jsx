import Error from "../components/Error";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { VStack } from "@chakra-ui/react";
import VideoList from "../components/VideoList";
import config from "../config";
import fetcher from "../lib/fetcher";
import useSWR from "swr";
import { useSearchParams } from "react-router-dom";

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, error } = useSWR(
        config.api.list + "?" + searchParams.toString(),
        fetcher
    );

    document.title = config.SITENAME;

    if (error) return <Error status={error.status} message={error.message} />;
    if (!data) return <Loading />;

    const setPage = (page) => {
        searchParams.set("page", page);
        setSearchParams(searchParams);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <VStack>
            <VideoList files={data.files} />
            <Pagination
                currentPage={
                    searchParams.has("page")
                        ? parseInt(searchParams.get("page"))
                        : 1
                }
                totalPage={data.total_pages}
                onPageChange={setPage}
            />
        </VStack>
    );
}

export default Home;
