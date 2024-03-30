

import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import Actions from "../components/Actions";
import { useEffect } from "react";
import Comment from "../components/Comments";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import postsAtom from "../atoms/postsAtom";

const PostPage = () => {
	const { user, loading } = useGetUserProfile();
	const [posts, setPosts] = useRecoilState(postsAtom);
	const showToast = useShowToast();
	const { pid } = useParams();
	const currentUser = useRecoilValue(userAtom);
	const navigate = useNavigate();

	const currentPost = posts[0];
  const randomNumber = Math.floor(Math.random() * 10) + 1;

	useEffect(() => {
		const getPost = async () => {
			setPosts([]);
			try {
				const res = await fetch(`/api/posts/${pid}`);
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				setPosts([data]);
			} catch (error) {
				showToast("Error", error.message, "error");
			}
		};
		getPost();
	}, [showToast, pid, setPosts]);

	const handleDeletePost = async () => {
		try {
			if (!window.confirm("Are you sure you want to delete this post?")) return;

			const res = await fetch(`/api/posts/${currentPost._id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Post deleted", "success");
			navigate(`/${user.username}`);
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	if (!user && loading) {
		return (
			<Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
	}

	if (!currentPost) return null;
	console.log("currentPost", currentPost);

	return (
		<>
			<Flex>
				<Flex w={"full"} alignItems={"center"} gap={3}>
					<Avatar src={user.profilePic} size={"md"} name='Mark Zuckerberg' />
					<Flex>
						<Text fontSize={"sm"} fontWeight={"bold"}>
							{user.username}
						</Text>
						<Image src='/verified.png' w='4' h={4} ml={4} />
					</Flex>
				</Flex>
				<Flex gap={4} alignItems={"center"}>
					<Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
            {currentPost.createdAt? formatDistanceToNow(new Date(currentPost.createdAt)) + " ago" :randomNumber + " day ago"} 
					</Text>

					{currentUser?._id === user._id && (
						<DeleteIcon size={20} cursor={"pointer"} onClick={handleDeletePost} />
					)}
				</Flex>
			</Flex>

			<Text my={3}>{currentPost.text}</Text>

			{currentPost.img && (
				<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
					<Image src={currentPost.img} w={"full"} />
				</Box>
			)}

			<Flex gap={3} my={3}>
				<Actions post={currentPost} />
			</Flex>

			<Divider my={4} />

			<Flex justifyContent={"space-between"}>
				<Flex gap={2} alignItems={"center"}>
					<Text fontSize={"2xl"}>👋</Text>
					<Text color={"gray.light"}>Get the app to like, reply and post.</Text>
				</Flex>
				<Button>Get</Button>
			</Flex>

			<Divider my={4} />
			{currentPost.replies.map((reply) => (
				<Comment
					key={reply._id}
					reply={reply}
					lastReply={reply._id === currentPost.replies[currentPost.replies.length - 1]._id}
				/>
			))}
		</>
	);
};

export default PostPage;

// import { Avatar, Flex, Text, Image, Box, Divider, Button, Spinner } from '@chakra-ui/react'
// import React, { useEffect, useState } from 'react'
// import { BsThreeDots } from 'react-icons/bs'
// import Actions from '../components/Actions'
// import Comments from '../components/Comments'
// import { useRecoilState, useRecoilValue } from "recoil";
// import Post from '../components/Post'
// import useShowToast from '../hooks/useShowToast'
// import { useNavigate, useParams } from "react-router-dom";
// import useGetUserProfile from "../hooks/useGetUserProfile";
// import userAtom from "../atoms/userAtom";
// import { formatDistanceToNow } from "date-fns";

// function PostPage() {

//   const { user, loading } = useGetUserProfile();
//   const [post, setPosts] = useState(null);
// 	const showToast = useShowToast();
// 	const { pid } = useParams();
// 	const currentUser = useRecoilValue(userAtom);
// 	const navigate = useNavigate();



//   useEffect(() => {
// 		const getPost = async () => {
// 			setPosts([]);
// 			try {
// 				const res = await fetch(`/api/posts/${pid}`);
// 				const data = await res.json();
// 				if (data.error) {
// 					showToast("Error", data.error, "error");
// 					return;
// 				}
//         console.log(data)
// 				setPosts([data]);
// 			} catch (error) {
// 				showToast("Error", error.message, "error");
// 			}
// 		};
// 		getPost();
// 	}, [showToast, pid, setPosts]);

// 	const handleDeletePost = async () => {
// 		try {
// 			if (!window.confirm("Are you sure you want to delete this post?")) return;

// 			const res = await fetch(`/api/posts/${post._id}`, {
// 				method: "DELETE",
// 			});
// 			const data = await res.json();
// 			if (data.error) {
// 				showToast("Error", data.error, "error");
// 				return;
// 			}
// 			showToast("Success", "Post deleted", "success");
// 			navigate(`/${user.username}`);
// 		} catch (error) {
// 			showToast("Error", error.message, "error");
// 		}
// 	};


//   if (!user && !loading) return <h1>User not found</h1>;


//   if(!user && loading) {
//     return(
//       <Flex justifyContent={"center"}>
//         <Spinner size={"xl"} />
//       </Flex>
//     )
//   }

  

//   if (!post) return null;
// 	// console.log("currentPost", currentPost);

//   return (
//     <>
//       <Flex flex={1} flexDirection={"column"} gap={2}>
//         <Flex justifyContent={"space-between"} w={"full"}>

//           <Flex>
//             <Text fontSize={"sm"} fontWeight={"bold"}>{user.username}</Text>
//             <Image src={user.profilePic} w={4} h={4} ml={1} />
//           </Flex>


//           <Flex gap={4} alignItems={"center"}>
// 					<Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
//             {post.createdAt? formatDistanceToNow(new Date(post.createdAt)) + " ago" :"1d ago"} 
// 					</Text>

// 					{currentUser?._id === user._id && (
// 						<DeleteIcon size={20} cursor={"pointer"} onClick={handleDeletePost} />
// 					)}
// 				</Flex>



//         </Flex>

//         <Text fontSize={"sm"} >
//           {post.text}
//         </Text>

//         {post.img && (
// 				<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
// 					<Image src={post.img} w={"full"} />
// 				</Box>
// 			)}


//         <Flex gap={3} my={3} >
//           <Actions post={post} />
//         </Flex>


//         {/* <Flex alignItems={"center"} gap={2}>
//           <Text color={"gray.light"} fontFamily={""} fontSize={"sm"}>
//             120 replies
//           </Text>
//           <Box w={1} h={1} borderRadius={"full"} bg={"gray.light"}>
//           </Box>
//           <Text color={"gray.light"} fontFamily={""} fontSize={"sm"}>
//              likes
//           </Text>
//         </Flex> */}
//       </Flex>


//       <Divider my={4} h={3} borderRadius={"full"} />

//       <Flex justifyContent={'space-between'} >
//         <Flex alignItems={"center"} gap={2}>
//           <Text fontSize={"2xl"}> 👋</Text>
//           <Text color={"gray.light"}> Get the app to like,reply and post.</Text>
//         </Flex>
//         <Button>Get</Button>
//       </Flex>


//       <Divider my={0} h={3} borderRadius={"full"} />
//       {post.replies && post.replies.map((reply) => (
//     <Comment
//         key={reply._id}
//         reply={reply}
//         lastReply={reply._id === post.replies[post.replies.length - 1]._id}
//     />
// ))}



//     </>
//   )
// }

// export default PostPage;