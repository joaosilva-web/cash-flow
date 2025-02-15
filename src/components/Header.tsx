import { Box, Button, Container, Image } from "@chakra-ui/react";
import logo from "../assets/logo.svg"

export function Header() {
    return(
        <Box bg={"blue"} as={"header"} w={"100%"} h={"212"}>
            <Container display="flex" maxW="1120px" justifyContent="space-between" padding="2rem 0">
                <Image src={logo}/>
                <Button>New Transaction</Button>
            </Container>
        </Box>
    )
}