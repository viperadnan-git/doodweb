import {
    Button,
    Divider,
    HStack,
    IconButton,
    useMediaQuery,
} from "@chakra-ui/react";
import usePagination, { DOTS } from "../hooks/usePagination";

import { LeftIcon } from "../assets/icons";
import React from "react";
import { RightIcon } from "../assets/icons";

const Pagination = (props) => {
    const [isMobile] = useMediaQuery("(max-width: 35em)");
    const {
        onPageChange,
        siblingCount = isMobile ? 1 : 3,
        currentPage,
        totalPage,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        siblingCount,
        totalPage,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <HStack justifySelf="center" my={14}>
            {currentPage !== 1 && (
                <IconButton
                    size="sm"
                    onClick={onPrevious}
                    icon={<LeftIcon />}
                />
            )}

            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return <Divider key={index} orientation="vertical" />;
                }

                return (
                    <Button
                        key={index}
                        size="sm"
                        colorScheme={
                            currentPage === pageNumber ? "blue" : "gray"
                        }
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </Button>
                );
            })}
            {currentPage !== lastPage && (
                <IconButton size="sm" onClick={onNext} icon={<RightIcon />} />
            )}
        </HStack>
    );
};

export default Pagination;
