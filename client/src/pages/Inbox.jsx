import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { io } from "socket.io-client";
import { fetchConversation, fetchConversations } from "../api/conversations";
import Conversations from "../components/pages/inbox/Conversations";
import useFetch from "../hooks/useFetch";
import useGetContext from "../hooks/useGetContext";
import trashImage from "../assets/images/trash.png";
import attachmentImage from "../assets/images/attachment.png";
import { addMessage, fetchMessages } from "../api/messages";
import { useEffect, useState } from "react";

const socket = io("http://localhost:5000", {
    transports: ["websocket"],
});

const Inbox = () => {
    const { conversationId } = useParams();
    const { userState } = useGetContext();
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("new_message", (data) => {
            handleNewMessages(data);
        });
    }, []);

    // selected conversation state
    const [selectedConversation, setSelectedConversation] = useState();

    // new messages fetch with socket
    const [newMessages, setNewMessages] = useState([]);

    // conversations API call
    const { data: conversationsData, isFetched: isConversationsFetched } =
        useFetch(fetchConversations, {
            userId: userState.user?._id,
        });

    // conversation API call
    const {
        data: conversationData,
        isFetched: isConversationFetched,
        fetchData: fetchConversationData,
    } = useFetch(
        fetchConversation,
        {
            conversationId: conversationId,
        },
        false
    );

    // messages API call
    const {
        data: messageData,
        isFetched: isMessageFetched,
        fetchData: fetchMessageData,
    } = useFetch(
        fetchMessages,
        {
            conversationId: conversationId
                ? conversationId
                : selectedConversation,
        },
        conversationId ? true : false
    );

    useEffect(() => {
        conversationId && fetchConversationData({ conversationId });
    }, [conversationId]);

    useEffect(() => {
        if (conversationData.status) {
            setSelectedConversation(conversationData.data);
        }
    }, [conversationData]);

    const handleConversationClick = (conversation) => {
        navigate(`/inbox/${conversation._id}`);
        setSelectedConversation(conversation);
        fetchMessageData({ conversationId: conversation._id });
    };

    const backToInbox = () => {
        setSelectedConversation(null);
        navigate("/inbox");
    };

    const handleNewMessages = (data) => {
        setNewMessages((prev) => [...prev, data]);
    };

    const sendMessage = async (e) => {
        if (e.keyCode === 13) {
            const bodyObject = {
                conversationId: selectedConversation._id,
                text: e.target.value,
                receiver: JSON.stringify({ ...messageData.data?.participant }),
            };
            const response = await addMessage({ bodyObject });
            if (response.status) {
                e.target.value = "";
                // socket.on("new_message", (data) => {
                //     console.log("1", data);
                //     handleNewMessages(data);
                // });
            }
        }
    };

    return (
        <>
            <div className="menu">
                <div className="menu-item">
                    <a href="/inbox">Inbox</a>
                </div>
                <div className="menu-item">
                    <a href="/users">Users</a>
                </div>
                <div className="menu-item">
                    <a href="/">Login</a>
                </div>
            </div>
            <div id="chat-container">
                <div id="search-container">
                    <input type="text" placeholder="Search" />
                </div>
                <div id="conversation-list">
                    {isConversationsFetched &&
                        conversationsData.data?.length &&
                        conversationsData.data.map((conversation) => {
                            let otherUser =
                                conversation.creator.id !== userState.user._id
                                    ? conversation.creator
                                    : conversation.participant;
                            return (
                                <div
                                    className="conversation"
                                    key={conversation._id}
                                    onClick={() =>
                                        handleConversationClick(conversation)
                                    }
                                >
                                    <img
                                        src={`http://localhost:5000/uploads/avatars/${otherUser?.avatar}`}
                                        alt="Sumit"
                                    />
                                    <div className="title-text">
                                        {otherUser?.name}
                                    </div>
                                    <div className="created-date">
                                        {moment(conversation.last_updated)
                                            .startOf("minutes")
                                            .fromNow()}
                                    </div>
                                    <div className="conversation-message">
                                        This is a message
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div id="new-message-container">
                    <a href="#">+</a>
                </div>
                {selectedConversation && (
                    <>
                        <div id="chat-title">
                            <span className="align-center">
                                <span
                                    className="align-center"
                                    onClick={backToInbox}
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill="none"
                                            d="M0 0h24v24H0z"
                                        ></path>
                                        <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path>
                                    </svg>
                                </span>
                                <span>
                                    {isMessageFetched
                                        ? selectedConversation.creator.id ===
                                          userState.user._id
                                            ? selectedConversation.participant
                                                  .name
                                            : selectedConversation.creator.name
                                        : ""}
                                </span>
                            </span>
                            <img src={trashImage} alt="Delete Conversation" />
                        </div>
                        <div id="chat-message-list">
                            {newMessages.length &&
                                newMessages
                                    .slice()
                                    .reverse()
                                    .map((message) => {
                                        let userType =
                                            message.sender.id ===
                                            userState.user._id
                                                ? "me"
                                                : "participant";
                                        return (
                                            <div
                                                className={`message-row ${
                                                    userType === "me"
                                                        ? "you-message"
                                                        : "other-message"
                                                }`}
                                                key={Math.random()}
                                            >
                                                <div className="message-content">
                                                    <img
                                                        src={`http://localhost:5000/uploads/avatars/${
                                                            userType === "me"
                                                                ? userState.user
                                                                      .avatar
                                                                : message.sender
                                                                      .id ===
                                                                  userState.user
                                                                      ._id
                                                                ? message
                                                                      .receiver
                                                                      .avatar
                                                                : message.sender
                                                                      .avatar
                                                        }`}
                                                        alt={
                                                            userType === "me"
                                                                ? userState.user
                                                                      ?.name
                                                                : messageData
                                                                      ?.participant
                                                                      ?.name
                                                        }
                                                        height="32px"
                                                        width="32px"
                                                    />
                                                    <div className="message-text">
                                                        {message.text}
                                                    </div>
                                                    <div className="message-time">
                                                        {moment(
                                                            message.date_time
                                                        )
                                                            .startOf("hour")
                                                            .fromNow()}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            {isMessageFetched &&
                                messageData.data?.messages?.length &&
                                messageData.data?.messages?.map((message) => {
                                    let userType =
                                        message.sender.id === userState.user._id
                                            ? "me"
                                            : "participant";
                                    return (
                                        <div
                                            className={`message-row ${
                                                userType === "me"
                                                    ? "you-message"
                                                    : "other-message"
                                            }`}
                                            key={message._id}
                                        >
                                            <div className="message-content">
                                                <img
                                                    src={`http://localhost:5000/uploads/avatars/${
                                                        userType === "me"
                                                            ? userState.user
                                                                  .avatar
                                                            : message.sender
                                                                  .id ===
                                                              userState.user._id
                                                            ? message.receiver
                                                                  .avatar
                                                            : message.sender
                                                                  .avatar
                                                    }`}
                                                    alt={
                                                        userType === "me"
                                                            ? userState.user
                                                                  ?.name
                                                            : messageData
                                                                  ?.participant
                                                                  ?.name
                                                    }
                                                    height="32px"
                                                    width="32px"
                                                />
                                                <div className="message-text">
                                                    {message.text}
                                                </div>
                                                <div className="message-time">
                                                    {moment(message.date_time)
                                                        .startOf("hour")
                                                        .fromNow()}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        {/* <div id="chat-message-list">
                            
                        </div> */}
                        <div id="chat-form">
                            <img src={attachmentImage} alt="Add Attachment" />
                            <input
                                type="text"
                                placeholder="Type a message"
                                onKeyUp={sendMessage}
                            />
                        </div>
                    </>
                )}
            </div>

            {/* <div className="modal-wrapper">
                <div className="modal">
                    <a href="#" className="modal-close">
                        +
                    </a>
                    <div className="modal-title">
                        <h2>Create New Conversation</h2>
                    </div>
                    <div className="modal-body">
                        <form>
                            <input type="text" placeholder="Name" />
                            <input type="text" placeholder="Username" />
                            <input type="button" value="Submit" />
                        </form>
                    </div>
                </div>
            </div> */}
        </>
    );
};
export default Inbox;

// conversation active class: active
