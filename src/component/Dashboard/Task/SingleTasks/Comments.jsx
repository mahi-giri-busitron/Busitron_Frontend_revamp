import React, { useState, useEffect } from "react";
import axios from "axios";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const CommentsSection = ({ taskData }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [activeReplyCommentId, setActiveReplyCommentId] = useState(null); // Track which comment's reply box is open
    const [replyText, setReplyText] = useState(""); // Current reply text

    useEffect(() => {
        if (taskData?._id) {
            getAllComments();
        }
    }, [taskData]);

    const getAllComments = async () => {
        try {
            const response = await axios.get(
                `/api/v1/comment/${taskData?._id}`
            );
            if (response.data.statusCode === 200) {
                const formattedComments = response.data.data.map((comment) => ({
                    id: comment._id,
                    author: comment.commentedBy.name,
                    date: new Date(comment.createdAt).toLocaleDateString(
                        "en-GB"
                    ),
                    content: comment.commentText,
                    replies: comment.replies || [],
                }));
                setComments(formattedComments);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            await axios.post(`/api/v1/comment`, {
                taskId: taskData?._id,
                commentText: newComment,
            });
            setNewComment("");
            getAllComments();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleReplyButtonClick = (commentId) => {
        if (activeReplyCommentId === commentId) {
            // Clicking the same reply button again will close the reply box
            setActiveReplyCommentId(null);
            setReplyText("");
        } else {
            // Open reply box for the clicked comment, and reset reply text
            setActiveReplyCommentId(commentId);
            setReplyText("");
        }
    };

    const handleAddReply = async (commentId) => {
        if (!replyText.trim()) return;

        try {
            await axios.post(`/api/v1/comment/reply`, {
                commentId,
                replyText,
            });
            setActiveReplyCommentId(null); // Close reply box after sending
            setReplyText("");
            getAllComments();
        } catch (error) {
            console.error("Error adding reply:", error);
        }
    };

    return (
        <div className="p-4 bg-white shadow rounded-lg h-96 overflow-auto">
            <h3 className="text-lg font-semibold mb-3">Comments</h3>

            {/* New Comment Input */}
            <div className="mb-4 flex flex-col">
                <InputTextarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    className="w-full"
                    placeholder="Write a comment..."
                />
                <div className="flex justify-end mt-2">
                    <Button label="Add Comment" onClick={handleAddComment} />
                </div>
            </div>

            {/* List All Comments */}
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="relative p-3 rounded-md mb-3 bg-gray-50 shadow-lg"
                    >
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">
                                {comment.author}
                            </span>{" "}
                            added a comment - {comment.date}
                        </p>
                        <div className="text-gray-900 mt-1">
                            {comment.content}
                        </div>

                        {/* Replies */}
                        <div className="mt-2 ml-5 pl-3 border-l-2 border-gray-300 shadow-md">
                            {comment.replies.length > 0 ? (
                                comment.replies.map((reply) => (
                                    <div key={reply.id} className="mt-2">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-semibold">
                                                {reply.userName || "User"}
                                            </span>{" "}
                                            replied -{" "}
                                            {new Date(
                                                reply.createdAt
                                            ).toLocaleDateString("en-GB")}
                                        </p>
                                        <div className="text-gray-900">
                                            {reply.commentText}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex justify-end">
                                    <Button
                                        label="Reply"
                                        text
                                        onClick={() =>
                                            handleReplyButtonClick(comment.id)
                                        }
                                    />
                                </div>
                            )}

                            {activeReplyCommentId === comment.id && (
                                <div className="mt-2 flex flex-col">
                                    <InputTextarea
                                        value={replyText}
                                        onChange={(e) =>
                                            setReplyText(e.target.value)
                                        }
                                        rows={2}
                                        className="w-full"
                                        placeholder="Write a reply..."
                                    />
                                    <div className="flex justify-end mt-2">
                                        <Button
                                            label="Post Reply"
                                            onClick={() =>
                                                handleAddReply(comment.id)
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No comments available.</p>
            )}
        </div>
    );
};

export default CommentsSection;
