import { useState, useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
// import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const CommentSection = () => {
    const [comments, setComments] = useState([
        {
            id: 1,
            author: "M Harisha",
            date: "04-Feb-2025",
            content: "Assets have been created as per requirement.",
            mentioned: "Adhinarayanan Mathaiya",
            replies: [],
        },
    ]);

    const [editorText, setEditorText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState("");
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const editorRef = useRef(null);
    const [replyTexts, setReplyTexts] = useState({});
    const quillInstance = useRef(null);
    const menuRefs = useRef([]);

    useEffect(() => {
        if (quillInstance.current) return;

        quillInstance.current = new Quill(editorRef.current, {
            modules: {
                toolbar: [
                    ["bold", "italic", "underline", "strike"],
                    ["code-block"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ color: [] }],
                ],
            },
            theme: "snow",
        });

        quillInstance.current.on("text-change", () => {
            setEditorText(quillInstance.current.root.innerHTML);
        });
    }, []);

    const addComment = () => {
        if (editorText.trim() === "") return;

        const newComment = {
            id: Date.now(),
            author: "User",
            date: new Date().toLocaleDateString("en-GB"),
            content: editorText,
            mentioned: null,
        };

        setComments([...comments, newComment]);
        setEditorText("");
        quillInstance.current.root.innerHTML = "";
    };

    const startDelete = (comment) => {
        setCommentToDelete(comment);
        setVisibleDialog(true);
    };

    const confirmDelete = () => {
        setComments(
            comments.filter((comment) => comment.id !== commentToDelete.id)
        );
        setVisibleDialog(false);
        setCommentToDelete(null);
    };

    const startEditing = (comment) => {
        setEditingCommentId(comment.id);
        setEditText(comment.content);
    };

    const updateComment = (id) => {
        setComments(
            comments.map((comment) =>
                comment.id === id ? { ...comment, content: editText } : comment
            )
        );
        setEditingCommentId(null);
        setEditText("");
    };

    const addReply = (commentId) => {
        if (!replyTexts[commentId] || replyTexts[commentId].trim() === "")
            return;

        setComments(
            comments.map((comment) =>
                comment.id === commentId
                    ? {
                          ...comment,
                          replies: [
                              ...comment.replies,
                              {
                                  id: Date.now(),
                                  author: "User",
                                  date: new Date().toLocaleDateString("en-GB"),
                                  content: replyTexts[commentId],
                              },
                          ],
                      }
                    : comment
            )
        );

        setReplyTexts({ ...replyTexts, [commentId]: "" });
    };

    return (
        <div className="rounded-lg  ">
            <h2 className="text-lg font-medium text-gray-500 mb-2">
                Add Comment
            </h2>

            <div id="toolbar"></div>
            <div
                ref={editorRef}
                className=" border-l border-r border-gray-300 "
                style={{ height: "70px" }}
            ></div>

            <div className="flex justify-end  border-l border-r border-b  border-gray-300 sendIcon">
                <Button
                    icon="pi pi-send"
                    className="bg-gray-400 text-white text-sm font-semibold px-3 py-3 rounded-md shadow-sm transition-all duration-300 hover:bg-sky-600 active:scale-95"
                    onClick={addComment}
                />
            </div>

            {comments.length > 0 && (
                <div>
                    <h3 className="text-gray-500 text-lg font-medium mt-6">
                        Comments
                    </h3>
                    <div className="mt-2">
                        {comments.map((comment, index) => (
                            <div
                                key={comment.id}
                                className="relative p-3 rounded-md mb-2 bg-gray-50"
                            >
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <Button
                                        icon="pi pi-ellipsis-v"
                                        className="p-button-text p-button-sm p-button-secondary"
                                        onClick={(event) =>
                                            menuRefs.current?.[index]?.toggle(
                                                event
                                            )
                                        }
                                        aria-controls={`menu_${index}`}
                                        aria-haspopup
                                    />
                                    <Menu
                                        id={`menu_${index}`}
                                        model={[
                                            {
                                                label: "Edit",
                                                icon: "pi pi-pencil",
                                                command: () =>
                                                    startEditing(comment),
                                            },
                                            {
                                                label: "Delete",
                                                icon: "pi pi-trash",
                                                command: () =>
                                                    startDelete(comment),
                                            },
                                        ]}
                                        popup
                                        ref={(el) => {
                                            if (el)
                                                menuRefs.current[index] = el;
                                        }}
                                    />
                                </div>

                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">
                                        {comment.author}
                                    </span>{" "}
                                    added a comment - {comment.date}
                                </p>

                                {editingCommentId === comment.id ? (
                                    <div className="mt-2">
                                        <InputText
                                            value={editText}
                                            onChange={(e) =>
                                                setEditText(e.target.value)
                                            }
                                            className="w-full p-2 border rounded-lg shadow-sm"
                                        />
                                        <div className="flex gap-2 mt-2">
                                            <Button
                                                label="Save"
                                                className="p-button-sm p-button-primary"
                                                onClick={() =>
                                                    updateComment(comment.id)
                                                }
                                            />
                                            <Button
                                                label="Cancel"
                                                className="p-button-sm p-button-secondary"
                                                onClick={() =>
                                                    setEditingCommentId(null)
                                                }
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Render HTML content properly */}
                                        <div
                                            className="text-gray-900 mt-1"
                                            dangerouslySetInnerHTML={{
                                                __html: comment.content,
                                            }}
                                        ></div>
                                        {comment.mentioned && (
                                            <p className="text-blue-600 font-medium cursor-pointer mt-1">
                                                {comment.mentioned}
                                            </p>
                                        )}
                                    </>
                                )}
                                {/* Reply Input Field */}
                                <div className="flex items-center gap-2 mt-3 h-10 Reply_input">
                                    <InputText
                                        value={replyTexts[comment.id] || ""}
                                        onChange={(e) =>
                                            setReplyTexts({
                                                ...replyTexts,
                                                [comment.id]: e.target.value,
                                            })
                                        }
                                        placeholder="Write a reply..."
                                        className="flex-grow p-2 border rounded-lg shadow-sm"
                                    />
                                    <Button
                                        label="Reply"
                                        className="p-button-sm p-button-primary"
                                        onClick={() => addReply(comment.id)}
                                    />
                                </div>

                                {/* Display Replies */}
                                {Array.isArray(comment.replies) &&
                                    comment.replies.length > 0 && (
                                        <div className="mt-3 border-l-2 pl-3 border-gray-300">
                                            {comment.replies.map((reply) => (
                                                <div
                                                    key={reply.id}
                                                    className="mt-2"
                                                >
                                                    <p className="text-sm text-gray-700">
                                                        <span className="font-semibold">
                                                            {reply.author}
                                                        </span>{" "}
                                                        replied - {reply.date}
                                                    </p>
                                                    <div
                                                        className="text-gray-900"
                                                        dangerouslySetInnerHTML={{
                                                            __html: reply.content,
                                                        }}
                                                    ></div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                header="Confirm Delete"
                visible={visibleDialog}
                onHide={() => setVisibleDialog(false)}
                footer={
                    <div>
                        <Button
                            label="Cancel"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={() => setVisibleDialog(false)}
                        />
                        <Button
                            label="Delete"
                            icon="pi pi-trash"
                            className="p-button-danger"
                            onClick={confirmDelete}
                            autoFocus
                        />
                    </div>
                }
                className="p-dialog-sm"
            >
                <p>Are you sure you want to delete this comment?</p>
            </Dialog>
        </div>
    );
};

export default CommentSection;
