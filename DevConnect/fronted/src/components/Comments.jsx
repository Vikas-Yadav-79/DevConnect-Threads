import { Avatar, Divider, Flex, Text ,Box,Image} from "@chakra-ui/react";

const Comments = ({ reply, lastReply }) => {
	return (
		<>
			<Flex gap={4} py={2} my={2} w={"full"}>
				<Avatar src={reply.userProfilePic} size={"sm"} />
				<Flex gap={1} w={"full"} flexDirection={"column"}>
					<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
						<Text fontSize='sm' fontWeight='bold'>
							{reply.username}
						</Text>
					</Flex>
					<Text>{reply.text}</Text>
                    {
                        reply.img_rep && (
                            <Box borderRadius={6} overflow={"hidden"} border={"1px solid red.500"}>
                            <Image
                                src={reply.img_rep} w={"full"}

                            />
                        </Box>
                        )
                    }
				</Flex>
			</Flex>
			{!lastReply ? <Divider /> : null}
		</>
	);
};

export default Comments;
