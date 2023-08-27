import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import {
    CloseIcon,
    HamburgerIcon,
    HeartIcon,
    HomeIcon,
    SearchIcon,
    TagIcon,
} from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";

import config from "../config";
import toast from "react-hot-toast";

const links = [
    {
        name: "Home",
        to: "/",
        icon: HomeIcon,
        color: "gray.500",
    },
    {
        name: "My Likes",
        to: "/likes",
        icon: HeartIcon,
        color: "red.400",
    },
    {
        name: "Tags",
        to: "/tag",
        icon: TagIcon,
        color: "blue.400",
    },
];

const SearchBox = ({ onSubmit, ...props }) => {
    const query = new URLSearchParams(window.location.search).get("q") || "";
    return (
        <Box as="form" action="/search" onSubmit={onSubmit} {...props}>
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <Icon as={SearchIcon} boxSize={5}></Icon>
                </InputLeftElement>
                <Input
                    name="q"
                    variant={"filled"}
                    _focus={{ borderColor: "black.700" }}
                    placeholder="Search"
                    size={{ base: "lg", md: "md" }}
                    defaultValue={query}
                ></Input>
            </InputGroup>
        </Box>
    );
};

export default function Navbar() {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const {
        isOpen: isSearchOpen,
        onClose: searchClose,
        onOpen: searchOpen,
    } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });
    const navigate = useNavigate();

    const onSearch = (e) => {
        e.preventDefault();
        const query = e.target.q.value;
        if (!query)
            return toast.error("Please enter a search query", {
                icon: "🔍",
                position: "top-center",
            });
        navigate(`/search?q=${query}`);
    };

    return (
        <Box>
            <Flex
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={"60px"}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.700")}
                align={"center"}
            >
                <Flex
                    flex={{ base: 1, md: "auto" }}
                    ml={{ base: -2 }}
                    display={"flex"}
                    hidden={!isMobile}
                >
                    <IconButton
                        onClick={onOpen}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                        variant={"ghost"}
                        aria-label={"Toggle Navigation"}
                    />
                </Flex>
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: "center", md: "start" }}
                >
                    <Heading
                        as={Link}
                        to={"/"}
                        textAlign={useBreakpointValue({
                            base: "center",
                            md: "left",
                        })}
                        fontFamily={"heading"}
                        color={useColorModeValue("gray.800", "white")}
                    >
                        {config.SITENAME}
                    </Heading>
                </Flex>

                <Stack
                    flex={1}
                    justify={"flex-end"}
                    direction={"row"}
                    spacing={6}
                >
                    {!isMobile && <DesktopNav />}
                    <Icon
                        as={SearchIcon}
                        boxSize={"6"}
                        onClick={searchOpen}
                        hidden={!isMobile}
                    />
                    <SearchBox hidden={isMobile} onSubmit={onSearch} />
                </Stack>
            </Flex>
            {isMobile && (
                <>
                    <SearchModal
                        isOpen={isSearchOpen}
                        onClose={searchClose}
                        onSearch={onSearch}
                    />
                    <MobileNav isOpen={isOpen} onClose={onClose} />
                </>
            )}
        </Box>
    );
}

const SearchModal = ({ isOpen, onClose, onSearch }) => {
    const onSubmit = (e) => {
        onSearch(e);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
            <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
            <ModalContent mx={6}>
                <ModalBody p={0} m={0}>
                    <SearchBox onSubmit={onSubmit} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

const DesktopNav = () => {
    return (
        <Stack direction={"row"} spacing={4}>
            {links.map((link) => (
                <Button
                    key={link.name}
                    as={Link}
                    to={link.to}
                    variant={"ghost"}
                    leftIcon={<Icon boxSize={5} as={link.icon} />}
                    color={link.color}
                >
                    {link.name}
                </Button>
            ))}
        </Stack>
    );
};

const NavItem = ({ icon, name, color, to, onClose }) => {
    return (
        <Box as={Link} to={to} onClick={onClose} _focus={{ boxShadow: "none" }}>
            <Flex
                align="center"
                p={4}
                role="group"
                cursor="pointer"
                _hover={{
                    color: color,
                }}
            >
                <Icon mr="4" boxSize={6} as={icon} color={color} />
                <Heading fontWeight={"semibold"} size={"md"}>
                    {name}
                </Heading>
            </Flex>
        </Box>
    );
};

const MobileNav = ({ isOpen, onClose }) => {
    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay backdropFilter="auto" backdropBlur="2px" />
            <DrawerContent backgroundColor={"gray.800"}>
                <DrawerCloseButton />
                <DrawerHeader>{config.SITENAME}</DrawerHeader>

                <DrawerBody>
                    {links.map((link) => (
                        <NavItem key={link.name} onClose={onClose} {...link} />
                    ))}
                </DrawerBody>

                <DrawerFooter>
                    <Text color={"whiteAlpha.600"}>Made with ❤️</Text>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
