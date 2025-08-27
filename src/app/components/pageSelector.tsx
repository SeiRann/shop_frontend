interface PageSelectorProps {
    length: number;
    currentPage: number;
    lastPage?: number;
    setPage: (updatedNumber: number) => void;
    setLoading: (state: boolean) => void;
}

export default function PageSelector({
    length,
    currentPage,
    lastPage,
    setPage,
    setLoading,
}: PageSelectorProps) {
    const productsPerPage = 20;
    if (length < productsPerPage && currentPage === 1) {
        return <></>;
    } else if (currentPage === 1) {
        return (
            <div className="flex">
                <p>
                    {currentPage}-{currentPage * productsPerPage}
                </p>
                <button
                    onClick={() => {
                        setPage(currentPage + 1);
                        setLoading(true);
                    }}
                >
                    {"->"}
                </button>
            </div>
        );
    } else if (currentPage !== 1 && length === productsPerPage) {
        return (
            <div className="flex">
                <button
                    onClick={() => {
                        setPage(currentPage - 1);
                        setLoading(true);
                    }}
                >
                    {"<-"}
                </button>
                <p>
                    {currentPage * productsPerPage}-
                    {currentPage * productsPerPage + productsPerPage}
                </p>
                <button
                    onClick={() => {
                        setPage(currentPage + 1);
                        setLoading(true);
                    }}
                >
                    {"->"}
                </button>
            </div>
        );
    } else {
        return (
            <div className="flex">
                <button
                    onClick={() => {
                        setPage(currentPage - 1);
                        setLoading(true);
                    }}
                >
                    {"<-"}
                </button>
                <p>
                    {currentPage * productsPerPage}-
                    {currentPage * productsPerPage + length}
                </p>
            </div>
        );
    }
}
