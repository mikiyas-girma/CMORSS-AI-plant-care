import useMediaQuery from "@/hooks/useMediaQuery";
import { MediaQueryResponse } from "@/lib/mediaQueries";

export default function Index() {
    const { queryResponse } = useMediaQuery();

    return (queryResponse === MediaQueryResponse.IS_MEDIUM ? <div>Index Medium</div> : <div>Index</div>);
}