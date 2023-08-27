import { SimpleGrid, VStack } from "@chakra-ui/react";

import VideoCard from "./VideoCard";

function VideoList({ files }) {
    return (
        <VStack m={{ md: 4 }} mx={{ lg: 8 }}>
            <SimpleGrid columns={[2, 2, 2, 3, 4]} spacing={{ md: 4 }}>
                {files.map((file) => (
                    <VideoCard key={file.file_code} {...file} />
                ))}
            </SimpleGrid>
        </VStack>
    );
}

export default VideoList;
